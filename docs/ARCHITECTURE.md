# Architecture Documentation – Little Lemon Capstone

---

## 1. Overview

Little Lemon is a client-side-only React single-page application (SPA). There is no custom backend: it is bootstrapped with Create React App and relies on React Router for navigation and local component state for the booking flow. The reservation "API" is simulated in-memory (see [API Reference](API_REFERENCE.md)).

---

## 2. High-Level Component Tree

```
index.js
 └── BrowserRouter
      └── App.js
           ├── Navbar (Nav)
           └── Main.js
                └── Routes
                     ├── "/"          → Header, Specials, Testimonials, AboutLL, Footer
                     ├── "/booking"   → Booking → BookingForm
                     └── "/confirmed" → ConfirmedBooking
```

`App.js` is intentionally thin: it only mounts the persistent `Navbar` and delegates all route-dependent rendering to `Main.js`.

---

## 3. Layer Responsibilities

### 3.1 Presentation layer (marketing/landing page)
- **Navbar.js** – Always-mounted responsive navigation with a hamburger toggle (`useState menuOpen`) and a hover-based logo swap (`useState logoSrc`). Links are anchor tags pointing to in-page anchors (`/#`), not React Router routes.
- **Header.js** – Hero section with the restaurant's pitch and a "Reserve a Table" button that calls `useNavigate()` to push `/booking`.
- **Specials.js** – Renders the `recipes` array (imported from `Recipes.js`) as cards. Each "Order a delivery" button triggers a two-step SweetAlert2 dialog (confirm → success) that is UI-only and does not persist any order.
- **Testimonials.js** – Also imports and maps over the `recipes` array from `Recipes.js` to render star ratings and reused images/text as testimonial cards (see Troubleshooting doc for the implication of this reuse).
- **AboutLL.js** – Static "About Little Lemon" section with placeholder Lorem-ipsum-style copy and restaurant imagery.
- **Footer.js** – Static site footer with navigation, contact info and social links (`<a href="/">` — non-functional in this SPA context).
- **About.js** – A standalone component that is never imported/rendered anywhere in the tree. Effectively dead code left over from an earlier scaffold.

### 3.2 Booking flow (stateful)
- **Main.js** — Owns the booking domain state:
  - Defines a **seeded pseudo-random generator** (`seedRandom`) so that `fetchAPI(date)` deterministically returns the same list of available time slots for a given calendar day.
  - Initializes `useReducer(updateTimes, { availableTimes: fetchAPI(new Date()) })`.
  - `updateTimes(state, date)` is the reducer function: given a `dispatch(dateString)` call, it recomputes `availableTimes` for the new date.
  - `submitForm(formData)` calls a local `submitAPI(formData)` stub (always returns `true`) and, on success, uses `useNavigate()` to push `/confirmed`.
  - Passes `state` (as `availableTimes` prop) and `dispatch` down into the `/booking` route's `Booking` component.
- **Booking.js** — A thin wrapper around `BookingForm`. It defines its own local `handleSubmitForm` (console.log only) and `fetchTimes` (console.log only) functions, but note that **`BookingForm` is actually wired to `Main.js`'s `submitForm`/`dispatch` via props passed through `Booking`**, not to these local stubs — see Troubleshooting for the prop-naming inconsistency this causes.
- **BookingForm.js** — Fully controlled form (local `useState` for `date`, `times`, `guests`, `occasion`):
  - On date change, calls `props.dispatch(dateValue)`, which flows back up to `Main.js`'s reducer to regenerate `availableTimes`.
  - `props.availableTimes.availableTimes` is mapped into the `<select>` options for time slots.
  - Submit button is disabled until all four fields are filled.
  - On submit, calls `props.SubmitForm(formData)` and separately calls `navigate('/confirmed')` directly (see Troubleshooting for the double-navigation implication).
- **ConfirmedBooking.js** — Static confirmation screen with a "Back to Home" button that does a full page reload via `window.location.href = '/'` rather than client-side navigation.
- **UpdateTimes.js** — A second, independent implementation of `fetchAPI`/`updateTimes` (hardcoded time list, no seeding). It is not imported by `Main.js`, `Booking.js`, or `BookingForm.js` at `HEAD`; it exists as a standalone module, most likely intended for or used by unit tests.

### 3.3 Data layer
- **Recipes.js** — The single static data source for both `Specials` and `Testimonials`: an array of 3 objects (`id`, `title`, `price`, `image`, `description`, `rating`). There is no separate testimonials data set at `HEAD`.

---

## 4. State Management Strategy

The app does not use any global state library (Redux, Context API, Zustand, etc.). State is handled with two local mechanisms:

1. **Component-local `useState`** — used for UI-only concerns: nav menu open/closed, logo swap, and all booking form field values.
2. **Lifted `useReducer`** — used for the one piece of state shared across route boundaries (`availableTimes`), owned by `Main.js` and passed down as props (`availableTimes`, `dispatch`) to whichever route needs it.

This is a reasonable pattern for an app this size, but it means `Main.js` acts as a de facto state-management hub and any additional shared state (e.g., real booking confirmations, user session) would need a similar prop-drilling approach or the introduction of Context/Redux.

---

## 5. Data Flow Diagram (Booking Flow)

```
User selects date in BookingForm
        │  onChange → handleChange(e)
        ▼
props.dispatch(dateString)  ─────────────► Main.js: useReducer
                                                 │
                                    updateTimes(state, date)
                                                 │
                                                 ▼
                                   new { availableTimes: [...] }
                                                 │
        ◄────────────────────────────────────────
        ▼
BookingForm re-renders <select> options with new times

User fills guests/occasion/time → clicks Submit
        │ onSubmit → handleSubmit(e)
        ▼
props.SubmitForm(formData)  ─────────────► Main.js: submitForm(formData)
                                                 │
                                    submitAPI(formData) === true
                                                 │
                                                 ▼
                                    navigate("/confirmed")   [from Main.js]
        + BookingForm ALSO calls navigate('/confirmed') directly
```

---

## 6. Routing Strategy

- `BrowserRouter` is mounted once at the top level in `index.js`.
- All `<Route>` definitions live in a single file (`Main.js`) rather than being colocated with each page/section — acceptable for a 3-route app, but would need to be split out (e.g., a dedicated `routes/` folder) if the app grows.
- The `Navbar`'s links (`Home`, `About`, `Menu`, `Reservations`, `Order Online`, `Login`) are all plain anchors to `/#`, not `<Link>`/`<NavLink>` components, so they do not perform SPA client-side navigation and do not correspond to actual routes beyond `/`.

---

## 7. External Dependencies of Note

- **`public/index.html`** loads a `<script>` from `https://raw.githubusercontent.com/courseraap/capstone/main/api.js` — this is the official Coursera capstone reservation API mock (which exposes `window.fetchAPI` / `window.submitAPI` globally). The application code does **not** currently call these global functions; instead, `Main.js` defines and uses its own local `fetchAPI`/`submitAPI`. This script tag is effectively unused dead weight at `HEAD`. See `docs/API_REFERENCE.md` and `docs/TROUBLESHOOTING.md`.
- **SweetAlert2** is used only inside `Specials.js` for the "Order a delivery" confirmation UX.

---

## 8. Build & Test Tooling

- **Create React App** (`react-scripts@5.0.1`) handles bundling, dev server, and its own internal Jest configuration for `npm test`.
- A parallel, standalone `jest.config.js` + `babel.config.js` pair exists at the project root, configuring `babel-jest` as the transform and `jsdom` as the test environment. This is only actually used if Jest is invoked directly (e.g., `npx jest`) rather than through `react-scripts test`, since CRA overrides most custom Jest config by design. See Troubleshooting for the practical implications.
