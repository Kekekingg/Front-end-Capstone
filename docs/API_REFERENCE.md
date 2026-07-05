# API Reference – Events & Callbacks

---

Little Lemon has no real backend, so there is no REST/GraphQL API to document. Instead, this reference covers:

1. The **internal event/callback contract** between components (props that are functions, and the DOM events that trigger them).
2. The **mock reservation API** implemented locally in `Main.js`.
3. The **external Coursera capstone API script** referenced in `public/index.html` but not currently wired to the app.

---

## 1. Component Event Contracts

### `Navbar` (`Navbar.js`)

| Event | Trigger | Handler | Effect |
|---|---|---|---|
| `onClick` | Hamburger icon clicked | `toggleMenu()` | Toggles local `menuOpen` state, adding/removing the `open`/`visible` CSS classes |
| `onMouseEnter` / `onMouseLeave` | Logo image hovered | inline arrow functions | Swaps `logoSrc` state between `Logo.svg` and `little-lemon-grey-logo2.png` |

No props are accepted; `Navbar` is fully self-contained.

### `Header` (`Header.js`)

| Event | Trigger | Handler | Effect |
|---|---|---|---|
| `onClick` | "Reserve a Table" button | inline `() => navigate('/booking')` | Client-side navigation to the booking route |

### `Specials` (`Specials.js`)

| Event | Trigger | Handler | Effect |
|---|---|---|---|
| `onClick` | "Order a delivery" button on a recipe card | `hanldeClick(id)` *(note: existing typo — "hanldeClick")* | Opens a SweetAlert2 confirm dialog; on confirm, shows a second "Ordered!" success dialog. No network call or state mutation occurs. |

**Signature:**
```js
hanldeClick(id: number) => void
```
`id` is passed from `recipes.id` but is currently only used for a `console.log`, not for any lookup or API call.

### `Main` (`Main.js`) — Booking domain logic

This is the closest thing the project has to an "API module." All functions are defined locally and are **not exported** — they are only used inside `Main.js` and passed down as props.

#### `fetchAPI(date: Date) => string[]`
Deterministically generates a list of available reservation times for the given date using a seeded pseudo-random generator (`seedRandom(seed)`), so the same date always yields the same result within a session.

- **Input:** a JS `Date` object.
- **Output:** an array of time strings, e.g. `["17:00", "18:30", "20:00"]`, drawn from the hourly slots 17:00–22:30.
- **Side effects:** none (pure function given the same seed).

#### `submitAPI(formData: object) => boolean`
Mock reservation submission. Always returns `true` — there is no validation, persistence, or failure case implemented.

- **Input:** `{ date, times, guests, occasion }` (see `BookingForm` below).
- **Output:** `true` (always).

#### `updateTimes(state: { availableTimes: string[] }, date: string) => { availableTimes: string[] }`
Reducer function passed to `useReducer`. Recomputes `availableTimes` by calling `fetchAPI(new Date(date))`.

- **Dispatch signature:** `dispatch(dateString: string)`

#### `submitForm(formData: object) => void`
Wraps `submitAPI`; on a truthy result, calls `navigate("/confirmed")`.

### `Booking` (`Booking.js`)

| Prop | Type | Source | Description |
|---|---|---|---|
| `availableTimes` | `{ availableTimes: string[] }` | `Main.js` state | Current reducer state |
| `dispatch` | `(date: string) => void` | `Main.js` `useReducer` | Dispatches a date to recompute available times |
| `submitForm` | `(formData: object) => void` | `Main.js` | Final submit handler (drives navigation to `/confirmed`) |

`Booking.js` also defines two **local, unused-by-BookingForm** handlers worth knowing about if you extend this component:
```js
handleSubmitForm(formData) // console.log only — not passed to BookingForm as SubmitForm
fetchTimes(date)           // console.log only — not passed to BookingForm as fetchTimes/fetch
```
`BookingForm` actually receives `props.SubmitForm` and `props.fetch` from `Booking`'s own props pass-through — trace prop names carefully if debugging (see `docs/TROUBLESHOOTING.md`).

### `BookingForm` (`BookingForm.js`)

| Prop | Type | Required | Description |
|---|---|---|---|
| `availableTimes` | `{ availableTimes: string[] }` | Yes | Used to populate the time `<select>` |
| `dispatch` | `(date: string) => void` | Yes | Called on date change |
| `SubmitForm` | `(formData: object) => void` | Yes | Called on form submit |
| `fetch` / `fetchTimes` | `(date: string) => void` | No | Optional side-effect hook fired in a `useEffect` when `date` changes (see Troubleshooting for the `fetch` vs `fetchTimes` naming mismatch) |

**Emitted event → payload:**
```js
SubmitForm({
  date: string,      // "YYYY-MM-DD" from <input type="date">
  times: string,     // selected value from availableTimes
  guests: number,    // 1–10
  occasion: string   // "Birthday" | "Anniversary"
})
```

**DOM events handled:**

| Event | Element | Handler |
|---|---|---|
| `onChange` | Date input | `handleChange(e.target.value)` → sets local `date` state and calls `props.dispatch(e)` |
| `onChange` | Time select | `setTimes(e.target.value)` |
| `onChange` | Guests input | `setGuests(e.target.value)` |
| `onChange` | Occasion select | `setOccasion(e.target.value)` |
| `onSubmit` | Form | `handleSubmit(e)` → calls `props.SubmitForm(formData)` then `navigate('/confirmed')` |

### `ConfirmedBooking` (`ConfirmedBooking.js`)

| Event | Trigger | Handler | Effect |
|---|---|---|---|
| `onClick` | "Back to Home" button | inline `() => window.location.href = '/'` | Full browser reload to `/` (not client-side routing) |

---

## 2. External API Script (loaded but not integrated)

`public/index.html` includes:
```html
<script src="https://raw.githubusercontent.com/courseraap/capstone/main/api.js"></script>
```

This is Coursera's official capstone mock API for the Meta Front-End Specialization. When loaded, it exposes two **global** functions on `window`:

| Global function | Expected signature | Purpose (per Coursera spec) |
|---|---|---|
| `window.fetchAPI(date)` | `(date: Date) => string[]` | Returns available times for a date |
| `window.submitAPI(formData)` | `(formData: object) => boolean` | Submits a reservation |

**Current status in this codebase:** the script tag is present, but no component calls `window.fetchAPI` or `window.submitAPI`. `Main.js` defines and uses its own local, same-named functions instead. Functionally the app works either way (both return similar shapes), but the two implementations are not equivalent (the local one is deterministic/seeded; the official one is not necessarily), and keeping the unused script tag adds an unnecessary external network request on every page load. See `docs/TROUBLESHOOTING.md` for a recommended fix.

---

## 3. Event Reference Summary Table

| Component | Event | Payload shape | Consumes real data? |
|---|---|---|---|
| Navbar | menu toggle, logo hover | none | N/A (UI only) |
| Header | reserve click | none | N/A (navigation only) |
| Specials | order delivery click | `id: number` | No (UI-only dialog) |
| BookingForm | date change | `date: string` | Yes → drives `fetchAPI` |
| BookingForm | submit | `{date, times, guests, occasion}` | Yes → drives `submitAPI` |
| ConfirmedBooking | back to home click | none | N/A (full reload) |
