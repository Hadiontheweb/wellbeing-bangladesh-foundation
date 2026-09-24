/* ============================================================
   Wellbeing Bangladesh Foundation — Homepage Scripts
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
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
})();
