# Voces del 8M

A static website for "Voces del 8M" — a project celebrating International Women's Day (March 8th).

## Project Structure

- `index.html` — Main homepage with sections: Participate, Collaborators, The March (interactive map + gallery), Sheets, Activists
- `march.html` — Legacy city-specific march page (Before/During/After tabs with flip cards + audio)
- `styles.css` — All site styles
- `script.js` — Client-side JavaScript for navigation/interactivity
- `translations.js` — i18n translation dictionary (English/Spanish) and language switching logic
- `server.js` — Simple Node.js HTTP server to serve static files on port 5000
- `fetch-drive-photos.js` — Utility script to fetch photos from Google Drive (uses @replit/connectors-sdk)
- `images/` — Downloaded photos from Google Drive "Website 8M" folder
- `CNAME` — Custom domain: www.voces8m.com

## Images (from Google Drive)

Downloaded from the "Website 8M" folder. Contains:
- **Collaborator profile photos**: helen-caridad.jpg, mel-pacheco.jpg, model.jpg, valeria.jpg, kim-carolina.jpg, gordofobia.jpg, brenda.jpg
- **March photos** (March 8, 2026): 20 timestamped photos (20260308_*.jpg)
- **Instagram screenshots**: 5 screenshot images

## Google Drive Integration

- Connected via Replit's Google Drive connector (connection ID: conn_google-drive_01KKCR1Y05N47CWFQBAP5JQXJX)
- Uses `@replit/connectors-sdk` for authenticated API requests
- `fetch-drive-photos.js` supports: `folders`, `list <folderId>`, `download <folderId> [destDir]`

## Localization (i18n)

- All translatable text uses `data-i18n` attributes on HTML elements
- `translations.js` contains `en` and `es` translation dictionaries
- Language is switched via "Spanish"/"English" buttons (hero section on index.html, top bar on march.html)
- Selected language is persisted in `localStorage` under key `voces8m-lang`
- `setLanguage(lang)` function applies translations by iterating `[data-i18n]` elements

## Running the Project

The app is served via a Node.js HTTP server:

```
node server.js
```

Runs on `0.0.0.0:5000`.

## Design

- Primary color: `#5150f7`, dark: `#1a1a2e`
- Fonts: Playfair Display (headings) + Inter (body)
- Card border-radius: 16px, soft shadows
- Nav bar: white `#FFFFFF` with dark text, sticky, active link has purple underline
- Leaflet (OpenStreetMap) for interactive map

## Deployment

Configured as a **static** deployment with the root directory (`.`) as the public directory.
