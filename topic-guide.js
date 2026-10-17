// The fictional loading model illustrates moment and CG; it accepts no aircraft data.
(() => {
  const model = document.querySelector('[data-loading-model]');
  if (!model) return;
  const slider = model.querySelector('#load-arm');
  const update = () => {
    const arm = Number(slider.value);
    const moment = 200 * arm;
    const cg = (1600 * 40 + moment) / 1800;
    model.querySelector('#arm-value').textContent = String(arm);
    model.querySelector('#moment-value').textContent = moment.toLocaleString('en-US');
    model.querySelector('#cg-value').textContent = cg.toFixed(2);
    model.querySelector('#load-marker').style.left = `${arm}%`;
    slider.setAttribute('aria-valuetext', `${arm} inches aft of datum. Combined center of gravity ${cg.toFixed(2)} inches.`);
  };
  slider.addEventListener('input', update);
  update();
})();

// Preserve readable MailerLite fields when its asynchronous embed arrives on iOS.
(() => {
  const host = document.querySelector('.ml-embedded');
  if (!host) return;
  const mq = window.matchMedia('(max-width: 760px)');
  const fix = () => {
    if (!mq.matches) return;
    host.querySelectorAll('input, textarea, select').forEach(el => {
      el.style.setProperty('font-size', '16px', 'important');
    });
  };
  fix();
  if (window.MutationObserver) new MutationObserver(fix).observe(host, {childList: true, subtree: true});
  if (mq.addEventListener) mq.addEventListener('change', fix);
  else mq.addListener(fix);
})();
