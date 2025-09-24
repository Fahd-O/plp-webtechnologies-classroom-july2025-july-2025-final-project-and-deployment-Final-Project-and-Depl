// js/main.js
// Site-wide JS: nav toggle, footer year injection, simple gallery lightbox handling
// Vanilla JS, no libraries. Keep it small and accessible.

document.addEventListener('DOMContentLoaded', () => {
  /* ===== NAV TOGGLE (mobile) ===== */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // If opened, move focus to first link for better keyboard flow
      if (isOpen) {
        const firstLink = mainNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close mobile nav when any link inside is clicked (helps on small screens)
    mainNav.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== FOOTER YEAR ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== SIMPLE LIGHTBOX / GALLERY MODAL =====
     Behavior:
     - Any element with attribute data-full (URL to large image) or class .gallery-thumb will open the lightbox.
     - The lightbox can be closed via:
         - click on the close button
         - pressing Escape
         - clicking outside the image (on backdrop)
  */
  function createLightbox(imgSrc, imgAlt = '') {
    // Prevent multiple lightboxes
    if (document.querySelector('.lightbox')) return null;

    const modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.tabIndex = -1; // allow focusing for keyboard events

    modal.innerHTML = `
      <div class="lightbox-inner" role="dialog" aria-modal="true" aria-label="Image preview">
        <button class="close" aria-label="Close image viewer">×</button>
        <img src="${imgSrc}" alt="${escapeHtml(imgAlt)}">
      </div>
    `;

    document.body.appendChild(modal);
    // move focus to close button
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) closeBtn.focus();

    // close handlers
    function removeModal() {
      if (!modal) return;
      modal.remove();
      document.removeEventListener('keyup', escHandler);
    }

    function escHandler(e) {
      if (e.key === 'Escape') removeModal();
    }

    // Close on close button click
    closeBtn.addEventListener('click', removeModal);

    // Close when clicking backdrop (outside .lightbox-inner)
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) removeModal();
    });

    // Close on Escape
    document.addEventListener('keyup', escHandler);

    return modal;
  }

  // Utility: very small HTML escape for alt text injection
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Delegate clicks for thumbs that should open modal:
  // Accept elements with: data-full attribute OR class "gallery-thumb" with data-full
  document.body.addEventListener('click', (e) => {
    const thumb = e.target.closest('[data-full], .gallery-thumb, .thumb[data-full]');
    if (!thumb) return;

    // If element is an anchor that points to a page (href), but also has data-full,
    // prevent navigation and open lightbox instead.
    const full = thumb.dataset.full;
    if (!full) return; // nothing to open

    // Prevent default navigation (useful when thumbs are anchors)
    if (e.target.closest('a')) e.preventDefault();

    const alt = thumb.querySelector('img') ? thumb.querySelector('img').alt : thumb.getAttribute('aria-label') || '';
    createLightbox(full, alt);
  });
});
