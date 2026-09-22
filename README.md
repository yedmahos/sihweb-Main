# Trinetraa

AML predictive intelligence frontend. This package is the visually redesigned local copy.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

From this folder:

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

`npm run dev` starts the Vite dev server on port 5173. The app loads with the redesigned interface.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` typechecks and writes the static site to `dist/`. `npm run preview` serves that build locally.

## Backend

API calls use `VITE_API_BASE_URL` from `.env`. The default is `http://localhost:8000/api`.

The dev server also proxies `/api` to `http://localhost:8000`.

If that backend is not running, the interface still opens and uses its existing offline fallback. Live investigation data appears when the API is available.
