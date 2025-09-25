# Hibelive Carton Packaging — Catalogue Website

**A simple, responsive, multi-page catalogue website** for *Hibelive Carton Packaging* (plain & printed cartons).
Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no back-end, no libraries. Designed to meet the PLP final assignment requirements.

---

## Live demo

Project was deployed using GitHub Pages, check it out below:
> [Click me, or else...](https://fahd-o.github.io/plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl/)

---

## Project purpose

Showcase Hibelive’s products and services, let customers request quotes, view past work, and contact the owner via WhatsApp or email. The quote form is interactive (client-side validation) and constructs a prefilled `mailto:` or WhatsApp message — no server required.

---

## Features

* Multi-page site: `index`, `about`, `products`, `gallery`, `quote`
* Responsive, mobile-first layout
* Accessible semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`, etc.)
* Responsive navigation with keyboard-accessible hamburger toggle
* Quote request form with client-side validation and two submit options:

  * Launch email client with prefilled message (`mailto:`)
  * Open WhatsApp Web / mobile with prefilled message
* Gallery with lightbox modal (keyboard `Esc` to close, click backdrop to close)
* Downloadable catalogue placeholder (`assets/catalogue.pdf`)
* Contact links (WhatsApp + email) throughout site
* Clean file/folder structure ready for GitHub Pages deployment

---

## Repository structure

```
plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl/
├─ docs/    
│	├─ index.html
│	├─ about.html
│	├─ products.html
│	├─ gallery.html
│	├─ quote.html
│	├─ css/
│	│  └─ main.css
│	├─ js/
│	│  ├─ main.js
│	│  └─ form.js
│	├─ images/
│	│  └─ (favicon, hero.jpg, product images, gallery thumbs, etc.)
│	├─ assets/
│	│  └─ catalogue.pdf
│	└─ README.md
└─ README.md
```

---

## Where key code lives

* **Header / footer**: repeated markup in each HTML file — links to all pages.
* **Styling**: `css/main.css` — responsive/styles for layout, hero, cards, gallery, form, and lightbox.
* **Site JS**: `js/main.js`
  * Nav toggle and `aria-expanded`
  * Footer year injection
  * Lightbox creation & keyboard handling
* **Form handling**: `js/form.js`
  * Client-side validation (uses `form.checkValidity()`)
  * Opening the user email client via `mailto:` with a prefilled subject/body
  * Opening WhatsApp via `https://wa.me/...?text=...`
  * File uploads are local only — note is included on the quote page.

---

## How to run locally

1. Clone the repo:

   ```bash
   git clone https://github.com/Fahd-O/plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl.git
   cd plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl
   ```
2. Open `index.html` directly in your browser.
3. Open other pages from the navigation or by visiting `about.html`, `products.html`, `gallery.html`, `quote.html`.

---

## How the quote form works (important)

* The form validates required fields in-browser.
* On **Submit (Email)**: JS builds a message body and triggers `window.location.href = mailto:...` which opens the user’s default email client with a prefilled subject/body. The user then manually attaches any files.
* On **Send via WhatsApp**: JS opens `https://wa.me/<number>?text=<encoded message>` in a new tab/window — user can send via WhatsApp Web or mobile.
* Rationale: satisfies the assignment’s interactivity requirement without using backend services.

---

## License

This project is provided under the **MIT License** — feel free to copy and adapt for your coursework; attribute if reused.
