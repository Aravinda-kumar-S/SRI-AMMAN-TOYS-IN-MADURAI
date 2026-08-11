/* =========================================================
   SRI AMMAN TOYS — main.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 350);
  });
  // fallback in case 'load' is slow / already fired
  setTimeout(() => preloader && preloader.classList.add('hide'), 2500);

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const topBtn = document.getElementById('fabTop');
    if (topBtn) topBtn.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const spy = () => {
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', spy);

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');
  const openMenu = () => { mobileMenu.classList.add('open'); menuOverlay.classList.add('open'); };
  const closeMenu = () => { mobileMenu.classList.remove('open'); menuOverlay.classList.remove('open'); };
  hamburger && hamburger.addEventListener('click', openMenu);
  menuClose && menuClose.addEventListener('click', closeMenu);
  menuOverlay && menuOverlay.addEventListener('click', closeMenu);
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- Dark mode toggle ---------- */
  const darkToggles = document.querySelectorAll('.dark-toggle');
  darkToggles.forEach(btn => btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  }));

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter strong[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          current += step;
          if (current >= target) { el.textContent = target + suffix; return; }
          el.textContent = current + suffix;
          requestAnimationFrame(tick);
        };
        tick();
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterIO.observe(c));

  /* ---------- Gallery filter ---------- */
  const gfilters = document.querySelectorAll('.gfilter');
  const gitems = document.querySelectorAll('.g-item');
  gfilters.forEach(btn => btn.addEventListener('click', () => {
    gfilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    gitems.forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.style.display = show ? '' : 'none';
    });
  }));

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  let lbIndex = 0;
  const visibleItems = () => Array.from(gitems).filter(i => i.style.display !== 'none');

  const openLightbox = (idx) => {
    const items = visibleItems();
    lbIndex = idx;
    lightboxImg.src = items[lbIndex].querySelector('img').src;
    lightboxImg.alt = items[lbIndex].querySelector('img').alt;
    lightbox.classList.add('open');
  };
  gitems.forEach((item, idx) => item.addEventListener('click', () => {
    const items = visibleItems();
    const realIdx = items.indexOf(item);
    openLightbox(realIdx);
  }));
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.getElementById('lbPrev').addEventListener('click', () => {
    const items = visibleItems();
    lbIndex = (lbIndex - 1 + items.length) % items.length;
    lightboxImg.src = items[lbIndex].querySelector('img').src;
  });
  document.getElementById('lbNext').addEventListener('click', () => {
    const items = visibleItems();
    lbIndex = (lbIndex + 1) % items.length;
    lightboxImg.src = items[lbIndex].querySelector('img').src;
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Testimonials slider (Swiper) ---------- */
  if (window.Swiper) {
    new Swiper('.testi-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 }
      }
    });
  }

  /* ---------- GSAP hero + scroll reveals (progressive enhancement) ---------- */
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy > *', { opacity: 0, y: 30, duration: 0.9, stagger: 0.12, delay: 0.3, ease: 'power3.out' });
    gsap.from('.hero-visual', { opacity: 0, scale: 0.85, duration: 1, delay: 0.4, ease: 'power3.out' });
  }

  /* ---------- Toast helper ---------- */
  window.showToast = (msg) => {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  };

  /* ---------- Contact form -> WhatsApp ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const location = form.location.value.trim();
      const product = form.product.value;
      const message = form.message.value.trim();

      if (!name || !phone || !message) {
        showToast('Please fill in your name, phone and message.');
        return;
      }

      const text =
`Name: ${name}
Phone: ${phone}
Location: ${location || '-'}
Interested Product: ${product || '-'}
Message: ${message}`;

      const waLink = `https://wa.me/919245717267?text=${encodeURIComponent(text)}`;
      window.open(waLink, '_blank');
      showToast('Opening WhatsApp with your enquiry…');
      form.reset();
    });
  }

  /* Category / gallery "Enquire on WhatsApp" quick buttons */
  document.querySelectorAll('[data-wa-enquiry]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.dataset.waEnquiry;
      const text = `Hi Sri Amman Toys, I'm interested in "${product}". Could you share more details and pricing?`;
      window.open(`https://wa.me/919245717267?text=${encodeURIComponent(text)}`, '_blank');
    });
  });

  /* ---------- Back to top ---------- */
  const fabTop = document.getElementById('fabTop');
  fabTop && fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Cookie consent ---------- */
  const cookieBar = document.getElementById('cookieBar');
  if (cookieBar && !localStorage.getItem('sat_cookie_ack')) {
    setTimeout(() => cookieBar.classList.add('show'), 1200);
  }
  const cookieAccept = document.getElementById('cookieAccept');
  cookieAccept && cookieAccept.addEventListener('click', () => {
    localStorage.setItem('sat_cookie_ack', '1');
    cookieBar.classList.remove('show');
  });

});
