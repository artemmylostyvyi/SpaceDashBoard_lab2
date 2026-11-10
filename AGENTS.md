# AGENTS.md

## Project

Space Launches Dashboard — lab 2 (KOP course). React + Vite SPA that loads real
launch data from The Space Devs Launch Library 2 (LL2) API. Continues lab 1,
where every value came from hardcoded mock data.

## Domain

- Launch: name, date (NET), agency, rocket, launch pad, location, status,
  mission type, orbit
- Agency: name, launch count (derived from loaded launches)
- KPIs: nearest launch, launches this year, success rate
- Drilldown: launch -> rocket, pad, location, status, mission details

## API

- Base URL comes from `VITE_API_BASE_URL`, default
  `https://lldev.thespacedevs.com/2.3.0` (development endpoint, no rate limits).
- Production `https://ll.thespacedevs.com/2.3.0` is rate-limited to 15
  anonymous requests per hour and allows CORS (`*`).
- Endpoints used:
  - `GET /launches/upcoming/?year=<year>&limit=20&mode=normal`
  - `GET /launches/previous/?net__gte=<year>-01-01T00:00:00Z&limit=100&mode=normal`
- All data access lives in `src/api/launches.js`; request lifecycle lives in
  `src/hooks/useLaunches.js`. Never fetch inside presentational components.

## Stack

- Vite + React (JavaScript, no TypeScript)
- Tailwind CSS
- No chart library; simple CSS bar chart

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## Structure

```
src/
  main.jsx
  App.jsx
  index.css
  api/launches.js
  hooks/useLaunches.js
  utils/formatDate.js
  utils/deriveKpis.js
  utils/deriveAgencies.js
  utils/sortLaunches.js
  components/
    layout/DashboardLayout.jsx
    DashboardView/DashboardView.jsx
    KpiCard/KpiCard.jsx
    ThemeToggle/ThemeToggle.jsx
    QueryState/QueryState.jsx
    LaunchesTable/LaunchesTable.jsx
    LaunchesTable/SortButton.jsx
    LaunchesTable/LaunchRow.jsx
    LaunchesTable/LaunchFilter.jsx
    LaunchDrilldown/LaunchDrilldown.jsx
    AgencyChart/AgencyChart.jsx
```

## Conventions

- Container / presentational split: `App.jsx` and `useLaunches` own data and
  request state; widgets receive plain props and never fetch.
- Side effects only in `useEffect`; every request uses `AbortController` and
  ignores `AbortError` so StrictMode remounts are safe.
- Request state is explicit: `loading` / `error` / `empty` / `success`.
- Derived state via `useMemo`: filtering and sorting never mutate the original
  array (`filter`, `[...launches].sort`).
- Sorting supports at least `name`, `date`, `agency` with a direction toggle.
- Stable `key` from `launch.id`, never array index.
- Immutable updates only (`map`/`filter`/`spread`), never mutate arrays/objects.
- Controlled inputs for filters and toggles.
- Callbacks passed as props (`onSelect`, `onSort`, `onChange`, `onRetry`).
- All UI labels in English; Tailwind utilities only; no design system.

## Widgets

- `KpiCard` — reusable, rendered 3x with derived KPI props
- `QueryState` — loading / error / empty states with retry
- `LaunchesTable` + `SortButton` + `LaunchRow` + `LaunchFilter` + `LaunchDrilldown`
- `AgencyChart` — launches per agency (CSS bars)
- `ThemeToggle` — local theme state + conditional rendering

## Non-goals (lab 2)

- Auth, routing, persistence, tests
- Premature abstraction or global state libraries
- Chart libraries
