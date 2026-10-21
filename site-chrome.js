(() => {
  const header = document.querySelector('[data-gw-header]');
  if (!header) return;
  const button = header.querySelector('.gw-menu-toggle');
  const links = header.querySelector('#gw-main-links');
  if (!button || !links) return;
  document.documentElement.classList.add('gw-nav-ready');
  const setOpen = open => {
    button.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  };
  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  window.matchMedia('(min-width: 981px)').addEventListener('change', event => {
    if (event.matches) setOpen(false);
  });
})();

// MailerLite loads later and its ID-scoped important rules override page CSS.
// Set the shared font on the embed's own elements as they are rendered.
(() => {
  document.querySelectorAll('.ml-embedded').forEach(host => {
    const applyFonts = () => {
      host.querySelectorAll('p,span,div,label,input,button,select,textarea,h1,h2,h3,h4,h5').forEach(element => {
        const family = /^H[1-5]$/.test(element.tagName) ? 'var(--gw-serif)' : 'var(--gw-sans)';
        if (element.style.getPropertyValue('font-family') !== family || element.style.getPropertyPriority('font-family') !== 'important') {
          element.style.setProperty('font-family', family, 'important');
        }
      });
    };
    applyFonts();
    if (window.MutationObserver) {
      new MutationObserver(applyFonts).observe(host, { childList: true, subtree: true });
    }
  });
})();
