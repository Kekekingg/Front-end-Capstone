# Little Lemon – Capstone Project (Coursera Meta Front-End Specialization)

Little Lemon is a single-page React application built as the final capstone project for the **Meta Front-End Developer** Coursera specialization. It simulates a restaurant's marketing site and table-reservation flow: a landing page with hero header, weekly specials, testimonials and an "About" section, plus a multi-step table booking form with client-side validation and a confirmation screen.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [Testing](#testing)
- [Known Limitations](#known-limitations)
- [Documentation](#documentation)

---

## Features

- **Landing page** with hero banner, call-to-action to reserve a table, weekly specials cards, testimonials, an "About Little Lemon" section and a footer.
- **Table booking flow**: date/time/guests/occasion form with client-side validation, a pseudo-random available-times generator seeded by date, and a dedicated confirmation page.
- **Weekly specials** rendered from a static recipes data set, each with an "Order a delivery" action backed by SweetAlert2 confirmation/success dialogs.
- **Responsive navigation bar** with a mobile hamburger menu and a logo that swaps on hover.
- **Open Graph metadata** for link previews (title, description, image).
- **Unit test tooling** configured with Jest, Babel and React Testing Library.

---

## Tech Stack

| Category | Technology |
|---|---|
| UI Library | React 19 |
| Routing | React Router DOM 7 |
| Build tooling | Create React App (`react-scripts` 5) |
| Alerts/Modals | SweetAlert2 |
| Testing | Jest 27, Babel Jest, React Testing Library |
| Styling | Plain CSS (`App.css`, `index.css`), Google Fonts (Karla, Montserrat, Open Sans, PT Sans) |
| Design | Figma wireframes (see `cb39a59`, `5486077` commits) |

---

## Project Structure

```
little-lemon-capstone/
├── public/
│   └── index.html          # CRA template, OGP tags, Coursera capstone api.js script tag
├── src/
│   ├── components/
│   │   ├── Navbar.js        # Responsive nav bar with hamburger menu
│   │   ├── Header.js        # Hero banner, "Reserve a Table" CTA
│   │   ├── Main.js          # Route definitions + booking state (useReducer)
│   │   ├── Specials.js      # Weekly specials cards + SweetAlert2 dialogs
│   │   ├── Recipes.js       # Static recipe/testimonial data source
│   │   ├── Testimonials.js  # Testimonials section
│   │   ├── AboutLL.js       # "About Little Lemon" section
│   │   ├── Footer.js        # Site footer
│   │   ├── Booking.js       # Wraps BookingForm, wires local callbacks
│   │   ├── BookingForm.js   # Reservation form (date, time, guests, occasion)
│   │   ├── ConfirmedBooking.js # Booking confirmation screen
│   │   ├── UpdateTimes.js   # Standalone fetchAPI/updateTimes helpers
│   │   └── About.js         # Placeholder component (not used in the app)
│   ├── App.js               # Root component (Navbar + Main)
│   ├── App.test.js          # Test file (see Testing section)
│   └── index.js             # ReactDOM root + BrowserRouter
├── babel.config.js
├── jest.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/Kekekingg/Front-end-Capstone.git
cd Front-end-Capstone/Capstone_LittleLemon/little-lemon-capstone
npm install
```

### Run the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode with hot reload |
| `npm test` | Runs the test suite via `react-scripts test` (Jest, watch mode) |
| `npm run build` | Builds a production bundle into `build/` |
| `npm run eject` | Ejects CRA configuration (irreversible) |

---

## Routing

The app uses `react-router-dom` with three routes, all defined inside `Main.js`:

| Path | Component | Description |
|---|---|---|
| `/` | `Header`, `Specials`, `Testimonials`, `AboutLL`, `Footer` | Landing page |
| `/booking` | `Booking` → `BookingForm` | Reservation form |
| `/confirmed` | `ConfirmedBooking` | Confirmation screen after a successful submission |

Booking state (`availableTimes`) is managed at the `Main.js` level with `useReducer` and passed down as props to `Booking`/`BookingForm`.

---

## Testing

The project is configured for unit testing with Jest, Babel and React Testing Library. However, at the current `HEAD`, `src/App.test.js` contains only a **commented-out** test for `BookingForm`, so `npm test` currently reports no active tests. See [Known Limitations](#known-limitations) and `docs/TROUBLESHOOTING.md` for details and suggested fixes.

---

## Known Limitations

- The active test suite is currently empty (see above).
- The `Testimonials` section renders data from `Recipes.js` (recipe cards) rather than dedicated customer testimonial content.
- `About.js` is an unused placeholder component; the real "About" content lives in `AboutLL.js`.
- The booking flow uses a local, seeded pseudo-random mock for available times and always resolves `submitAPI` as successful; it does not call the Coursera capstone `api.js` script that is loaded in `public/index.html`.

Full details, root causes and fixes are documented in [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md).

---

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) – component architecture, state and data flow.
- [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) – reference for the app's events, callbacks and mock/external API surface.
- [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) – known issues found during code review and how to address them.

---

## Author

Erik Reyes (Keke) – [GitHub](https://github.com/Kekekingg) · [Portfolio](https://portfolio-erik-reyes-keke.netlify.app)

---

## Acknowledgements

Built as the capstone project for Coursera's **Meta Front-End Developer Professional Certificate**. UI content and branding are for educational purposes only.
