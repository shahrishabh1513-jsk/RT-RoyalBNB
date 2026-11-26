# RT ROYAL BNB v2 - Hotel Booking & Management (Frontend)

Complete, redesigned hotel booking website built with **HTML + CSS + JavaScript only** (no PHP / MySQL).
Design & Developed by **RT1504** | (c) Copyright RT_ROYAL_BNB

## Run it
Serve the folder with any static server and open `index.html`:
* XAMPP: copy the folder to `htdocs` -> http://localhost/RT_ROYAL_BNB/
* VS Code: right-click `index.html` -> Open with Live Server
* or: `python -m http.server 8000` in this folder -> http://localhost:8000/
(Google Fonts load from the internet; everything else is local.)

## Demo logins
| Area | URL | Login | Password |
|------|-----|-------|----------|
| Customer | `login.html` | `aarav@example.com` | `Test@123` |
| Admin | `admin/index.html` | `admin` | `admin123` |

Coupons to try at checkout: `RT10`, `ROYAL15`, `FIRSTSTAY`. Test card ending `0000` = failed payment demo.
Reset all demo data any time: add `?resetdb` to any page URL.

## Pages
**Website:** Home (hero, search, destinations, featured hotels, trip plans, must-visit places, offers) - Hotels (location tabs, filters, sorting) - Hotel Details - Room Details - Booking - Payment & Confirmation - Login / Register / Forgot password - My Bookings - My Profile (+ wishlist) - Invoice - Facilities - About Us - Contact Us.
**Admin:** Dashboard (revenue, bookings, occupancy, charts) - Manage Hotels - Manage Rooms - Bookings - Manage Customers - Manage Payments (refunds, CSV) - Messages.

## Data
5 destinations (Udaipur, Jaisalmer, Jaipur, Jodhpur, Dwarka), 17 sample hotels (3-5 per destination), 2 room categories each,
with prices, ratings and distances to nearby places. All data is stored in the browser (localStorage) via `js/store.js`.
Hotel names and details are fictional sample content - replace them from the Admin panel.

## Replace the placeholders
* Hotel / room photos: upload from Admin > Manage Hotels (or replace files in `images/photos/`).
* Team photos: `images/team/` (Tanisha Mistry and Meera Joshi show monogram avatars until you add photos in `about.html`).
* GitHub link: search for `github.com/RT1504` and update it to your real profile.
* Email addresses (`hello@royalbnb.com`) are samples.

## Structure
`index.html, hotels.html, hotel.html, room.html, booking.html, payment.html, bookings.html, profile.html, invoice.html, login.html, about.html, facilities.html, contact.html`
`css/style.css` (palette variables at top) - `js/store.js` (data + booking logic) - `js/ui.js` (icons, illustrations, header/footer) - `js/pages/*.js` - `admin/*`
