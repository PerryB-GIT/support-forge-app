# PRD: Support Forge Visual & Graphic Improvements

**Project**: Support Forge Website Visual Enhancement
**Created**: January 16, 2026
**Priority**: High
**Status**: Draft

---

## Executive Summary

This PRD outlines visual and graphic improvements for support-forge.com to create a more dynamic, eye-catching, and premium consulting brand presence. The current site has solid content and structure but relies heavily on text with minimal visual differentiation.

---

## Current State Analysis

### What's Working
- Clean dark theme (#050508, #0f0f14) with purple accents (#6366f1, #8B5CF6)
- Good information hierarchy and content organization
- Consistent card-based component design
- Clear typography with Space Grotesk headings
- Well-structured navigation and CTAs

### What Needs Improvement
1. **No Hero Images**: All pages are text-only with no visual focal points
2. **Generic Icons**: Using basic SVG checkmarks and arrows everywhere
3. **No Industry Imagery**: Case studies lack visual representation
4. **Static Design**: No animations or dynamic elements
5. **No AI Branding Visuals**: For an AI consultancy, no AI-themed artwork
6. **Flat Backgrounds**: Solid colors with no depth or texture
7. **No Team/Founder Imagery**: About page lacks personal connection
8. **Generic Process Visualization**: The 1→2→3→4 flow is very basic

---

## Proposed Improvements

### 1. Custom Icon Set (All Pages)

**Current**: Generic checkmark, arrow, and circle icons
**Proposed**: Custom-designed icon set that reinforces AI/consulting brand

| Page/Section | Current Icon | Proposed Custom Icon |
|-------------|--------------|---------------------|
| Homepage - Competitive Pressure | Generic circle | Racing rockets/chess pieces |
| Homepage - ROI Uncertainty | Question mark | Data graph with question |
| Homepage - Board Questions | Speech bubble | Boardroom/presentation icon |
| Homepage - Failed Experiments | Warning | Broken gear reassembling |
| Homepage - Strategic Clarity | Magnifying glass | Brain with clarity beam |
| Homepage - Speed to Value | Clock | Rocket with clock |
| Homepage - Risk Mitigation | Shield | Shield with AI chip |
| Homepage - Competitive Edge | Trophy | First place flag |
| Services - Discovery | Phone | Two heads connecting |
| Services - Assessment | Clipboard | AI scanner analyzing |
| Services - Implementation | Gear | Rocket launching from blueprint |
| Services - Advisory | Handshake | Ongoing support symbol |
| About - Mid-Market Leaders | Building | Growing company skyline |
| About - Operational Executives | Person | Executive with efficiency flows |
| About - Growth-Focused CEOs | Rocket | CEO launching rocket |
| About - Professional Services | Briefcase | Law gavel + AI |

**Delivery**: SVG icon set, consistent 24x24 and 48x48 sizes, matching purple accent color

---

### 2. AI-Generated Hero Images

**Homepage Hero**
- **Concept**: Abstract AI neural network visualization with enterprise elements
- **Style**: Dark background with glowing purple/blue nodes and connections
- **Elements**: Subtle corporate building silhouettes, data flowing, executive figures
- **Size**: 1920x600px, optimized for web

**Services Page Hero**
- **Concept**: Strategic roadmap visualization
- **Style**: Isometric 3D road/path leading through AI landscape
- **Elements**: Milestones, checkpoints, destination flag
- **Size**: 1920x400px

**About Page Hero**
- **Concept**: Partnership/collaboration theme
- **Style**: Abstract hands/figures connecting through AI mesh
- **Elements**: Human and AI working together
- **Size**: 1920x400px

**Results/Case Studies Hero**
- **Concept**: Growth/success visualization
- **Style**: Upward trending data with industry icons
- **Elements**: Charts, manufacturing gear, healthcare cross, briefcase
- **Size**: 1920x400px

**Contact Page Hero**
- **Concept**: Connection/communication theme
- **Style**: Communication nodes connecting
- **Size**: 1920x300px

---

### 3. Industry-Specific Illustrations (Case Studies Page)

Each case study card should have a custom illustration:

| Industry | Illustration Concept |
|----------|---------------------|
| Manufacturing | Factory floor with AI automation overlay |
| Professional Services | Modern office with AI assistant elements |
| Healthcare | Medical facility with AI compliance shield |
| Financial Services | Trading floor/bank with AI analysis |
| Technology | Server room with neural network |
| Retail & Distribution | Warehouse with AI logistics |

**Style**: Isometric or flat illustration, dark background, purple/blue accent colors
**Size**: 400x300px per illustration

---

### 4. Dynamic Visual Elements (CSS/JS Animations)

**Proposed Animations**:

1. **Hero Section**
   - Subtle floating particles/nodes in background
   - Gradient mesh that slowly shifts colors
   - Text reveal animation on page load

2. **Card Hover Effects**
   - Glow effect on hover (purple accent)
   - Slight scale/lift with shadow
   - Icon animation on hover

3. **Process Flow (1→2→3→4)**
   - Animated connection lines
   - Sequential highlight on scroll
   - Pulsing active step indicator

4. **Statistics/Numbers**
   - Count-up animation when scrolling into view
   - Subtle pulse on the numbers

5. **Scroll-Triggered Reveals**
   - Fade-up for cards and sections
   - Stagger animation for lists

6. **Background Enhancements**
   - Gradient mesh overlays
   - Subtle noise texture
   - Floating geometric shapes (very subtle)

---

### 5. Service Cards Enhancement

**Current**: Plain cards with text and basic icons
**Proposed**:
- Background gradient or pattern per card
- Custom 3D icon or illustration per service
- Animated border on hover
- "Most Popular" badge with glow effect

---

### 6. Testimonial Section Enhancement

**Current**: Text boxes with letter avatars (M, S, D)
**Proposed**:
- AI-generated professional headshots or abstract avatars
- Quote icons with stylized design
- Gradient background for testimonial cards
- Company logo placeholders (when available)

---

### 7. Footer Enhancement

**Current**: Basic text links
**Proposed**:
- Subtle pattern or gradient background
- Logo with glow effect
- Social icons (if applicable)
- Newsletter signup with styled input

---

### 8. Background Visual Enhancements

**Proposed Patterns/Textures**:
- Subtle grid pattern overlay (barely visible)
- Gradient mesh sections between content areas
- Topographic/circuit pattern for tech feel
- Radial gradient spotlights behind key sections

---

## Implementation Priority

### Phase 1 (Highest Impact)
1. Homepage hero image/animation
2. Custom icon set for core services
3. Card hover animations
4. Background gradients

### Phase 2 (Brand Enhancement)
5. Service page illustrations
6. Process flow animations
7. Industry illustrations for case studies

### Phase 3 (Polish)
8. Testimonial enhancements
9. Footer improvements
10. Micro-animations throughout

---

## Technical Specifications

### AI Image Generation Prompts

**Homepage Hero:**
```
Dark futuristic AI consulting visualization, neural network nodes glowing purple and blue,
corporate executive silhouettes, data streams flowing, abstract technology background,
premium consulting aesthetic, dark navy (#050508) background, purple (#8B5CF6) and
indigo (#6366f1) accent lighting, cinematic, high quality, 4K, professional corporate imagery
```

**Service Cards - Assessment:**
```
Isometric illustration of AI scanning and analyzing business operations,
dark background, purple glow effects, magnifying glass with AI brain,
data visualization elements, flat design, corporate style, minimal
```

**Industry - Manufacturing:**
```
Isometric factory illustration with AI automation overlay, robots and machinery,
dark background with purple accent lighting, clean modern style,
data flow indicators, production optimization visual
```

### CSS Animation Snippets

**Card Glow Hover:**
```css
.service-card:hover {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
  transform: translateY(-4px);
  transition: all 0.3s ease;
}
```

**Gradient Background:**
```css
.hero-section {
  background: linear-gradient(135deg, #050508 0%, #0f0f14 50%, #1a1a2e 100%);
  position: relative;
}
.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}
```

---

## Asset Delivery Requirements

### Icons
- Format: SVG (optimized)
- Sizes: 24x24, 48x48, 96x96
- Colors: Monochrome with purple (#8B5CF6) accent option
- Count: ~25 custom icons

### Hero Images
- Format: WebP (primary), PNG (fallback)
- Sizes: 1920x600 (desktop), 1200x400 (tablet), 800x300 (mobile)
- Compression: 80% quality, optimized
- Count: 5 hero images

### Industry Illustrations
- Format: SVG or WebP
- Size: 400x300px
- Count: 6 illustrations

### Textures/Patterns
- Format: SVG or small PNG tiles
- Size: 100x100px (tileable)
- Count: 3-4 patterns

---

## Success Metrics

- Increased time on site (current baseline needed)
- Reduced bounce rate
- Improved brand perception (qualitative)
- Higher conversion on Discovery Call CTA
- Positive feedback from clients/prospects

---

## Dependencies

- AI image generation tool (DALL-E, Midjourney, or similar)
- Icon design (custom or commission)
- Frontend developer for animations
- Designer review for consistency

---

## Timeline Estimate

- Phase 1: Icon set + hero images + basic animations
- Phase 2: Service illustrations + advanced animations
- Phase 3: Industry images + polish + optimization

---

## Notes

- Maintain dark theme consistency throughout
- Ensure all images are optimized for performance
- Test animations on mobile (reduce or disable if needed)
- Keep accessibility in mind (prefers-reduced-motion)
- Consider lazy loading for images

---

## Screenshots Reference

Screenshots captured January 16, 2026 are saved at:
- `C:\Users\Jakeb\.playwright-mcp\support-forge-home.png`
- `C:\Users\Jakeb\.playwright-mcp\support-forge-services.png` (actually About page)
- `C:\Users\Jakeb\.playwright-mcp\support-forge-about.png` (actually Results page)
- `C:\Users\Jakeb\.playwright-mcp\support-forge-results.png` (actually Home page)

---

*PRD created by Claude Code for Support Forge visual enhancement project*
