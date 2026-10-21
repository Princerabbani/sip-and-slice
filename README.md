# Sip & Slice — Café & Pizzeria website

A responsive, static website for Sip & Slice. It uses plain HTML, CSS and JavaScript; no Node.js, package installation or build step is required.

## Run locally on Android
1. Download and extract the project ZIP.
2. Open `index.html` in a browser, or open the folder in a code editor with an HTML preview.
3. An internet connection is used for Google Fonts and the food photography. The layout and menu code are local.

## Publish with GitHub Pages
1. Upload `index.html`, `styles.css`, `script.js`, `config.js`, and `README.md` to the repository root (replace the old `config.js` with this updated one).
2. Open repository **Settings → Pages**.
3. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
4. Wait for the Pages deployment. GitHub will show the live website URL in Settings → Pages.

## Before publishing
- Update `phone`, `whatsapp`, `email`, social links, address and hours in `config.js`.
- Replace the example menu names and prices in `script.js` with the actual menu.
- The sample menu prices and menu copy are placeholders and should not be treated as confirmed restaurant pricing.
- Food photos currently load from Unsplash and require an internet connection.

## Files
- `index.html` — page content
- `styles.css` — responsive styling
- `script.js` — menu filters, order button, mobile navigation and contact links
- `config.js` — restaurant details and contact/social configuration
