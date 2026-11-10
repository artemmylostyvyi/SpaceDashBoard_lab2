# Space Launches Dashboard

Lab 2 for the KOP course: a React + Vite dashboard that loads real launch data
from [The Space Devs Launch Library 2](https://thespacedevs.com/llapi) API.

## Features

- API data fetched with `useEffect` and stored in `useState`
- Explicit `loading` / `error` / `empty` states, with a retry button
- Sortable table (launch name, agency, date) and status filter
- KPI cards derived from real data (nearest launch, launches this year,
  success rate)
- Agency chart derived from loaded launches
- Launch drilldown with rocket, pad, location, orbit and description
- Dark / light theme

## API

The base URL is configured through `VITE_API_BASE_URL` and defaults to the
development endpoint:

```
https://lldev.thespacedevs.com/2.3.0
```

To use production, create `.env` from `.env.example` and set:

```
VITE_API_BASE_URL=https://ll.thespacedevs.com/2.3.0
```

Production is rate-limited to 15 anonymous requests per hour; development has
no rate limits but may return limited or stale data.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Structure

```
src/
  api/launches.js          # API requests + normalization
  hooks/useLaunches.js     # request lifecycle (useEffect + state)
  utils/                   # KPI/agency/sort/date helpers
  components/              # presentational widgets
  App.jsx                  # container: data + theme wiring
```
