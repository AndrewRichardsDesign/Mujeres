# Voces del 8M

A static website for "Voces del 8M" — a project celebrating International Women's Day (March 8th).

## Project Structure

- `index.html` — Main homepage with sections: Participate, Collaborators, Sheets, Activists
- `march.html` — The March page
- `styles.css` — All site styles
- `script.js` — Client-side JavaScript for navigation/interactivity
- `server.js` — Simple Node.js HTTP server to serve static files on port 5000
- `CNAME` — Custom domain: www.voces8m.com

## Running the Project

The app is served via a Node.js HTTP server:

```
node server.js
```

Runs on `0.0.0.0:5000`.

## Deployment

Configured as a **static** deployment with the root directory (`.`) as the public directory.
