/* =========================================================
   SRI AMMAN TOYS — Main JavaScript Application Logic
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ============ UTILS ============ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  window.escapeHTML = function(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  window.imgFallback = function(el, label) {
    el.onerror = null;
    const colors = [['ff6b1a', 'ff4081'], ['ffd600', 'ff6b1a'], ['7c3aed', 'ff4081'], ['00c2ff', '7c3aed']];
    const [c1, c2] = colors[Math.floor(Math.random() * colors.length)];
    const cleanLabel = window.escapeHTML(label);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='400'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#${c1}'/><stop offset='1' stop-color='#${c2}'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' font-family='sans-serif' font-size='28' fill='rgba(255,255,255,0.9)' text-anchor='middle' dominant-baseline='middle'>${cleanLabel}</text>
    </svg>`;
    el.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  };

  window.showToast = function(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    const toastMsg = document.getElementById('toastMsg');
    if (toastMsg) toastMsg.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  };

  window.waEnquiry = function(product) {
    const cleanProduct = String(product || '').trim();
    const msg = encodeURIComponent(`Hi! I'm interested in *${cleanProduct}* from Sri Amman Toys (Munichalai Road, Madurai). Please share details and pricing.`);
    window.open(`https://wa.me/919245717267?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  /* ============ PRELOADER ============ */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden', 'hide'), 300);
    });
    setTimeout(() => preloader.classList.add('hidden', 'hide'), 2000);
  }

  /* ============ NAVBAR & BACK TO TOP ============ */
  const navbar = document.getElementById('navbar');
  const fabTop = document.getElementById('fabTop');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (fabTop) fabTop.classList.toggle('show', window.scrollY > 400);
  });

  if (fabTop) {
    fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ============ MOBILE MENU ============ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add('open');
    if (menuOverlay) menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (menuOverlay) menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ============ DARK MODE ============ */
  const darkToggles = document.querySelectorAll('.dark-toggle');
  darkToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('sat_dark', document.body.classList.contains('dark') ? '1' : '0');
    });
  });

  /* ============ SCROLL REVEAL ============ */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed', 'in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

  /* ============ ANIMATED COUNTERS ============ */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 16);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  /* ============ SWIPER TESTIMONIALS ============ */
  if (window.Swiper && document.querySelector('.testi-swiper')) {
    new Swiper('.testi-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }

  /* ============ FAQ ACCORDION ============ */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ============ CONTACT FORM → WHATSAPP ============ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fname')?.value.trim() || contactForm.name?.value.trim() || '';
      const phone = document.getElementById('fphone')?.value.trim() || contactForm.phone?.value.trim() || '';
      const location = document.getElementById('flocation')?.value.trim() || contactForm.location?.value.trim() || '';
      const product = document.getElementById('fproduct')?.value || contactForm.product?.value || '';
      const message = document.getElementById('fmessage')?.value.trim() || contactForm.message?.value.trim() || '';
      const method = document.querySelector('input[name="contactMethod"]:checked')?.value || 'WhatsApp';

      if (!name || !phone || !message) {
        showToast('Please fill in your name, phone, and message.');
        return;
      }

      const text = `Hello Sri Amman Toys! 👋\n\n*Name:* ${name}\n*Phone:* ${phone}${location ? `\n*Location:* ${location}` : ''}${product ? `\n*Interested in:* ${product}` : ''}\n*Message:* ${message}`;
      window.open(`https://wa.me/919245717267?text=${encodeURIComponent(text)}`, '_blank');
      showToast('Opening WhatsApp...');
      contactForm.reset();
    });
  }

  /* ============ GALLERY & LIGHTBOX ============ */
  let CATS = [
    { key: 'toys', label: 'Toys & Educational Games', emoji: '🧸' },
    { key: 'ballon', label: 'Balloons & Decor', emoji: '🎈' },
    { key: 'chocolate', label: 'Chocolates', emoji: '🍫' },
    { key: 'chocolate2', label: 'Wafers & Party Treats', emoji: '🍬' },
    { key: 'prices', label: 'Price Stickers & Tags', emoji: '🏷️' },
    { key: 'stickers-cards', label: 'Greeting Cards & Stickers', emoji: '🎴' },
  ];

  let storedProds = localStorage.getItem('sat_products');
  let allGalleryItems = storedProds ? JSON.parse(storedProds) : (typeof galleryData !== 'undefined' ? galleryData : []);

  if (allGalleryItems.length === 0) {
    CATS.forEach(cat => {
      for (let i = 1; i <= 6; i++) {
        allGalleryItems.push({ src: `images/${cat.key}/${i}.jpg`, cat: cat.key, category: cat.key, path: `images/${cat.key}/${i}.jpg`, label: `${cat.emoji} ${cat.label}` });
      }
    });
  }

  const masonryGrid = document.getElementById('masonryGrid');
  let visibleItems = [...allGalleryItems];

  function buildGallery(filter) {
    if (!masonryGrid) return;
    visibleItems = filter === 'all' ? [...allGalleryItems] : allGalleryItems.filter(it => (it.cat || it.category) === filter);
    masonryGrid.innerHTML = '';

    visibleItems.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'g-item';
      const imgSrc = item.src || item.path;
      const catKey = item.cat || item.category || 'general';
      const rawTitle = item.label || (imgSrc ? imgSrc.split('/').pop().replace(/\.[^/.]+$/, "") : 'Product');
      const safeTitle = window.escapeHTML(rawTitle);
      const safeSrc = window.escapeHTML(imgSrc);
      const safeCat = window.escapeHTML(catKey);

      div.innerHTML = `
        <div class="g-item-img-container" onclick="openLightbox(${idx})">
          <img src="${safeSrc}" alt="${safeTitle}" loading="lazy" onerror="imgFallback(this,'${safeTitle}')">
        </div>
        <div class="g-item-info">
          <div class="g-item-title">${safeTitle}</div>
          <div class="g-item-actions">
            <button class="download-btn-sm" onclick="event.stopPropagation();openLightbox(${idx})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg> View
            </button>
            <button class="download-btn-sm" onclick="event.stopPropagation();downloadImage('${safeSrc}','sat-${safeCat}-${idx + 1}.jpg')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Save
            </button>
            <button class="download-btn-sm" style="background:#25d366;color:#fff;border:none;margin-left:auto;" onclick="event.stopPropagation();waEnquiry('${safeTitle.replace(/'/g, "\\'")}')">
              Enquire
            </button>
          </div>
        </div>
      `;
      masonryGrid.appendChild(div);
    });
  }

  const filters = document.querySelectorAll('.gfilter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildGallery(btn.dataset.filter);
    });
  });

  if (masonryGrid) buildGallery('all');

  /* ============ LIGHTBOX CONTROLS ============ */
  let lbIdx = 0;
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg') || document.getElementById('lightboxImg');

  window.openLightbox = function(idx) {
    if (!lightbox || !lbImg) return;
    lbIdx = idx;
    const item = visibleItems[idx];
    if (!item) return;
    lbImg.src = item.src || item.path;
    lbImg.alt = item.label || 'Product image';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.downloadImage = function(src, filename) {
    const a = document.createElement('a');
    a.href = src;
    a.download = filename || 'sriammantoys-image.jpg';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Downloading image...');
  };

  const lbClose = document.getElementById('lbClose') || document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbDownload = document.getElementById('lbDownload');

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      if (visibleItems.length === 0) return;
      lbIdx = (lbIdx - 1 + visibleItems.length) % visibleItems.length;
      openLightbox(lbIdx);
    });
  }
  if (lbNext) {
    lbNext.addEventListener('click', () => {
      if (visibleItems.length === 0) return;
      lbIdx = (lbIdx + 1) % visibleItems.length;
      openLightbox(lbIdx);
    });
  }
  if (lbDownload) {
    lbDownload.addEventListener('click', () => {
      const item = visibleItems[lbIdx];
      if (item) downloadImage(item.src || item.path, `sriammantoys-${lbIdx + 1}.jpg`);
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  }

  window.viewCategoryInGallery = function(catKey) {
    window.location.href = `category.html?cat=${encodeURIComponent(catKey)}`;
  };
  window.openCatModal = window.viewCategoryInGallery;

  /* ============ DYNAMIC HOMEPAGE CATEGORIES ============ */
  const mainCatGrid = document.getElementById('mainCatGrid');

  function renderHomePageCategories() {
    if (!mainCatGrid) return;

    let defaultCats = [
      { id: 'toys', title: 'Toys & Educational Games', icon: '🧸', desc: 'Remote control toys, soft toys, baby toys, board games & learning aids for every age.', defaultImg: 'images/toys/kidsz toys.jpg' },
      { id: 'ballon', title: 'Balloons & Birthday Decor', icon: '🎈', desc: 'Balloon bunches, decoration sets and party backdrops to light up any celebration.', defaultImg: 'images/ballon/₹5 JUMPOO BALLOON.jpg' },
      { id: 'chocolate', title: 'Chocolates', icon: '🍫', desc: 'Popular chocolate brands and gift boxes, perfect for return gifts and celebrations.', defaultImg: 'images/Chocolate/₹5 Aura Chocolate Box.jpg' },
      { id: 'chocolate2', title: 'Wafers & Party Treats', icon: '🍬', desc: 'Assorted wafers, candies and snack treats for goodie bags and party trays.', defaultImg: 'images/chocolate2/jelly sweets.jpg' },
      { id: 'prices', title: 'Price Stickers & Tags', icon: '🏷️', desc: 'Bulk price stickers and tags for shops, boutiques and wholesale packaging.', defaultImg: 'images/prices/IMG-20260708-WA0198.jpg' },
      { id: 'stickers-cards', title: 'Greeting Cards & Stickers', icon: '🎴', desc: 'Greeting cards, gift cards and decorative stickers for every festival and occasion.', defaultImg: 'images/stickersz and cards/5 pieces cutout stickerz gods.jpg' }
    ];

    let categoriesMap = new Map();
    defaultCats.forEach(c => categoriesMap.set(c.id, c));

    // Read stored categories from local storage
    try {
      const stored = localStorage.getItem('sat_categories');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.forEach(c => {
          const k = (c.id || '').toLowerCase();
          if (k) {
            const existing = categoriesMap.get(k) || {};
            categoriesMap.set(k, {
              id: k,
              title: c.title || existing.title || k,
              icon: c.icon || existing.icon || '📦',
              desc: c.desc || existing.desc || `Explore our high quality ${c.title || k} collection.`,
              defaultImg: existing.defaultImg || 'images/about_promo.png'
            });
          }
        });
      }
    } catch(e) {}

    // Fetch products to compute counts and thumbnail images
    let allProds = [];
    try {
      const storedP = localStorage.getItem('sat_products');
      if (storedP) allProds = JSON.parse(storedP);
    } catch(e) {}
    if (!allProds || allProds.length === 0) {
      allProds = typeof galleryData !== 'undefined' ? galleryData : [];
    }

    function buildGrid(cats, prods) {
      mainCatGrid.innerHTML = '';
      cats.forEach(cat => {
        const catProds = prods.filter(p => {
          const c = (p.cat || p.category || '').toLowerCase();
          return c === cat.id || c.includes(cat.id) || cat.id.includes(c);
        });

        const thumbImg = catProds[0]?.src || catProds[0]?.path || cat.defaultImg || 'images/about_promo.png';
        const count = catProds.length;
        const safeTitle = window.escapeHTML(cat.title);
        const safeIcon = window.escapeHTML(cat.icon || '📦');
        const safeDesc = window.escapeHTML(cat.desc);
        const safeImg = window.escapeHTML(thumbImg);

        const card = document.createElement('article');
        card.className = 'cat-card revealed in';
        card.onclick = () => window.location.href = `category.html?cat=${encodeURIComponent(cat.id)}`;

        card.innerHTML = `
          <div class="cat-media">
            <span class="cat-tag">${safeIcon} ${count} Items</span>
            <img src="${safeImg}" alt="${safeTitle}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='images/about_promo.png'">
          </div>
          <div class="cat-body">
            <h3>${safeIcon} ${safeTitle}</h3>
            <p>${safeDesc}</p>
            <div class="cat-actions" onclick="event.stopPropagation()">
              <button class="btn btn-outline btn-sm" onclick="window.location.href='category.html?cat=${encodeURIComponent(cat.id)}'">View Photos</button>
              <button class="btn btn-whatsapp btn-sm" onclick="waEnquiry('${safeTitle.replace(/'/g, "\\'")}')">Enquire</button>
            </div>
          </div>
        `;
        mainCatGrid.appendChild(card);
      });
    }

    // Initial synchronous render
    buildGrid(Array.from(categoriesMap.values()), allProds);

    // Asynchronous remote sync with InsForge DB
    if (window.insforgeDB) {
      (async function syncRemote() {
        try {
          let updated = false;
          const remoteCats = await window.insforgeDB.getRecords('categories');
          if (remoteCats && remoteCats.length > 0) {
            remoteCats.forEach(c => {
              const k = (c.id || '').toLowerCase();
              if (k) {
                const existing = categoriesMap.get(k) || {};
                categoriesMap.set(k, {
                  id: k,
                  title: c.title || existing.title || k,
                  icon: c.icon || existing.icon || '📦',
                  desc: existing.desc || `Explore our high quality ${c.title || k} collection.`,
                  defaultImg: existing.defaultImg || 'images/about_promo.png'
                });
              }
            });
            updated = true;
          }

          const remoteP = await window.insforgeDB.getRecords('products');
          if (remoteP && remoteP.length > 0) {
            const existingKeys = new Set(allProds.map(p => (p.label || '') + (p.src || '')));
            remoteP.forEach(p => {
              const k = (p.label || '') + (p.src || '');
              if (!existingKeys.has(k)) {
                allProds.push({ src: p.src, cat: p.cat, label: p.label, price: p.price });
                existingKeys.add(k);
              }
            });
            updated = true;
          }

          if (updated) {
            buildGrid(Array.from(categoriesMap.values()), allProds);
          }
        } catch(e) {
          console.log('Homepage remote sync note:', e.message);
        }
      })();
    }
  }

  if (mainCatGrid) {
    renderHomePageCategories();
  }

});
