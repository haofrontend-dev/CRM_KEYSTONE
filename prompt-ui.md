Design a modern, premium Vietnamese business website UI.
Static frontend only — no backend needed yet.

## Style Direction
- Style: Corporate Premium 2025
- Vibe: Trustworthy + Modern + Sophisticated
- Reference: Similar to Keystone.vn but MORE modern
- NOT generic bootstrap. NOT cookie-cutter template.

## Design Tokens

Colors:
--navy-950: #050d1a
--navy-900: #0a1f3c
--navy-800: #0f2d54
--navy-700: #1a3a5c
--gold-500: #d4a843
--gold-400: #e8c06a
--gold-300: #f0d080
--neutral-50: #f8f9fa
--neutral-100: #f1f3f5
--neutral-900: #1a1a2e
--white: #ffffff

Typography:
- Font: "Plus Jakarta Sans" (Google Fonts)
- H1: 72px / 700 weight / tight tracking
- H2: 48px / 700 weight
- H3: 24px / 600 weight  
- Body: 16px / 400 weight / 1.75 line-height
- Label/Tag: 12px / 600 / uppercase / tracking-widest

Spacing: 8px base grid
Border radius: 12px cards, 8px buttons, 2px inputs
Shadow: 0 20px 60px rgba(10,31,60,0.12)

## Sections to Design

---
### 1. NAVBAR
Layout:
- Top bar (40px height): hotline | email | "Mon-Sun 8:30-18:30"
  background: navy-950, text: gold-400, font-size: 13px
- Main nav (72px height): sticky, white bg, blur backdrop
  - Left: Logo (text or SVG placeholder)
  - Center: Menu links with animated underline on hover
    [Giới thiệu] [Dịch vụ] [Đào tạo] [Tin tức] [Liên hệ]
  - Right: CTA Button "Tư vấn ngay" — gold bg, navy text, 
    pill shape, hover: scale 1.05

Mobile: hamburger → full screen overlay menu, staggered links

---
### 2. HERO SECTION
Height: 100vh
Background: gradient navy-950 → navy-800, 
  + abstract mesh/grain texture overlay (subtle)
  + floating blurred gold orbs (decoration)

Layout 2-col (60/40 split):
LEFT:
- Tag pill: "✦ Đối tác đào tạo AI hàng đầu" 
  (gold border, gold text, small, rounded-full)
- H1: "Nâng Tầm Doanh Nghiệp\nVới Sức Mạnh AI"
  white, bold, tight line-height
  "AI" word: gold color
- Subtext: 18px, neutral-300, max-width 480px
- 2 CTAs: 
  Primary: "Xem dịch vụ" — gold bg, navy text, arrow icon
  Secondary: "Liên hệ tư vấn" — white border, white text, ghost
- Trust row below CTAs:
  "500+ Doanh nghiệp" | "98% Hài lòng" | "10+ Năm KN"
  separated by gold dot dividers

RIGHT:
- Glassmorphism card floating (backdrop-blur, white/10 bg, 
  gold border 1px, rounded-2xl, padding 32px)
  Inside: mock dashboard or abstract illustration
- Small floating badges around card:
  "AI Training ✓" | "ROI +40%" | "Team Ready"
  (white cards, small, with drop shadow)

---
### 3. STATS BAR
Full-width, navy-900 bg
4 stats in a row, separated by gold vertical dividers:
- "500+" / Doanh nghiệp
- "50,000+" / Học viên  
- "10+" / Năm kinh nghiệm
- "98%" / Tỷ lệ hài lòng

Number: 48px bold gold
Label: 14px white/70

---
### 4. VALUES SECTION
BG: neutral-50
Title area: centered, H2 + gold underline accent (4px, 60px wide)

3 Cards (equal width, gap 24px):
Card style:
- White bg, 12px radius, subtle shadow
- Top: 48x48 icon box (navy-900 bg, gold icon)
- Gold top border accent (3px, full width, rounded top)
- H3 title
- Body text
- Hover: translateY(-8px), shadow intensifies, 
  gold border glow (box-shadow: 0 0 0 2px gold)

Titles: "Khác Biệt" | "Sứ Mạng" | "Giá Trị"

---
### 5. ABOUT SECTION
BG: white
2-col layout (50/50):

LEFT (content):
- Eyebrow label: "VỀ CHÚNG TÔI" (gold, uppercase, tracking)
- H2 title
- Body paragraphs
- 2 column mini-stats (bold number + label)
- CTA link "Tìm hiểu thêm →" gold color, underline on hover

RIGHT (visual):
- Main image: rounded-2xl, slight rotation (-2deg)
- Overlapping accent card (gold bg, navy text):
  "10+ Năm Kinh Nghiệm" — positioned bottom-left of image
- Decorative dots pattern (navy, opacity 10%) top-right

Below: Full-width CTA banner
  navy-900 bg, gold left border accent (8px)
  Text left + Button right "Liên hệ ngay"
  button: gold bg, navy text

---
### 6. SERVICES SECTION
BG: navy-950
Header: white H2, gold accent, centered
Subtitle: white/60

Grid: 3x2 (desktop) → 2x3 (tablet) → 1x6 (mobile)

Card style (glassmorphism):
- Background: white/5, backdrop-blur
- Border: white/10, 1px
- Hover: white/10 bg, gold border
- Icon: 40px, gold color
- Title: white, 18px bold
- Description: white/70, 14px
- Arrow link: gold, "→" animates right on hover

6 Services:
1. Đào tạo Inhouse AI
2. Tư vấn Chuyển đổi số
3. Huấn luyện Team
4. Teambuilding
5. Thiết kế Doanh nghiệp
6. HR Technology

---
### 7. COURSES SECTION
BG: neutral-50

Header centered, H2

Cards (horizontal scroll on mobile, grid 3-col desktop):
Card structure:
- Thumbnail image (16:9, rounded top)
- Level badge: pill on image top-right 
  (Cơ bản=green, Trung cấp=blue, Nâng cao=gold)
- Duration badge: bottom-left of image
  (dark/80 bg, white text, clock icon)
- Card body (white bg):
  - Category tag (gold, small, uppercase)
  - Title H3
  - Short description, 2 lines clamp
  - Bottom row: "Xem chi tiết →" link

---
### 8. TESTIMONIALS SECTION
BG: navy-900

Header: white, centered

Carousel (1 visible at a time, prev/next arrows):
Card (max-width 800px, centered):
- Large quote mark " (gold, 80px, opacity 20%)
- Quote text: white, 20px italic, line-height 1.8
- Below: avatar (48px circle) + name (white bold) 
  + position/company (gold, 14px)
- Star rating: 5 gold stars

Navigation: dot indicators, gold active dot

Below carousel:
"Đối tác tin cậy" label
Logos marquee (infinite scroll, left):
- 8 partner logos, white/40 filter → white on hover
- Speed: 30s linear infinite

---
### 9. CONTACT SECTION
BG: gradient navy-950 → navy-900

2-col layout:
LEFT:
- H2 white "Sẵn sàng bắt đầu?"
- Subtext white/70
- 3 contact info rows (icon gold + text white):
  📞 Hotline: 0862 554 248
  ✉️ Email: info@company.com
  📍 Địa chỉ: ...
- Social icons row (Facebook, YouTube, LinkedIn, Zalo)
  white/50 → gold on hover

RIGHT: Form card
- White bg, rounded-2xl, padding 40px, shadow-2xl
- Fields (floating label style):
  - Họ và tên *
  - Email *
  - Số điện thoại *
  - Dịch vụ quan tâm (select dropdown)
  - Tin nhắn (textarea, 4 rows)
- Submit button: full width, gold bg, navy text, 
  "Gửi yêu cầu tư vấn", arrow icon
  hover: gold-400, scale 1.02

---
### 10. FOOTER
BG: navy-950
Top border: 1px white/10

Grid 5-col (→ 2-col tablet → 1-col mobile):
Col 1 (wider): Logo + tagline + social icons + "© 2025"
Col 2: Về chúng tôi (links)
Col 3: Dịch vụ (links)  
Col 4: Đào tạo (links)
Col 5: Newsletter signup
  - Input + "Đăng ký" button (gold)
  - "Nhận cập nhật mới nhất từ chúng tôi"

Bottom bar: 
  border-top white/10
  Left: Copyright text (white/40)
  Right: Chính sách | Điều khoản (links, white/40)

## Animation Specs
- All sections: fade-up on scroll (opacity 0→1, y 40→0, 0.6s ease)
- Cards: stagger 0.1s delay between each
- Numbers/stats: count-up animation when in view
- Navbar: shadow appears on scroll
- Hero: text reveals word by word (0.05s stagger per word)
- Marquee: CSS infinite scroll, pause on hover
- Buttons: scale(1.05) on hover, 0.2s ease

## Responsive Rules
- Desktop: 1280px+ full layout
- Tablet: 768px-1279px adjusted grid
- Mobile: <768px single column, hamburger nav

## Output
- React components with Tailwind CSS
- Each section as separate component
- Pixel perfect, production ready
- Use placeholder images from unsplash (via next/image)
- Vietnamese content throughout
- NO lorem ipsum