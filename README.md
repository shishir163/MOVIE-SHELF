# MovieShelf

My personal shelf of movies, TV series and natok I have watched or want to watch.
A PWA: install it from the browser, works offline, data stays on the phone.

## Put it on GitHub Pages
1. Make a new repository, e.g. `movieshelf`.
2. Upload everything in this folder (`index.html`, `manifest.json`, `sw.js`, `icons/`).
3. Repository **Settings → Pages → Branch: main / root → Save**.
4. Open `https://<your-username>.github.io/movieshelf/` on the phone.
5. iPhone: Safari → Share → *Add to Home Screen*. Android: Chrome menu → *Install app*.

## First use
- Settings → paste a free **TMDB API key** (posters, cast, director, story).
- Optional: **OMDb key** for the IMDb rating.
- Remove the example titles from the banner on the home screen.

## Backup
Settings → *Save backup to Google Drive* opens the phone's share menu; pick Drive.
*Restore from backup* reads the same file back. *Export CSV* opens in Excel / Google Sheets.

When you change the app, raise `APP_VERSION` in `index.html`; the service worker version follows it.
