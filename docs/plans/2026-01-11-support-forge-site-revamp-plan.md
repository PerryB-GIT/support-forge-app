# Support Forge Website Revamp - Project Plan

**Date:** January 11, 2026
**Status:** Ready for Execution
**Project Manager:** Claude (Automated)

---

## Executive Summary

Transform support-forge.com from a generic IT consulting site into a focused, ROI-driven AI Launchpad platform. The revamp aligns the website with the investor pitch materials and positions AI Launchpad as the core product offering.

---

## Competitive Analysis Summary

### Direct Competitors Analyzed

| Competitor | Positioning | Strengths | Weaknesses |
|------------|-------------|-----------|------------|
| **Wollenlabs.com** | Enterprise AI Agency | 20+ team, embedded engineers, NYC presence, clean design | Enterprise-only, high price point, less accessible |
| **AICerts.ai** | AI Certification Body | Role-based programs, partner network, mobile app, case studies | Certification focus only, no hands-on implementation |
| **Jam AI** | AI Community/Consulting | $47/mo community, $3,000 packages | Less comprehensive, no full enablement stack |

### Market Insights
- **Accenture + Anthropic Partnership**: 30,000 professionals trained - validates enterprise demand
- **US AI Consultants**: $200-350/hour market rate
- **Market Stats**: 90% organizations use AI, only 58-59% see time savings (implementation gap)

### Our Competitive Advantages
1. **Speed to value**: 2 weeks vs months of trial and error
2. **Full stack enablement**: Claude Code + GitHub + AWS + Zapier + N8N
3. **Proven results**: 30-40 hours/week saved (documented client outcomes)
4. **Accessible pricing**: $97/mo entry point vs $200+/hour consultants
5. **First-mover in Claude Code**: Anthropic partnership in progress

---

## Current Site Issues

| Issue | Current State | Target State |
|-------|---------------|--------------|
| **Positioning** | Generic IT consulting (6+ services) | Focused AI Launchpad |
| **Pricing** | $997 / $1,500 / $5,000+ | $97/mo / $3,000 / $10,000+ |
| **Stats** | Conservative (10+ hours saved) | Bold (30-40 hours/week saved) |
| **Messaging** | Feature-focused | ROI & empowerment focused |
| **Social Proof** | None visible | Client testimonials, case studies |
| **CTA** | Unclear | Clear journey to purchase |

---

## Site Architecture (Revised)

```
support-forge.com/
├── / (Homepage) - Hero + ROI focus + social proof
├── /launchpad - Main product page (pricing tiers)
├── /results - Case studies & ROI calculator
├── /method - The LAUNCH Method explained
├── /about - Perry's story + why this works
└── /contact - Simple contact form + booking
```

### Pages to Remove/Redirect
- Generic IT consulting services pages
- Cybersecurity, Managed IT, etc. (redirect to homepage)
- Workflow Shop (integrate into Launchpad or remove)

---

## Content Strategy

### Core Messaging Framework

**Headline**: "The fastest path from AI-curious to AI-powered"

**Subhead**: "Transform your team from 'I should use AI' to 'I ship with AI daily' in 2 weeks"

**Value Props** (in order):
1. **30-40 hours/week saved** - Lead with outcome
2. **2 weeks to productive** - Speed to value
3. **Full stack enablement** - Comprehensive solution
4. **Ongoing support** - Not abandoned after purchase

### ROI Messaging Examples

| Before | After |
|--------|-------|
| "AI Integration Services" | "Reclaim 30-40 hours every week" |
| "Software Development" | "From AI-curious to AI-powered in 2 weeks" |
| "10+ hours saved" | "30-40 hours/week saved permanently" |
| "Learn AI tools" | "Your team ships with AI daily" |

### Empowerment Theme
- "Empower your team to work smarter, not harder"
- "Give your business an unfair advantage"
- "Stop wasting money on unused AI subscriptions"
- "Bridge the gap from 'AI exists' to 'my team uses it'"

---

## Pricing Page Updates

### Tier 1: Launchpad Starter
**Price**: $97/month
**Headline**: "Start Your AI Journey"
- Self-paced video course
- Golden config templates
- Community access (Discord)
- Monthly group Q&A
- Setup guides for GitHub, AWS, Zapier, N8N

### Tier 2: Launchpad Pro (Featured)
**Price**: $3,000 (one-time)
**Headline**: "Go From Zero to Shipping in 2 Weeks"
- Everything in Starter
- 2-week live cohort program (4-6 people)
- Hands-on Claude Code setup during sessions
- Direct Slack access during program
- Graduation = fully set up and trained

### Tier 3: Launchpad Enterprise
**Price**: $10,000+
**Headline**: "Full Custom AI Transformation"
- Full custom implementation
- 1-on-1 engagement
- Ongoing support retainer
- Integration with existing tools/workflows
- White-glove deployment

---

## Implementation Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Update homepage hero section with new messaging
- [ ] Replace stats with 30-40 hours/week saved
- [ ] Update meta tags and SEO for AI Launchpad focus
- [ ] Remove generic IT services from navigation

### Phase 2: Pricing & Product (Days 3-4)
- [ ] Completely rebuild /launchpad with new pricing tiers
- [ ] Add comparison table showing tier differences
- [ ] Implement clear CTAs for each tier
- [ ] Add FAQ section addressing common objections

### Phase 3: Social Proof (Days 5-6)
- [ ] Create /results page with case studies
- [ ] Add client testimonials throughout site
- [ ] Include quote from "30-40 hours/week" client
- [ ] Add ROI calculator (optional)

### Phase 4: Content Pages (Days 7-8)
- [ ] Update /about with Perry's story and "why this works"
- [ ] Create /method page explaining LAUNCH framework
- [ ] Remove/redirect deprecated service pages
- [ ] Update footer with streamlined navigation

### Phase 5: Polish & Deploy (Days 9-10)
- [ ] Mobile responsiveness check
- [ ] Performance optimization
- [ ] SEO audit and schema markup
- [ ] Final review and production deployment

---

## Design Guidelines (Maintain Current Brand)

### Colors (Keep)
- Primary Purple: #6366f1, #8B5CF6
- Dark backgrounds: #050508, #0f0f14
- Accent gradients: linear-gradient(135deg, #8B5CF6, #6366f1)

### Typography (Keep)
- Segoe UI / Tahoma / sans-serif stack
- Large bold headlines
- Clean, readable body text

### Visual Elements (Add)
- More white space
- Stat boxes with gradient borders
- Client testimonial cards
- Clear tier comparison cards
- Progress/timeline visuals for the method

---

## Success Metrics

| Metric | Current | Target (30 days) |
|--------|---------|------------------|
| Bounce rate | Unknown | < 50% |
| Time on site | Unknown | > 2 minutes |
| Launchpad page visits | Low | +200% |
| Contact form submissions | Low | +5 per week |
| Pricing tier clicks | Unknown | Track all |

---

## Technical Requirements

### Updates Needed
1. Update Next.js pages in `apps/web/app/`
2. Create new components for pricing cards
3. Add testimonial carousel component
4. Implement Google Analytics tracking
5. Add schema.org markup for courses/services

### Files to Modify
- `apps/web/app/page.tsx` (homepage)
- `apps/web/app/launchpad/page.tsx` (pricing)
- `apps/web/app/about/page.tsx` (story)
- `apps/web/components/` (new components)
- `apps/web/app/layout.tsx` (navigation updates)

---

## Execution Authorization

This plan is **AUTO-APPROVED** for execution by Claude as Project Manager.

**Execution Mode**: Phase-by-phase with commit after each phase
**Rollback**: Git revert to pre-revamp state if issues arise
**Deployment**: Docker rebuild on EC2 after each major phase

---

## Next Steps

1. Begin Phase 1: Foundation
2. Commit changes with descriptive messages
3. Deploy to staging/production after each phase
4. Document any blockers or decisions made

---

**Plan Created**: January 11, 2026
**Plan Author**: Claude (Project Manager)
**Approved By**: Perry (Auto-approved per request)
