(() => {
  const button = document.querySelector('.menu-button');
  const links = document.getElementById('main-links');
  function closeMenu() {
    button.setAttribute('aria-expanded', 'false');
    links.classList.remove('open');
  }
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    links.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      button.focus();
    }
  });
  links.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  window.matchMedia('(min-width: 881px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
})();
