// Progressive enhancement. FAQs work natively without JavaScript.
for (const header of document.querySelectorAll('.red-site-header')) {
  const toggle = header.querySelector('[data-menu-toggle]');
  const nav = header.querySelector('nav');
  if (!toggle || !nav) continue;
  header.setAttribute('data-menu-ready', '');
  const close = () => { nav.removeAttribute('data-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu'; };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? 'Close menu' : 'Menu';
    nav.toggleAttribute('data-open', open);
  });
  header.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); toggle.focus(); } });
  nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  matchMedia('(min-width: 48rem)').addEventListener('change', close);
}
// Local-only form specimen: validates and reports that nothing was sent.
for (const form of document.querySelectorAll('[data-demo-form]')) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('[name=email]');
    const error = form.querySelector('[data-email-error]');
    const status = form.querySelector('[role=status]');
    const valid = input.validity.valid;
    input.setAttribute('aria-invalid', String(!valid)); error.hidden = valid;
    status.textContent = valid ? 'Demo complete. Your details have not been saved or sent.' : '';
    if (!valid) input.focus();
  });
}
