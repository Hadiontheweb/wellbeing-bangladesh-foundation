/* ============================================================
   Wellbeing Bangladesh Foundation — Homepage Scripts
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Flag JS availability (gates scroll-reveal CSS) ---------- */
  document.documentElement.classList.add('js');

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header — frosted glass past 50px ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- "More" dropdown ---------- */
  const moreWrap = document.getElementById('navMore');
  const moreBtn = document.getElementById('moreBtn');
  if (moreWrap && moreBtn) {
    const closeMore = () => {
      moreWrap.classList.remove('open');
      moreBtn.setAttribute('aria-expanded', 'false');
    };
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = moreWrap.classList.toggle('open');
      moreBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!moreWrap.contains(e.target)) closeMore();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMore();
    });
    moreWrap.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMore();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const dur = 2200;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          animateCounter(en.target);
          cio.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = (parseInt(el.dataset.target, 10) || 0).toLocaleString('en-US');
    });
  }

  /* ---------- Bangladesh Wellbeing Framework — wheel ---------- */
  const DIMENSIONS = [
    {
      icon: 'i-heart',
      title: 'Physical Wellbeing',
      desc: 'Living a healthy, active and energetic life through proper nutrition, movement, sleep, preventive healthcare and healthy lifestyle choices.',
      tags: ['Nutrition', 'Physical Activity', 'Preventive Health', 'Healthy Lifestyle', 'Quality Sleep']
    },
    {
      icon: 'i-brain',
      title: 'Mental & Emotional Wellbeing',
      desc: 'Developing emotional resilience, psychological wellbeing, positive thinking and the ability to manage stress while maintaining inner peace.',
      tags: ['Emotional Intelligence', 'Stress Management', 'Resilience', 'Positive Mental Health', 'Self-awareness']
    },
    {
      icon: 'i-family',
      title: 'Social & Family Wellbeing',
      desc: 'Building healthy relationships, nurturing strong families, strengthening communities and creating a culture of trust, compassion and belonging.',
      tags: ['Family Relationships', 'Parenting', 'Social Connection', 'Community Engagement', 'Inclusion']
    },
    {
      icon: 'i-spark',
      title: 'Financial Wellbeing',
      desc: 'Building financial literacy, responsible money management, economic resilience and long-term financial security for individuals and families.',
      tags: ['Financial Literacy', 'Saving', 'Budgeting', 'Entrepreneurship', 'Economic Security']
    },
    {
      icon: 'i-briefcase',
      title: 'Professional Wellbeing',
      desc: 'Creating meaningful careers, productive workplaces, inspiring leadership and a healthy balance between professional success and personal life.',
      tags: ['Career Development', 'Leadership', 'Productivity', 'Workplace Wellness', 'Work-Life Balance']
    },
    {
      icon: 'i-book',
      title: 'Educational Wellbeing',
      desc: 'Encouraging lifelong learning, creativity, knowledge, skills development and continuous personal and professional growth.',
      tags: ['Lifelong Learning', 'Skills Development', 'Creativity', 'Innovation', 'Knowledge']
    },
    {
      icon: 'i-leaf',
      title: 'Environmental Wellbeing',
      desc: 'Promoting sustainable living, environmental responsibility and healthy ecosystems that support present and future generations.',
      tags: ['Climate Awareness', 'Green Living', 'Clean Environment', 'Sustainability', 'Conservation']
    },
    {
      icon: 'i-flower',
      title: 'Spiritual & Purpose Wellbeing',
      desc: 'Helping individuals discover meaning, purpose, values and inner fulfilment while respecting diverse beliefs, cultures and life journeys.',
      tags: ['Purpose', 'Values', 'Gratitude', 'Mindfulness', 'Inner Peace']
    },
    {
      icon: 'i-hands',
      title: 'Ethical Wellbeing',
      desc: 'Promoting integrity, honesty, responsibility, ethical leadership and responsible citizenship to build trust and strengthen society.',
      tags: ['Integrity', 'Ethics', 'Accountability', 'Responsible Citizenship', 'Good Governance']
    },
    {
      icon: 'i-people',
      title: 'Cultural Wellbeing',
      desc: 'Celebrating cultural heritage, diversity, creativity and shared identity while fostering mutual respect, inclusion and social harmony.',
      tags: ['Heritage', 'Diversity', 'Language', 'Arts', 'Cultural Identity']
    }
  ];

  const wheel = document.getElementById('wheel');
  const dimTitle = document.getElementById('dimTitle');
  const dimDesc = document.getElementById('dimDesc');
  const dimTags = document.getElementById('dimTags');
  const dimCount = document.getElementById('dimCount');
  const btnPrev = document.getElementById('dimPrev');
  const btnNext = document.getElementById('dimNext');
  let current = 0;

  if (wheel) {
    const NS = 'http://www.w3.org/2000/svg';
    DIMENSIONS.forEach((d, i) => {
      const angle = (360 / DIMENSIONS.length) * i - 90;
      const rad = (angle * Math.PI) / 180;
      const R = 41.5; // % of wheel size

      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'w-node';
      node.setAttribute('aria-label', d.title);
      node.style.left = (50 + R * Math.cos(rad)) + '%';
      node.style.top = (50 + R * Math.sin(rad)) + '%';

      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'ic');
      svg.setAttribute('aria-hidden', 'true');
      const use = document.createElementNS(NS, 'use');
      use.setAttribute('href', '#' + d.icon);
      svg.appendChild(use);
      node.appendChild(svg);

      const label = document.createElement('span');
      label.textContent = d.title.replace(' Wellbeing', '');
      node.appendChild(label);

      node.addEventListener('click', () => setDimension(i));
      wheel.appendChild(node);
    });
  }

  function renderDetail() {
    const d = DIMENSIONS[current];
    dimTitle.textContent = d.title;
    dimDesc.textContent = d.desc;
    dimCount.textContent = (current + 1) + ' / ' + DIMENSIONS.length;
    dimTags.innerHTML = '';
    d.tags.forEach((t) => {
      const s = document.createElement('span');
      s.textContent = t;
      dimTags.appendChild(s);
    });
    wheel.querySelectorAll('.w-node').forEach((n, i) => {
      n.classList.toggle('active', i === current);
      n.setAttribute('aria-pressed', String(i === current));
    });
  }

  function setDimension(i) {
    current = (i + DIMENSIONS.length) % DIMENSIONS.length;
    const card = document.querySelector('.dim-detail');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px)';
      requestAnimationFrame(() => {
        renderDetail();
        requestAnimationFrame(() => {
          card.style.transition = 'opacity .35s ease, transform .35s ease';
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
      });
    } else {
      renderDetail();
    }
  }

  if (wheel && dimTitle) {
    renderDetail();
    btnPrev.addEventListener('click', () => setDimension(current - 1));
    btnNext.addEventListener('click', () => setDimension(current + 1));

    // Auto-advance until the user interacts
    let auto = setInterval(() => setDimension((current + 1) % DIMENSIONS.length), 3800);
    let userTouched = false;
    ['pointerdown', 'keydown', 'touchstart'].forEach((evt) =>
      wheel.addEventListener(evt, () => { userTouched = true; clearInterval(auto); }, { once: true })
    );
    btnPrev.addEventListener('click', () => clearInterval(auto));
    btnNext.addEventListener('click', () => clearInterval(auto));
    if (userTouched) clearInterval(auto);
  }
  /* ---------- Programme image lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');

    const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
    const items = triggers.map((btn) => ({
      full: btn.getAttribute('data-lightbox'),
      caption: (btn.closest('.prog-card') || btn).querySelector('h3')
        ? btn.closest('.prog-card').querySelector('h3').textContent.trim()
        : ''
    }));
    let lbIndex = 0;
    let lbLastFocus = null;

    function lbRender() {
      const item = items[lbIndex];
      if (!item) return;
      lbImg.src = item.full;
      lbImg.alt = item.caption || 'Programme image';
      lbCaption.textContent = item.caption || '';
    }

    function lbOpen(i) {
      lbIndex = i;
      lbLastFocus = document.activeElement;
      lbRender();
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lb-open');
      lbClose.focus();
    }

    function lbCloseFn() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lb-open');
      if (lbLastFocus) lbLastFocus.focus();
    }

    function lbStep(dir) {
      lbIndex = (lbIndex + dir + items.length) % items.length;
      lbRender();
    }

    triggers.forEach((btn, i) => {
      btn.addEventListener('click', () => lbOpen(i));
    });
    lbClose.addEventListener('click', lbCloseFn);
    lbPrev.addEventListener('click', () => lbStep(-1));
    lbNext.addEventListener('click', () => lbStep(1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lbCloseFn();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') lbCloseFn();
      if (e.key === 'ArrowLeft') lbStep(-1);
      if (e.key === 'ArrowRight') lbStep(1);
    });
  }

  /* ---------- Ecosystem initiatives slider (spec §3) ---------- */
  const ecoSlider = document.querySelector('[data-eco-slider]');
  if (ecoSlider) {
    const panels = Array.from(ecoSlider.querySelectorAll('[data-eco-panel]'));
    const bgImgs = Array.from(ecoSlider.querySelectorAll('[data-eco-bg] img'));
    const cardsWrap = ecoSlider.querySelector('[data-eco-cards]');
    const bar = document.getElementById('ecoBar');
    const num = document.getElementById('ecoNum');
    const prevBtn = document.getElementById('ecoPrev');
    const nextBtn = document.getElementById('ecoNext');
    const AUTOPLAY_MS = 6000;
    let ecoIndex = 0;
    let ecoTimer = null;

    // Card data comes from the hero panels so markup stays the single source of truth.
    // Each slide's background photo IS its card photo, so clicking a card always
    // brings that exact image up full-screen behind the copy.
    const ecoData = panels.map((panel, i) => ({
      kickerEl: panel.querySelector('.eco-kicker'),
      titleEl: panel.querySelector('.eco-title'),
      src: bgImgs[i] ? (bgImgs[i].getAttribute('data-card-src') || bgImgs[i].getAttribute('src')) : ''
    }));
    // Build the interactive card stack (one button per initiative)
    const cards = ecoData.map((d, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'eco-imgcard';
      btn.setAttribute('aria-label', 'Show ' + (d.titleEl ? d.titleEl.textContent : 'initiative ' + (i + 1)));
      const img = document.createElement('img');
      img.src = d.src;
      img.alt = '';
      img.loading = 'lazy';
      const cap = document.createElement('figcaption');
      const tag = document.createElement('span');
      tag.className = 'eco-imgcard-tag';
      tag.textContent = 'Initiative';
      const strong = document.createElement('strong');
      strong.textContent = d.titleEl ? d.titleEl.textContent : '';
      cap.appendChild(tag);
      cap.appendChild(strong);
      btn.appendChild(img);
      btn.appendChild(cap);
      btn.addEventListener('click', () => { ecoGo(i); ecoStart(); });
      return btn;
    });

    function ecoRender() {
      panels.forEach((p, i) => {
        p.hidden = i !== ecoIndex;
        p.classList.toggle('is-on', i === ecoIndex);
      });
      bgImgs.forEach((img, i) => img.classList.toggle('is-on', i === ecoIndex));
      // The rail always leads with the ACTIVE card, so the glowing card is exactly
      // the photo shown in the background; the other two preview what comes next.
      if (cardsWrap) {
        cardsWrap.replaceChildren();
        for (let k = 0; k < 3; k++) {
          cardsWrap.appendChild(cards[(ecoIndex + k) % cards.length]);
        }
      }
      // Glow ring marks the active card
      cards.forEach((c, k) => c.classList.toggle('is-active', k === ecoIndex));
      if (num) num.textContent = String(ecoIndex + 1).padStart(2, '0');
      ecoResetBar();
    }

    function ecoResetBar() {
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
      void bar.offsetWidth; // restart the timer animation
      bar.style.transition = 'width ' + AUTOPLAY_MS + 'ms linear';
      bar.style.width = '100%';
    }

    function ecoFreezeBar() {
      if (!bar) return;
      const w = bar.getBoundingClientRect().width;
      bar.style.transition = 'none';
      bar.style.width = w + 'px';
    }

    function ecoGo(i) {
      ecoIndex = (i + panels.length) % panels.length;
      ecoRender();
    }

    function ecoStart() {
      ecoStop();
      ecoTimer = setInterval(() => ecoGo(ecoIndex + 1), AUTOPLAY_MS);
      ecoResetBar();
    }
    function ecoStop() {
      if (ecoTimer) { clearInterval(ecoTimer); ecoTimer = null; }
    }

    prevBtn.addEventListener('click', () => { ecoGo(ecoIndex - 1); ecoStart(); });
    nextBtn.addEventListener('click', () => { ecoGo(ecoIndex + 1); ecoStart(); });
    ecoSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { ecoGo(ecoIndex - 1); ecoStart(); }
      if (e.key === 'ArrowRight') { ecoGo(ecoIndex + 1); ecoStart(); }
    });

    // Autoplay pauses on hover (timer bar freezes); leaving restarts the cycle in sync
    ecoSlider.addEventListener('mouseenter', () => { ecoStop(); ecoFreezeBar(); });
    ecoSlider.addEventListener('mouseleave', () => { ecoStart(); });

    ecoRender();
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) ecoStart(); else if (bar) { bar.style.transition = 'none'; bar.style.width = '100%'; }
  }

  /* ---------- Quote band photo (data-photo attribute; JS enhancement) ---------- */
  document.querySelectorAll('.quote-band[data-photo]').forEach((qb) => {
    const url = qb.getAttribute('data-photo');
    if (url) {
      qb.style.setProperty('--qb-photo', 'url("' + url + '")');
      qb.classList.add('has-photo');
    }
  });

  /* ---------- Circle of Stewards — centered card slider (drag + arrows + auto) ---------- */
  const stewSlider = document.querySelector('[data-stew-slider]');
  if (stewSlider) {
    const track = stewSlider.querySelector('.stew-track');
    const slides = Array.from(stewSlider.querySelectorAll('.stew-slide'));
    const prevBtn = stewSlider.querySelector('[data-stew-prev]');
    const nextBtn = stewSlider.querySelector('[data-stew-next]');
    const AUTOPLAY_MS = 5200;
    let stewIndex = 0;
    let stewTimer = null;

    function stewPaint(offsetPx) {
      track.style.transform = 'translateX(calc(' + (-stewIndex * 100) + '% + ' + (offsetPx || 0) + 'px))';
    }

    function stewGo(i, instant) {
      stewIndex = (i + slides.length) % slides.length;
      if (instant) {
        track.style.transition = 'none';
        stewPaint(0);
        void track.offsetWidth; // flush so the next change animates again
        track.style.transition = '';
      } else {
        stewPaint(0);
      }
      slides.forEach((s, n) => s.classList.toggle('is-on', n === stewIndex));
    }

    function stewStart() {
      stewStop();
      stewTimer = setInterval(() => stewGo(stewIndex + 1), AUTOPLAY_MS);
    }
    function stewStop() {
      if (stewTimer) { clearInterval(stewTimer); stewTimer = null; }
    }

    prevBtn.addEventListener('click', () => { stewGo(stewIndex - 1); stewStart(); });
    nextBtn.addEventListener('click', () => { stewGo(stewIndex + 1); stewStart(); });

    // Pause auto-advance while the pointer is over the slider (matches the ecosystem slider)
    stewSlider.addEventListener('mouseenter', stewStop);
    stewSlider.addEventListener('mouseleave', stewStart);

    // ---- drag / swipe to flip slides (mouse, pen and touch) ----
    let dragId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragDX = 0;
    let axis = null; // 'x' once a horizontal drag is locked in

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragId = e.pointerId;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragDX = 0;
      axis = null;
      track.classList.add('is-dragging');
      track.style.transition = 'none';
      stewStop();
      try { track.setPointerCapture(dragId); } catch (err) { /* noop */ }
    });

    track.addEventListener('pointermove', (e) => {
      if (e.pointerId !== dragId) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
      }
      if (axis !== 'x') return; // let vertical gestures scroll the page
      dragDX = dx;
      stewPaint(dx);
    });

    function endDrag(e) {
      if (e.pointerId !== dragId) return;
      dragId = null;
      axis = null;
      track.classList.remove('is-dragging');
      track.style.transition = '';
      const threshold = Math.min(140, track.clientWidth * 0.18);
      if (dragDX <= -threshold) stewGo(stewIndex + 1);
      else if (dragDX >= threshold) stewGo(stewIndex - 1);
      else stewGo(stewIndex); // snap back
      dragDX = 0;
      stewStart();
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    stewGo(0, true);
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) stewStart();
  }

  /* ---------- Purpose Slider (Framework page left-side text slider) ---------- */
  const purposeSlider = document.querySelector('[data-purpose-slider]');
  if (purposeSlider) {
    const track = purposeSlider.querySelector('[data-purpose-track]');
    const slides = Array.from(purposeSlider.querySelectorAll('.purpose-slide'));
    const prevBtn = purposeSlider.querySelector('[data-purpose-prev]');
    const nextBtn = purposeSlider.querySelector('[data-purpose-next]');
    const dotsWrap = purposeSlider.querySelector('[data-purpose-dots]');
    const counter = purposeSlider.querySelector('[data-purpose-counter]');
    const AUTOPLAY_MS = 6000;
    let currentIndex = 0;
    let autoTimer = null;

    if (dotsWrap && slides.length > 1) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'purpose-dot' + (idx === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goTo(idx);
          startAuto();
        });
        dotsWrap.appendChild(dot);
      });
    }

    function updateCounter() {
      if (counter) {
        const cur = String(currentIndex + 1).padStart(2, '0');
        const tot = String(slides.length).padStart(2, '0');
        counter.textContent = `${cur} / ${tot}`;
      }
    }

    function goTo(index) {
      currentIndex = (index + slides.length) % slides.length;
      if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
      slides.forEach((slide, idx) => {
        const active = idx === currentIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('.purpose-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('is-active', idx === currentIndex);
        });
      }
      updateCounter();
    }

    function startAuto() {
      stopAuto();
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;
      autoTimer = setInterval(() => goTo(currentIndex + 1), AUTOPLAY_MS);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goTo(currentIndex - 1);
        startAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goTo(currentIndex + 1);
        startAuto();
      });
    }

    purposeSlider.addEventListener('mouseenter', stopAuto);
    purposeSlider.addEventListener('mouseleave', startAuto);

    // Keyboard navigation
    purposeSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goTo(currentIndex - 1);
        startAuto();
      } else if (e.key === 'ArrowRight') {
        goTo(currentIndex + 1);
        startAuto();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    purposeSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      stopAuto();
    }, { passive: true });

    purposeSlider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      }
      startAuto();
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* ---------- Contact form (client-side demo handler) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const successBox = document.getElementById('formSuccess');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (successBox) {
        contactForm.hidden = true;
        successBox.hidden = false;
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    const formReset = document.getElementById('formReset');
    if (formReset) formReset.addEventListener('click', () => {
      contactForm.reset();
      contactForm.hidden = false;
      if (successBox) successBox.hidden = true;
    });
  }
})();
