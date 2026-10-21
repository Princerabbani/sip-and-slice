# Sip & Slice — premium café website

A responsive, static HTML/CSS/JavaScript website for Sip & Slice. No package installation or build step is required.

## What's included
- Premium, mobile-first café design with menu filters, story section, photo gallery and location details.
- Shopping bag with quantities and a subtotal.
- WhatsApp checkout message with items, quantities, customer name, order preference and notes.
- Browser-only menu manager: add/edit/delete items, import/export JSON backups, and restore the sample menu.
- Responsive navigation, keyboard-dismissible dialogs and reduced-motion support.

## Configure before real customer orders
Edit `config.js` and replace the placeholder phone, WhatsApp number, email and social links. The WhatsApp number must use the international country code with digits only (India starts with 91). Update the address, opening hours and Google Maps link if needed.

Replace the sample menu names, descriptions, image URLs and prices in `script.js` with the actual café menu. Sample prices are not confirmed prices. Gallery photos are illustrative inspiration; replace them with real café photography when available.

## Menu manager limitation
The **Menu manager** button in the footer edits data in the current browser's local storage. It is not a secure admin login, does not write to GitHub, and does not synchronise changes to other customers or devices. Use **Export menu JSON** for a backup. To publish the shared menu, update the `defaultMenuItems` array in `script.js` and commit the change to GitHub. A true multi-device admin dashboard requires authenticated backend/database hosting.

## WhatsApp checkout
The checkout opens WhatsApp with a prefilled order message. It does not charge customers or automatically confirm an order. The café must reply to confirm availability, final price and any delivery charges.

## Run and publish
Open `index.html` in a browser or use an HTML preview in a code editor. Google Fonts and Unsplash photography need internet access. If GitHub Pages already publishes from `main` and `/(root)`, committing these files to `main` should trigger a deployment. See [GitHub Pages publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Files
- `index.html` — page content, gallery, cart drawer and menu manager
- `styles.css` — responsive premium styling
- `script.js` — menu, cart, WhatsApp checkout and local menu manager
- `config.js` — café contact details, location and opening hours
