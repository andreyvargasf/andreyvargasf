/* ============================================================
   ECO Soluções — Premium Interactions
   ============================================================ */

'use strict';

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initAOS();
  initFAQ();
  initBeforeAfterTabs();
  initContactForm();
  initSmoothScroll();
  initActiveNavLinks();
});

// ── HEADER SCROLL ──
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── AOS (Animate On Scroll) ──
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

// ── FAQ ACCORDION ──
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ── BEFORE & AFTER TABS ──
function initBeforeAfterTabs() {
  const tabs = document.querySelectorAll('.ba-tab');
  const items = document.querySelectorAll('.ba-item');
  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => t.classList.remove('ba-tab--active'));
      tab.classList.add('ba-tab--active');

      // Update items
      items.forEach(item => {
        const content = item.dataset.tabContent;
        if (content === target) {
          item.classList.remove('ba-item--hidden');
          // Trigger animation
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          });
        } else {
          item.classList.add('ba-item--hidden');
          item.style.opacity = '';
          item.style.transform = '';
          item.style.transition = '';
        }
      });
    });
  });
}

// ── CONTACT FORM → WHATSAPP ──
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name')?.value.trim() || '';
    const phone   = form.querySelector('#phone')?.value.trim() || '';
    const service = form.querySelector('#service')?.value || '';
    const message = form.querySelector('#message')?.value.trim() || '';

    const serviceLabels = {
      'higienizacao-estofados': 'Higienização de Estofados',
      'higienizacao-colchoes':  'Higienização de Colchões',
      'higienizacao-automotiva':'Higienização Automotiva',
      'impermeabilizacao':      'Impermeabilização',
      'adesivagem':             'Adesivagem Decorativa',
      'papel-parede':           'Papéis de Parede',
    };

    let text = 'Olá! Gostaria de solicitar um orçamento.\n\n';
    if (name)    text += `*Nome:* ${name}\n`;
    if (phone)   text += `*Telefone:* ${phone}\n`;
    if (service) text += `*Serviço:* ${serviceLabels[service] || service}\n`;
    if (message) text += `\n*Mensagem:* ${message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5551999999999?text=${encoded}`, '_blank');
  });
}

// ── SMOOTH SCROLL ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── ACTIVE NAV LINKS ──
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -60% 0px'
    }
  );

  sections.forEach(section => observer.observe(section));
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const isNum = /^\d+$/.test(target);
  const num = parseInt(target);

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * num);

    el.textContent = isNum ? current + '+' : target;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + (isNum ? '+' : '');
  };

  requestAnimationFrame(update);
}

// Trigger counters when hero stats are visible
const statNums = document.querySelectorAll('.hero__stat-num');
if (statNums.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.replace('+', '');
          if (/^\d+$/.test(text)) {
            el.textContent = '0';
            animateCounter(el, text);
          }
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach(el => counterObserver.observe(el));
}

// ── ACTIVE NAV STYLE ──
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--green-deep); background: rgba(31,77,58,.06); }`;
document.head.appendChild(style);
