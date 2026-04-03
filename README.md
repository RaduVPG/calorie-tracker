# CalTrack

CalTrack is a lightweight, offline-first calorie and macro tracker built as a static web app.
It runs entirely in the browser, stores data in `localStorage`, and can be deployed directly to GitHub + Vercel with no backend.

## What it does

- onboarding flow for age, sex, height, weight, activity, and goal
- English / Romanian UI toggle across onboarding, result, and main app screens
- calculates BMR, TDEE, calorie target, and macro targets
- daily meal logging with calories, protein, carbs, and fat
- recipe builder with offline ingredient lookup and macro autofill per 100g / serving
- local history view with streak tracking
- privacy-friendly: no login, no server, no cloud sync

## Tech

- HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage`
- Static hosting on Vercel
- bundled offline ingredient dataset (`ingredients-library-full.json`)

## Project structure

- `index.html` — main app shell
- `styles.css` — app styles
- `script.js` — application logic
- `manifest.webmanifest` — install metadata
- `vercel.json` — Vercel deployment config
- `calorie_tracker.html` — compatibility redirect to `/`

## Production-ready improvements included

- split code into maintainable files
- fixed the screen boot / reload bug
- fixed day-key generation to use local date instead of UTC
- added input validation and state sanitization
- added legacy localStorage migration from `caltrak_v2` to `caltrack_v3`
- escaped user-entered meal names before rendering
- added deploy metadata and safe default response headers

## Local development

You can open `index.html` directly in a browser, or use any static file server.

Example:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy to GitHub + Vercel

### 1) Push to GitHub

```bash
git add .
git commit -m "ship production-ready CalTrack"
git push origin master
```

### 2) Import in Vercel

- Go to <https://vercel.com/new>
- Import the GitHub repo
- Framework preset: **Other** / static site
- No build command required
- No environment variables required

Vercel will serve `index.html` automatically.

## Notes

- data is stored per browser/device; clearing browser storage deletes it
- this version is intentionally backend-free
- if you want cross-device sync later, add an API layer explicitly instead of overloading localStorage behavior
