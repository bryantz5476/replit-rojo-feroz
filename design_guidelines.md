# Premium Barbershop Landing Page - Design Guidelines

## Design Approach
**Reference-Based:** Drawing from premium street-luxury aesthetic, combining edgy urban culture with high-end precision. Think street fashion meets high-end grooming.

## Visual Identity

### Color Palette
- Primary Black: `#000000` (matte finish aesthetic)
- Primary White: `#FFFFFF`
- Accent Red: `#E10600` (strong, impactful use)

### Typography
- **Display/Headlines:** Condensed typeface with thick and thin stroke contrast (e.g., Bebas Neue, Oswald Condensed)
- **Body Text:** Clean sans-serif for readability
- **Hierarchy:** Bold contrast between condensed headlines and regular body copy

### Design Philosophy
Street-Luxury Fusion: Aggressive confidence meets refined precision. Bold, impactful, and unapologetically masculine.

## Layout Structure (5 Sections)

### 1. Hero Section - Cinematic Impact
- **Video Background:** Looping short video (no sound) showing scissors, razors, quick fades
- **Headline:** Two-line statement: "Corte con Actitud / Precisión que Impone"
- **Subheadline:** Brief offer copy: "Cortes + Perfilado desde X€ — cita limitada hoy"
- **Primary CTA:** Large "AGENDAR CITA" button (links to Setmore - empty href)
- **Animations:** Breath effect on CTA (subtle pulsing), parallax on video elements, red expansion on hover
- **Custom Cursor:** Crosshair or blade-inspired cursor design
- **Spacing:** Full viewport height with centered content

### 2. Value Proposition - 3 Pillars
- **Layout:** Three horizontal cards
- **Pillars:** "Estilo Personal" | "Técnica Precisa" | "Ambiente Calle-Luxe"
- **Icons:** Animated with 3D flip on hover
- **Content:** Benefit-focused microcopy + mini social proof (stars + review count)
- **Spacing:** Even distribution, generous padding between cards

### 3. Dynamic Services Carousel
- **Layout:** Infinite marquee/carousel (loops continuously, pauses on hover)
- **Service Cards:** Vertical orientation with:
  - Service image
  - Service name + price
  - 3 benefit bullets
  - Small "Reservar" CTA
  - Limited availability badge ("Solo fin de semana")
- **Animation:** Smooth infinite scroll with subtle pause interaction

### 4. Gallery - Before/After Showcase
- **Layout:** Asymmetric grid (varied card sizes)
- **Content:** Before/after images with swipe filter effect, plus one large timelapse video card
- **Hover Effects:** Lift (translateY -6px) with aggressive shadow
- **Lightbox:** Smooth transition modal for full image viewing
- **Spacing:** Tight grid with minimal gaps for visual impact

### 5. CTA + Social Proof Closer
- **Background:** Solid black (#000) with white text
- **Testimonials:** Rotating carousel (text + circular mini photo)
- **Collaboration Logos:** Partner/brand logos for credibility
- **Dual CTAs:** 
  - Primary: "Agenda tu corte ahora"
  - Secondary: "Ver precios"
- **Lead Capture:** Minimal form (name + phone fields only)
- **Urgency Element:** Animated counter "Quedan X plazas hoy" with numeric animation
- **Spacing:** Generous padding, clear visual separation of elements

## Component Specifications

### Buttons
- Large, bold primary buttons with red background
- Breath animation (subtle scale pulse)
- Red expansion effect on hover
- Clear focus states for accessibility

### Cards
- Clean borders or subtle shadows
- 3D flip animations on value proposition cards
- Lift + shadow on gallery hover
- Consistent corner radius

### Images
- **Hero Video:** Full-width background, optimized for web, looping
- **Service Images:** High-quality product photography
- **Gallery:** Professional before/after shots + timelapse video
- **Testimonial Photos:** Small circular avatars
- Lazy-load all images for performance (LCP optimization)

## Animation Strategy
- **Performance Target:** 60fps apparent smoothness
- **Principle:** Smooth, premium feel without overwhelming flashing/blinking
- **Key Animations:**
  - Breath effect on CTA
  - 3D flip on cards
  - Parallax on hero
  - Infinite marquee on services
  - Lift + shadow on gallery
  - Numeric counter animation
  - Testimonial rotation
- Use Framer Motion and Intersection Observer for scroll triggers

## Accessibility & UX
- Alt text on all images
- Clear focus states on interactive elements
- Keyboard navigation support
- High contrast ratios maintained

## Copy Strategy
- Benefit-focused language (not feature-focused)
- Urgency triggers (limited availability, countdown)
- Social proof integration (reviews, testimonials)
- Masculine, confident tone

## Technical Notes
- React + Vite architecture
- TailwindCSS for styling
- Framer Motion for animations
- Intersection Observer for scroll triggers
- SVG animations where applicable
- Setmore integration placeholder (empty href)