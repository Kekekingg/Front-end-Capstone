# Troubleshooting Guide – Little Lemon Capstone

---

This guide documents issues found during direct source-code review at commit `5fa030c`, along with root causes and suggested fixes. It is organized by severity/area rather than by commit.

## 1. Test Suite Is Effectively Empty

**Symptom:** Running `npm test` reports no tests, despite two commits (`4b729fd`, `8955a85`) describing added unit tests for the booking form, Babel/Jest config, and specials cards.

**Root cause:** `src/App.test.js` contains a single test for `BookingForm`, but the entire test body — including the `import` statements — is commented out:
```js
// import { render, screen } from '@testing-library/react';
// import BookingForm from './components/BookingForm';
// test("Renderiza el campo de fecha", () => { ... });
```
No other `*.test.js` files exist in `src/`.

**Fix:**
- Uncomment the existing test and update the props to match `BookingForm`'s current prop names (`SubmitForm`, `dispatch`, `availableTimes` shaped as `{ availableTimes: [...] }`, and `fetch`/`fetchTimes` — see issue #3 below before writing new tests, since the prop name itself is ambiguous).
- Add coverage for `Specials` (card rendering, SweetAlert2 trigger) and `Main`'s reducer logic (`updateTimes`), since the commit messages indicate these were the original intent.

---

## 2. `Testimonials` Section Reuses Recipe Data

**Symptom:** The "Testimonials" section on the landing page shows the same three items (with recipe images and dish names) as the "Specials" section, styled with star ratings.

**Root cause:** `Testimonials.js` imports `recipes` from `Recipes.js` (the same data source used by `Specials.js`) instead of a dedicated testimonials data set:
```js
import recipes from "./Recipes";
...
recipes.map(recipes => <div key={recipes.id} className="testimonial-items"> ... <p>{recipes.title}</p> ...
```

**Fix:** Create a separate `Testimonials.js`-adjacent data file (e.g., `testimonialsData.js`) with realistic reviewer names, quotes, and ratings, and update the `.map()` call to use it instead of `recipes`.

---

## 3. Prop Naming Mismatch Between `Booking` and `BookingForm`

**Symptom:** Confusing to trace during debugging — `Booking.js` defines local `handleSubmitForm` and `fetchTimes` functions that look like they should wire up to `BookingForm`, but they are never actually passed down under those names.

**Root cause:** `Booking.js` passes:
```jsx
<BookingForm
  availableTimes={props.availableTimes}
  dispatch={props.dispatch}
  fetch={fetchTimes}
  SubmitForm={handleSubmitForm}
/>
```
Meanwhile `BookingForm.js` reads `props.fetchTimes` in its `useEffect` (not `props.fetch`), so the local `fetchTimes` defined in `Booking.js` is **not actually invoked** on date change — the prop name sent (`fetch`) doesn't match the name read (`fetchTimes`). Similarly, `SubmitForm={handleSubmitForm}` passes `Booking.js`'s local console.log-only stub, which shadows the "real" `submitForm` that was passed into `Booking` from `Main.js` via `props.submitForm` — but `Booking.js` never uses `props.submitForm` at all.

**Fix:** Decide on one consistent path for the submit/fetch callbacks:
- Either have `Booking.js` simply forward `props.submitForm` and a real fetch handler straight through to `BookingForm`, removing the unused local stubs, **or**
- Keep local handlers in `Booking.js` for logging/analytics purposes, but explicitly call `props.submitForm(...)` inside them before/after logging, and rename props consistently (`fetch` vs `fetchTimes`) so `BookingForm`'s `useEffect` actually fires the intended handler.

---

## 4. Unused `About.js` Placeholder Component

**Symptom:** `src/components/About.js` exists and renders `<p>This is the About component</p>`, but it is never imported anywhere in the app; `AboutLL.js` is the component actually rendered on the landing page.

**Root cause:** Leftover scaffold file from an earlier development stage (likely predating the `AboutLL` rename/expansion).

**Fix:** Delete `About.js`, or if kept intentionally as a placeholder/route for a future dedicated "About" page, wire it into `Main.js`'s `<Routes>` under its own path (e.g., `/about`).

---

## 5. Duplicate Logo Assets With Near-Identical Filenames

**Symptom:** Two SVG files exist side by side: `Logo.svg` and `Logo .svg` (note the trailing space before the extension in the second one). `Navbar.js` imports `Logo.svg` (no space); `Footer.js` imports `Logo .svg` (with a space).

**Root cause:** Both files are present in `src/Assets/icons_assets/`, likely from a duplicate upload/rename during asset organization. This is easy to miss visually and is a common source of "file not found" errors if either file is renamed or removed by a teammate/CI environment that doesn't preserve trailing spaces well.

**Fix:** Keep a single canonical `Logo.svg`, update `Footer.js`'s import to match, and delete the duplicate with the trailing space to avoid future path errors (some OSes/tools mishandle filenames with trailing spaces).

---

## 6. Coursera Capstone `api.js` Script Loaded but Unused

**Symptom:** Every page load fetches an external script from GitHub (`raw.githubusercontent.com/courseraap/capstone/main/api.js`) that is never actually called by the app.

**Root cause:** `public/index.html` retains the official capstone script tag, but `Main.js` implements its own local `fetchAPI`/`submitAPI` instead of using the `window.fetchAPI`/`window.submitAPI` globals that script would provide.

**Fix:** Either:
- Remove the `<script>` tag if the local mock is intentionally the final implementation, or
- Replace the local `fetchAPI`/`submitAPI` in `Main.js` with calls to the global `window.fetchAPI`/`window.submitAPI` if grading/rubric compliance for the Coursera capstone specifically expects the official script to be used (this is common in the Meta Front-End capstone rubric — worth double-checking against the assignment instructions).

---

## 7. Jest / Babel-Jest Version Mismatch

**Symptom:** Potential peer-dependency warnings or subtly inconsistent test behavior when running Jest directly (`npx jest`) rather than through `react-scripts test`.

**Root cause:** `package.json` pins `jest: ^27.5.1` (matching CRA 5's bundled Jest version) alongside `babel-jest: ^30.1.2`, a much newer major version. `babel-jest` is meant to be version-matched with the `jest` core package.

**Fix:** Align versions — either downgrade `babel-jest` to `^27.x` to match CRA's bundled Jest, or, if you want to run Jest directly via the standalone `jest.config.js`, upgrade `jest` itself to `^30.x` to match `babel-jest`. Decide first whether tests will run via `react-scripts test` (recommended, since CRA manages its own Jest config and largely ignores the root `jest.config.js`) or via a fully custom Jest setup — mixing both leads to confusion about which config is actually in effect.

---

## 8. Minor HTML/Markup Issues

- **`public/index.html`:** `<link rel="icon" href="LLicon.png" type="imgae/png"/>` — the MIME type is misspelled (`imgae/png` instead of `image/png`). Most browsers will silently ignore the invalid MIME type and still load the favicon by extension, but it should be corrected for standards compliance.
- **`public/index.html`:** the `og:image` meta tag points to an external, third-party domain (`www.littlelemon.ie`) rather than an asset hosted within this project. This works for link-preview purposes but is fragile (breaks if that external site changes/removes the image) and is worth replacing with a project-hosted image if this is meant to be deployed.
- **`BookingForm.js`:** the occasion `<select>`'s first `<option>` has both `selected` and `hidden` attributes on a controlled React select, which is redundant with (and can conflict with) the controlled `value={occasion}` prop — React will warn about this pattern in some versions. Consider removing `selected` since the controlled `value` already determines the selected option.

---

## 9. Quick Checklist Before Submission / Deployment

- [ ] Un-comment and update `App.test.js`, add coverage for `Specials` and the booking reducer.
- [ ] Replace `Testimonials.js`'s data source with real testimonial content.
- [ ] Resolve the `Booking.js` ↔ `BookingForm.js` prop naming (`fetch` vs `fetchTimes`, unused `submitForm`).
- [ ] Remove or route `About.js`.
- [ ] Deduplicate the `Logo.svg` / `Logo .svg` assets.
- [ ] Decide on and align the booking API implementation (local mock vs. official Coursera `api.js`).
- [ ] Align `jest`/`babel-jest` versions.
- [ ] Fix the favicon MIME type typo and consider self-hosting the `og:image`.
