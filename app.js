'use strict';

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const EMAIL = 'hello@kryptonsec.com';
  // FormSubmit relays submissions to this inbox. The first submission sends a
  // one-time activation email to the address above.
  const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

  const PAGES = [
    ['index.html', 'Home', 'shield'],
    ['services.html', 'Services', 'radar'],
    ['about.html', 'About', 'users'],
    ['contact.html', 'Contact', 'mail'],
  ];
  const SERVICES = [
    ['pentest', 'Penetration Testing'], ['soc', 'SOC-as-a-Service'],
    ['cloud', 'Cloud Security'], ['compliance', 'Compliance and GRC'],
    ['intel', 'Threat Intelligence'], ['awareness', 'Security Awareness'],
  ];
  const ICONS = {
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    term: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10l3 2-3 2M12 15h5"/>',
    cloud: '<path d="M7 18a4 4 0 010-8 5 5 0 019.5-1A4.5 4.5 0 0117 18z"/>',
    audit: '<path d="M5 3h10l4 4v14H5z"/><path d="M9 14l2 2 4-4"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-4 3-6 6.5-6s6.5 2 6.5 6M16 4.5a3 3 0 010 6M18.5 14c2 .6 3 2.6 3 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    in: '<path d="M5 9v10M5 5.5v.01M10 19V9M10 13c0-2 1.5-4 4-4s3.5 1.5 3.5 4v6"/>',
    x: '<path d="M5 5l14 14M19 5L5 19"/>',
    git: '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 3-.3 6-1.5 6-6.5a5 5 0 00-1.4-3.5 4.600 4.600 0 00-.1-3.500s-1.100-.3-3.600 1.400a12 12 0 00-6.400 0C6.500 3.500 5.400 3.800 5.400 3.800a4.600 4.600 0 00-.1 3.500A5 5 0 004 10.800c0 5 3 6.200 6 6.500-.6.600-.6 1.200-.5 2V21"/>',
  };
  const icon = (name) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] ?? ''}</svg>`;
  const current = location.pathname.split('/').pop() || 'index.html';

  /* ── Shared layout ── */
  function mountLayout() {
    const links = PAGES.map(([href, label, ic]) =>
      `<li><a href="${href}"${href === current ? ' aria-current="page"' : ''}>${icon(ic)}${label}</a></li>`).join('');

    $('#site-header').outerHTML = `
      <header id="hdr"><div class="wrap">
        <a class="brand" href="index.html" aria-label="Krypton home">${icon('shield')}KR<em>Y</em>PTON</a>
        <nav aria-label="Primary"><ul id="menu">${links}<li><a class="cta" href="contact.html">Get Protected</a></li></ul></nav>
        <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><b></b><b></b></button>
      </div></header>
      <div class="scrim"></div><div class="prog"></div>
      <button class="top" aria-label="Back to top">${icon('up')}</button>`;

    const page = PAGES.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('');
    const svc = SERVICES.map(([id, l]) => `<li><a href="services.html#${id}">${l}</a></li>`).join('');
    $('#site-footer').outerHTML = `
      <footer><div class="wrap">
        <div class="fg">
          <div>
            <a class="brand" href="index.html">KR<em>Y</em>PTON</a>
            <p style="margin-top:1rem;max-width:34ch">Offensive and defensive security for organisations that cannot afford downtime.</p>
            <div class="soc">
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener">${icon('in')}</a>
              <a href="https://x.com/" aria-label="X" target="_blank" rel="noopener">${icon('x')}</a>
              <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener">${icon('git')}</a>
              <a href="mailto:${EMAIL}" aria-label="Email">${icon('mail')}</a>
            </div>
          </div>
          <div><h4>Company</h4><ul>${page}</ul></div>
          <div><h4>Services</h4><ul>${svc}</ul></div>
          <div><h4>Contact</h4><ul>
            <li><a href="mailto:${EMAIL}">${icon('mail')}${EMAIL}</a></li>
            <li><a href="tel:+2348005797866">${icon('phone')}+234 800 KRYPTON</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=Lagos+Nigeria" target="_blank" rel="noopener">${icon('pin')}Lagos, Nigeria</a></li>
          </ul></div>
        </div>
        <div class="legal"><span>&copy; ${new Date().getFullYear()} Krypton Security Ltd. All rights reserved.</span><span>Responsible disclosure: ${EMAIL}</span></div>
      </div></footer>`;
  }

  const hydrateIcons = () => $$('[data-i]').forEach((el) => { el.outerHTML = icon(el.dataset.i); });

  /* ── Mobile navigation ── */
  function initNav() {
    const btn = $('.burger'), menu = $('#menu'), scrim = $('.scrim');
    const set = (open) => {
      menu.classList.toggle('open', open);
      scrim.classList.toggle('on', open);
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    scrim.addEventListener('click', () => set(false));
    menu.addEventListener('click', (e) => e.target.closest('a') && set(false));
    addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
    matchMedia('(min-width: 861px)').addEventListener('change', (e) => e.matches && set(false));
  }

  /* ── Scroll state: header, progress bar, back-to-top ── */
  function initScroll() {
    const hdr = $('#hdr'), prog = $('.prog'), top = $('.top');
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      hdr.classList.toggle('stuck', scrollY > 8);
      top.classList.toggle('on', scrollY > 600);
      prog.style.setProperty('--p', max > 0 ? scrollY / max : 0);
      frame = 0;
    };
    addEventListener('scroll', () => { frame ||= requestAnimationFrame(update); }, { passive: true });
    top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
    update();
  }

  /* ── Reveal on scroll with staggered children ── */
  function initReveal() {
    $$('[data-stagger]').forEach((group) =>
      [...group.children].forEach((child, i) => { child.classList.add('rv'); child.style.setProperty('--i', i); }));
    $$('[data-rv]').forEach((el) => el.classList.add('rv'));
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.rv').forEach((el) => io.observe(el));
  }

  /* ── Animated counters ── */
  function initCounters() {
    const easeOut = (t) => 1 - (1 - t) ** 4;
    const render = (el, value) => {
      const decimals = (el.dataset.count.split('.')[1] ?? '').length;
      el.textContent = value.toFixed(decimals) + (el.dataset.suffix ?? '');
    };
    const run = (el) => {
      const end = parseFloat(el.dataset.count);
      if (reduce) return render(el, end);
      const start = performance.now(), duration = 1600;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        render(el, end * easeOut(p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      io.unobserve(entry.target);
    }), { threshold: 0.6 });
    $$('[data-count]').forEach((el) => io.observe(el));
  }

  /* ── Cursor spotlight on cards ── */
  function initSpotlight() {
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest?.('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ── Seamless ticker (duplicate content for a gapless loop) ── */
  const initTicker = () => $$('.tick div').forEach((t) => { t.innerHTML += t.innerHTML; });

  /* ── Page transitions between local pages ── */
  function initTransitions() {
    addEventListener('pageshow', () => document.body.classList.remove('leaving'));
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href);
      const local = url.protocol === 'file:' || (/^https?:$/.test(url.protocol) && url.origin === location.origin);
      if (!local || (url.pathname === location.pathname && url.hash)) return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => { location.href = a.href; }, reduce ? 0 : 280);
    });
  }

  /* ── Contact form ── */
  function initForm() {
    const form = $('#cf');
    if (!form) return;
    const note = $('.note', form), submit = $('[type=submit]', form);
    const rules = {
      name: (v) => v.trim().length >= 2,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      organisation: (v) => v.trim().length >= 2,
      message: (v) => v.trim().length >= 10,
    };
    const check = (el) => {
      const ok = !rules[el.name] || rules[el.name](el.value);
      el.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    const say = (type, html) => { note.className = `note on ${type}`; note.innerHTML = html; };

    const topic = new URLSearchParams(location.search).get('topic');
    const preset = $$('option', form).find((o) => o.dataset.topic === topic);
    if (preset) preset.selected = true;

    form.addEventListener('input', (e) => {
      if (e.target.getAttribute('aria-invalid') === 'true') check(e.target);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = $$('[name]', form).filter((el) => el.name in rules).filter((el) => !check(el));
      if (invalid.length) {
        invalid[0].focus();
        return say('err', 'Please correct the highlighted fields.');
      }
      submit.disabled = true;
      submit.classList.add('load');
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        form.reset();
        say('ok', 'Message received. A senior consultant will reply within one business day.');
      } catch {
        say('err', `We could not send your message. Please retry or email <a href="mailto:${EMAIL}">${EMAIL}</a>.`);
      } finally {
        submit.disabled = false;
        submit.classList.remove('load');
      }
    });
  }

  const boot = () => {
    mountLayout();
    hydrateIcons();
    initNav();
    initScroll();
    initReveal();
    initCounters();
    initSpotlight();
    initTicker();
    initTransitions();
    initForm();
  };
  document.readyState === 'loading' ? addEventListener('DOMContentLoaded', boot) : boot();
})();
