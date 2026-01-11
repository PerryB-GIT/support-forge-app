# Support Forge Improvement Plan

**Created**: 2026-01-10
**Status**: In Progress
**Last Updated**: 2026-01-10 (Evening Session)

---

## Overview

Site review conducted on support-forge.com identifying critical issues blocking revenue and opportunities for improvement.

---

## Phase 1: Critical Revenue Blockers (Immediate)

### 1.1 Workflow Shop - Stripe Payment Links
- **Location**: `apps/web/src/app/shop/page.tsx`
- **Issue**: 16 placeholder URLs (`YOUR_STRIPE_LINK_*`)
- **Status**: [~] DEFERRED - Awaiting Stripe setup
- **Tasks**:
  - [ ] Create Stripe Payment Links for each workflow product
  - [ ] Replace all placeholder URLs in shop page
  - [ ] Test each purchase flow end-to-end
- **Products to configure**:
  - [ ] LinkedIn Content Generator ($49) - Line 33
  - [ ] Site Uptime Monitor ($29) - Line 49
  - [ ] Morning Briefing ($39) - Line 65
  - [ ] AWS Cost Reporter ($39) - Line 81
  - [ ] Client Onboarding ($49) - Line 97
  - [ ] Social Media Scheduler ($59) - Line 113
  - [ ] Invoice Reminder System ($39) - Line 129
  - [ ] Lead Capture Pipeline ($49) - Line 145
  - [ ] Review Request Automation ($35) - Line 161
  - [ ] Appointment Reminders ($29) - Line 177
  - [ ] Content Repurposer ($59) - Line 193
  - [ ] Expense Auto-Logger ($35) - Line 209
  - [ ] Competitor Price Monitor ($49) - Line 225
  - [ ] Cloud Backup Automation ($39) - Line 241
  - [ ] Custom Starter ($199) - Line 258
  - [ ] Custom Professional ($499) - Line 273

### 1.2 AI Launchpad - Enrollment Buttons
- **Issue**: Buttons use programmatic checkout via `/api/stripe/checkout` - needs Stripe price IDs
- **Status**: [~] DEFERRED - Awaiting Stripe setup
- **Note**: Uses `handleCheckout()` function, not direct links. Needs env vars:
  - `STRIPE_ACADEMY_PRICE_ID` (Self-Paced $997)
  - `STRIPE_ACADEMY_LIVE_PRICE_ID` (Live Tutoring $1500)
  - `STRIPE_ACADEMY_PAYMENT_PLAN_PRICE_ID` (3x $397)
- **Tasks**:
  - [ ] Create Stripe products/prices in dashboard
  - [ ] Add price IDs to environment variables
  - [ ] Test checkout flow end-to-end

---

## Phase 2: Professionalism & Trust (This Week)

### 2.1 Business Email
- **Current**: `perry.bailes@gmail.com`
- **Target**: `perry@support-forge.com` or `contact@support-forge.com`
- **Status**: [ ] Not Started - Requires domain email setup
- **Tasks**:
  - [ ] Configure email with domain (Google Workspace or Zoho)
  - [ ] Update all instances in footer
  - [ ] Update contact page
  - [ ] Set up forwarding if needed

### 2.2 Page Titles & SEO Meta
- **Status**: [x] COMPLETED
- **Tasks**:
  - [x] Audit all page titles
  - [x] Create unique, descriptive titles per page
  - [x] Add meta descriptions to each page
  - [x] Verify Open Graph tags for social sharing
- **Files Modified**:
  - `apps/web/src/app/shop/page.tsx` - Fixed duplicate title
  - `apps/web/src/app/launchpad/layout.tsx` - Created with proper metadata
  - `apps/web/src/app/privacy/page.tsx` - Fixed title + added OG tags
  - `apps/web/src/app/terms/page.tsx` - Fixed title + added OG tags

### 2.3 Mobile Responsiveness Audit
- **Status**: [x] COMPLETED
- **Tasks**:
  - [x] Test all pages on mobile viewport
  - [x] Verify hamburger menu functionality
  - [x] Check touch targets on buttons
  - [ ] Test purchase flows on mobile (blocked by Stripe)
- **Issues Found & Fixed**:
  - [x] Homepage missing hamburger menu - FIXED (replaced inline header with shared Header component)
- **Minor Issues (Low Priority)**:
  - "Learn more" links are 24px height (below 44px recommended) - could add padding
  - Logo touch target 32px height - could add padding
- **Files Modified**:
  - `apps/web/src/app/page.tsx` - Replaced inline header/footer with shared components

---

## Phase 3: Conversion Optimization (Next Week)

### 3.1 Social Proof - Testimonials
- **Status**: [~] PARTIAL - Structure added, needs content
- **Tasks**:
  - [ ] Collect 2-3 client testimonials
  - [x] Add testimonial section to homepage
  - [ ] Add testimonials to Launchpad page
  - [ ] Include name, company, photo if possible
- **Files Modified**:
  - `apps/web/src/app/page.tsx` - Added testimonials section with placeholder content

### 3.2 Calendly Integration
- **Current**: "Book a Call" → Contact form
- **Status**: [ ] Not Started - Requires Calendly account
- **Tasks**:
  - [ ] Set up Calendly account (if not existing)
  - [ ] Embed or link Calendly on:
    - [ ] Homepage CTA
    - [ ] Launchpad "Book Strategy Call"
    - [ ] Shop "Schedule a Call"
    - [ ] Contact page

### 3.3 Workflow Shop Enhancements
- **Status**: [ ] Not Started
- **Tasks**:
  - [ ] Add preview screenshots for each workflow
  - [ ] Consider short demo videos/GIFs
  - [ ] Add "What you'll receive" clarity
  - [ ] Verify download/delivery mechanism post-purchase

---

## Phase 4: Content & SEO (Ongoing)

### 4.1 Blog Setup
- **Status**: [x] COMPLETED
- **Tasks**:
  - [x] Add `/blog` route
  - [x] Create blog listing page
  - [x] Design blog post template
  - [x] Plan initial content (3 placeholder posts)
  - [x] Add blog link to navigation
- **Files Created**:
  - `apps/web/src/data/posts.ts` - Blog data with types and sample posts
  - `apps/web/src/app/blog/page.tsx` - Blog listing page
  - `apps/web/src/app/blog/[slug]/page.tsx` - Individual post template
- **Files Modified**:
  - `apps/web/src/components/layout/Header.tsx` - Added Blog nav link
  - `apps/web/src/components/layout/Footer.tsx` - Added Blog footer link
- **Sample Posts (Coming Soon)**:
  - "5 AI Automations Every Small Business Needs"
  - "Getting Started with n8n Workflow Automation"
  - "How Claude Code Can Transform Your Development Workflow"

### 4.2 Schema Markup
- **Status**: [x] COMPLETED
- **Tasks**:
  - [x] Add LocalBusiness schema (homepage) - Already existed
  - [x] Add Course schema (Launchpad)
  - [x] Add FAQPage schema (Shop FAQ section)
  - [ ] Add Product schema (Workflow Shop items) - Optional, lower priority
- **Files Modified**:
  - `apps/web/src/app/launchpad/layout.tsx` - Added CourseJsonLd
  - `apps/web/src/app/shop/page.tsx` - Added FAQJsonLd
  - `apps/web/src/components/seo/JsonLd.tsx` - Added CourseJsonLd component

### 4.3 Internal Linking Audit
- **Status**: [x] COMPLETED
- **Tasks**:
  - [x] Verify all footer anchor links work (`/services#ai`, etc.)
  - [x] Check navigation consistency across pages
  - [x] Ensure all CTAs have proper destinations
- **Files Modified**:
  - `apps/web/src/app/services/page.tsx` - Added `id` attributes to all 6 service cards + scroll-mt-24
  - `apps/web/src/components/layout/Footer.tsx` - Added missing service links (consulting, security, support)

---

## Phase 5: Nice-to-Have Polish

### 5.1 Case Studies Page
- **Status**: [ ] Not Started
- **Tasks**:
  - [ ] Create `/case-studies` or `/portfolio`
  - [ ] Document 2-3 project success stories
  - [ ] Link from homepage "150+ Projects"

### 5.2 Live Chat Widget
- **Status**: [ ] Not Started
- **Tasks**:
  - [ ] Consider Crisp, Intercom, or Tawk.to
  - [ ] Quick visitor engagement
  - [ ] After-hours lead capture

### 5.3 Exit Intent Popup
- **Status**: [ ] Not Started
- **Tasks**:
  - [ ] Capture leaving visitors
  - [ ] Offer free resource or consultation

---

## Execution Priority Summary

| Priority | Items | Status | Impact |
|----------|-------|--------|--------|
| **P0** | Stripe links, Enroll buttons | DEFERRED | Revenue-blocking |
| **P1** | Business email, Page titles | PARTIAL (titles done) | Professionalism |
| **P2** | Mobile audit, Testimonials | DONE (structure) | Trust/Conversion |
| **P3** | Calendly, Shop previews | NOT STARTED | UX/Conversion |
| **P4** | Blog, Schema markup | DONE | SEO/Long-term |
| **P5** | Case studies, Chat widget | NOT STARTED | Polish |

---

## Progress Log

### 2026-01-11 (Deployment)
- All changes deployed to production
- Docker-compose issue resolved (ContainerConfig KeyError fixed with down/up cycle)
- Site verified live at support-forge.com

### 2026-01-10 (Evening Session)
- Initial site review completed
- Plan created and committed to docs/

**Completed This Session:**
- [x] SEO/Page titles fixed (Shop, Launchpad, Privacy, Terms)
- [x] Internal anchor links fixed (all 6 service anchors now work)
- [x] Testimonials section added to homepage (placeholder content)
- [x] Stripe placeholder audit completed (16 URLs in shop, 3 price IDs for launchpad)
- [x] Mobile responsiveness audit completed
- [x] Homepage hamburger menu fixed (was missing on mobile)
- [x] Schema markup added (Course on Launchpad, FAQ on Shop)
- [x] Blog structure created (/blog route, post template, 3 sample posts)
- [x] Blog links added to header and footer navigation

**Deferred (Requires User Action):**
- Stripe setup (16 payment links + 3 price IDs)
- Business email configuration
- Calendly integration
- Real testimonial content

---

## Deployment

To deploy changes to production:
```bash
ssh -i ~/.ssh/support-forge-key.pem ubuntu@44.197.15.102
cd /path/to/app
docker-compose build --no-cache web && docker-compose up -d
```

---

## Notes

- Production codebase: `C:/Users/Jakeb/support-forge-app/`
- Deployment: Docker on EC2 (44.197.15.102)
- AWS Profile: `support-forge`
