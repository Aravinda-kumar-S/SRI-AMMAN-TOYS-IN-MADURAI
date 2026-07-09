# Sri Amman Toys — Website

A premium, animated, mobile-first website for **Sri Amman Toys**, Munichalai Road, Madurai.

## 📁 File structure

```
sriammantoys/
├── index.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── logo.png              ← put your store logo here
    ├── og-cover.jpg          ← image used for social media link previews
    ├── toys/              1.jpg, 2.jpg, 3.jpg ...
    ├── ballon/            1.jpg, 2.jpg, 3.jpg ...
    ├── chocolate/         1.jpg, 2.jpg, 3.jpg ...
    ├── chocolate2/        1.jpg, 2.jpg, 3.jpg ...
    ├── prices/            1.jpg, 2.jpg, 3.jpg ...
    └── stickers-cards/    1.jpg, 2.jpg, 3.jpg ...   (from your "stickersz and cards" folder)
```

## 🖼️ Adding your real photos

1. Drop your photos into the matching folder under `images/`, named `1.jpg`, `2.jpg`, `3.jpg`, etc.
   (Any of jpg/png/webp works — just keep the file extension consistent with what's referenced in `index.html`, or update the `src=` paths.)
2. That's it — the **Product Categories** cards and the **Gallery** masonry grid already point at these folders. No other code changes are required.
3. Until real images are added, broken image paths automatically show a colourful placeholder tile (via the `imgFallback()` helper in `main.js`), so the site never looks broken while you're filling it in.
4. To add **more images per category** in the gallery, copy an existing `<div class="g-item" data-cat="...">` block in `index.html` (inside `#masonryGrid`) and point it at your next numbered file.

Your original folder names → the site's folder names:

| Your folder            | Website folder      |
|-------------------------|----------------------|
| ballon                  | `images/ballon/`     |
| Chocolate                | `images/chocolate/`  |
| chocolate2               | `images/chocolate2/` |
| prices                   | `images/prices/`     |
| stickersz and cards      | `images/stickers-cards/` (renamed — no spaces, so links never break) |
| toys                      | `images/toys/`       |

## 🎨 What's included

- Sticky navbar — transparent on the hero, solid + blurred on scroll, mobile hamburger menu
- Animated hero with a rotating 3D gift box, floating balloons/toys, gradient background (orange → pink → yellow)
- Marquee category strip, About section, 6 product-category cards with WhatsApp "Enquire" buttons
- Filterable masonry gallery with a lightbox (arrow-key + click navigation)
- "Why Choose Us" grid with animated counters
- Services grid, Google-review–style testimonials slider (Swiper.js)
- FAQ accordion
- Contact section with Google Maps embed + a form that **sends the enquiry straight to WhatsApp** pre-filled with the customer's details
- Floating action dock (Call / WhatsApp / Maps / Instagram / Back-to-top)
- Dark mode toggle, cookie consent bar, toast notifications, skeleton-style image loading, scroll-reveal animations (GSAP + IntersectionObserver)
- SEO: meta description/keywords, Open Graph + Twitter cards, JSON-LD `ToyStore` local-business schema, canonical URL, `robots.txt`, `sitemap.xml`, semantic headings, alt text on every image
- Fully responsive from 320px up to ultra-wide desktops; keyboard-focus outlines and `prefers-reduced-motion` support

## 🚀 Deploying

This is a plain static site — no build step needed. You can:
- Drag-and-drop the whole `sriammantoys` folder into **Netlify Drop** (netlify.com/drop)
- Push it to a **GitHub** repo and enable **GitHub Pages**
- Upload it via FTP to any standard web host
- Or open `index.html` directly in a browser to preview locally

## ✏️ Editing text/numbers

- Phone/WhatsApp number: search for `919245717267` in `index.html` and replace everywhere it appears.
- Business hours, address, Instagram/JustDial/IndiaMart links: found in the **Contact** and **Footer** sections of `index.html`, and in the JSON-LD schema at the top of `<head>`.
- Stats/counters (`14+ years`, `1000+ customers`, etc.): edit the `data-count` attributes in the "Why Choose Us" section.

## 🔗 Real domain

Replace `https://www.sriammantoys.in/` throughout (`<link rel="canonical">`, Open Graph tags, JSON-LD, `sitemap.xml`) once you have your live domain.
