/* =========================================================
   Durgadda Gurusomasekhar — Portfolio script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. PARTICLE BACKGROUND ---------- */
  (function particles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function getAccent() {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      return v || '#00c8ff';
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function makeParticles() {
      const count = Math.min(90, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      const accent = getAccent();
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.globalAlpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }

    resize();
    makeParticles();
    requestAnimationFrame(step);
    window.addEventListener('resize', () => { resize(); makeParticles(); });
  })();

  /* ---------- 2. NAVBAR: mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ---------- 3. THEME TOGGLE ---------- */
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.textContent = '☀️';
      }
    });
  }

  /* ---------- 4. TYPING EFFECT ---------- */
  (function typing() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const roles = [
      'Python Developer',
      'Generative AI Engineer',
      'Agentic AI Developer',
      'Machine Learning Enthusiast',
      'Full Stack Developer'
    ];
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
        setTimeout(tick, 70);
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 35);
      }
    }
    tick();
  })();

  /* ---------- 5. SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- 6. STAT COUNTERS ---------- */
  const statEls = document.querySelectorAll('.stat-num');
  if (statEls.length) {
    const animateCount = (el) => {
      const target = el.getAttribute('data-target');
      if (!target) return; // e.g. the CGPA card has no data-target, leave its value as-is
      const suffix = el.getAttribute('data-suffix') ?? '+';
      const end = parseFloat(target);
      const duration = 1200;
      const start = performance.now();
      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * end);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = end + suffix;
      }
      requestAnimationFrame(frame);
    };

    if ('IntersectionObserver' in window) {
      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statEls.forEach(el => statObserver.observe(el));
    } else {
      statEls.forEach(animateCount);
    }
  }

  /* ---------- 7. PROJECT FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 8. BACK TO TOP VISIBILITY ---------- */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    });
  }

  /* ---------- 9. NAVBAR ACTIVE LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.classList.toggle('active-link', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
    sections.forEach(sec => navObserver.observe(sec));
  }

});

/* ---------- 10. CONTACT FORM ---------- */
/* Sends the message via WhatsApp click-to-chat: opens WhatsApp (app on
   mobile, web.whatsapp.com on desktop) with the visitor's message
   pre-filled, ready to send to Guru's number. No backend needed. */
const WHATSAPP_NUMBER = '918374444525'; // country code + number, no + or spaces

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameEl = document.getElementById('form-name');
  const emailEl = document.getElementById('form-email');
  const subjectEl = document.getElementById('form-subject');
  const messageEl = document.getElementById('form-message');
  const msgEl = document.getElementById('form-msg');
  const sendBtn = document.getElementById('send-btn');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showMsg(text, isError) {
    msgEl.textContent = text;
    msgEl.style.display = 'block';
    msgEl.style.color = isError ? '#ff5d6c' : 'var(--accent3)';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const subject = subjectEl.value.trim() || 'Portfolio Contact';
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
      showMsg('Please fill in your name, email, and message before sending.', true);
      return;
    }
    if (!emailPattern.test(email)) {
      showMsg('Please enter a valid email address.', true);
      return;
    }

    const text =
      'Hi Guru, this is ' + name + ' (' + email + ').\n' +
      'Subject: ' + subject + '\n\n' +
      message;

    const waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

    const originalLabel = sendBtn.innerHTML;
    sendBtn.innerHTML = '✅ Opening WhatsApp...';
    sendBtn.disabled = true;

    window.open(waLink, '_blank');

    showMsg('WhatsApp is opening with your message ready — just hit send there!', false);

    setTimeout(() => {
      sendBtn.innerHTML = originalLabel;
      sendBtn.disabled = false;
    }, 2000);
  });
});
