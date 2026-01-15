# Support Forge - Project Index

> Generated: 2026-01-15 | 129 source files | ~3KB context load

## Quick Reference

| Aspect | Details |
|--------|---------|
| **Stack** | Next.js 16 + React 19 + TypeScript + Tailwind 4 + Prisma + PostgreSQL |
| **Architecture** | Turborepo monorepo with npm workspaces |
| **Deployment** | Docker on EC2 (44.197.15.102) with nginx reverse proxy |
| **Auth** | NextAuth.js with Prisma adapter |
| **Payments** | Stripe (subscriptions + one-time) |
| **AI** | Claude (Anthropic) + OpenAI with unified provider interface |

## Repository Structure

```
support-forge-app/
├── apps/
│   ├── web/                    # Main Next.js application (129 files)
│   └── mobile/                 # Mobile app (placeholder)
├── packages/
│   ├── ai/                     # Unified AI provider (Claude/OpenAI)
│   ├── database/               # Prisma schema + client
│   ├── shared/                 # Types, constants, utilities
│   ├── sf-setup/               # Setup utilities
│   └── ui/                     # Shared UI components
├── docs/                       # Documentation
├── scripts/                    # Build/deploy scripts
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # Container build
└── nginx.conf                  # Reverse proxy config
```

## Web App Routes (apps/web/src/app)

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage - AI consulting landing |
| `/about` | Company information, philosophy |
| `/services` | Consulting service offerings |
| `/results` | Case studies with ROI metrics |
| `/assessment` | AI readiness assessment |
| `/contact` | Contact form (query param: `?service=`) |
| `/blog` | Blog/insights |
| `/privacy`, `/terms` | Legal pages |

### Auth Routes `(auth)/`
| Route | Description |
|-------|-------------|
| `/login` | User login |
| `/register` | New account registration |
| `/forgot-password` | Password reset request |
| `/reset-password` | Password reset form |

### Client Portal `(client)/`
| Route | Description |
|-------|-------------|
| `/dashboard` | Client overview |
| `/projects` | Project management |
| `/appointments` | Appointment scheduling |
| `/support` | Support tickets |
| `/chat` | AI chat interface |
| `/documents` | Document management |
| `/billing` | Invoices and payments |

### Admin Portal `(admin)/admin/`
| Route | Description |
|-------|-------------|
| `/admin/analytics` | Dashboard analytics |
| `/admin/clients` | Client management |
| `/admin/projects` | All projects |
| `/admin/appointments` | Appointment management |
| `/admin/tickets` | Support ticket queue |
| `/admin/invoices` | Invoice management |
| `/admin/documents` | Document library |
| `/admin/settings` | System settings |

## API Endpoints (34 routes)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `/api/auth/[...nextauth]` - NextAuth handlers

### Client APIs
- `/api/appointments` - GET/POST appointments
- `/api/appointments/[id]` - GET/PATCH/DELETE appointment
- `/api/projects` - GET/POST projects
- `/api/projects/[id]` - GET/PATCH/DELETE project
- `/api/chat` - AI chat endpoint (streaming)
- `/api/conversations` - Conversation management
- `/api/conversations/[id]/messages` - Message history

### Admin APIs (`/api/admin/`)
- `/api/admin/clients` - Client CRUD
- `/api/admin/projects` - Project management
- `/api/admin/appointments` - Appointment management
- `/api/admin/tickets` - Ticket management
- `/api/admin/invoices` - Invoice CRUD + PDF/email
- `/api/admin/documents` - Document management
- `/api/admin/settings` - System settings

### Payments
- `/api/academy/enrollment` - Course enrollment via Stripe
- `/api/stripe/webhook` - Stripe webhook handler

## Database Models (Prisma)

| Model | Key Fields | Relations |
|-------|------------|-----------|
| **User** | email, name, role (ADMIN/CLIENT), company | projects, appointments, tickets, invoices |
| **Project** | title, status, budget, dates | client, tickets, documents |
| **Appointment** | date, duration, type, status, meetingUrl | client |
| **Ticket** | title, priority, status | client, project, comments |
| **Conversation** | title, model | user, messages |
| **Message** | role, content, tokenCount | conversation |
| **Document** | name, type, url, size | client, project |
| **Invoice** | number, amount, status, dueDate | client, items |
| **CourseEnrollment** | courseType, status, stripeSessionId | user (optional) |

### Enums
- `Role`: ADMIN, CLIENT
- `Status`: ACTIVE, COMPLETED, ON_HOLD, CANCELLED
- `AppointmentStatus`: SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW
- `TicketPriority`: LOW, MEDIUM, HIGH, URGENT
- `TicketStatus`: OPEN, IN_PROGRESS, WAITING, RESOLVED, CLOSED
- `EnrollmentStatus`: PENDING, ACTIVE, COMPLETED, REFUNDED, CANCELLED

## Packages

### @support-forge/ai
Unified AI interface for Claude and OpenAI.
```typescript
import { SupportForgeAI, ai } from "@support-forge/ai";
// ai.chat(messages, options) - Standard chat
// ai.streamChat(messages, callbacks, options) - Streaming
// ai.setProvider("claude" | "openai")
```

### @support-forge/database
Prisma client export.
```typescript
import { prisma } from "@support-forge/database";
```

### @support-forge/shared
Constants and types.
```typescript
import { CONTACT_INFO, API_ROUTES, APPOINTMENT_TYPES } from "@support-forge/shared";
// CONTACT_INFO: email, phone, location
// API_ROUTES: AUTH, USERS, APPOINTMENTS, etc.
```

## Key Components (apps/web/src/components)

| Directory | Contents |
|-----------|----------|
| `layout/` | Header, Footer, navigation |
| `admin/` | Admin dashboard components |
| `client/` | Client portal components |
| `chat/` | AI chat interface |
| `appointments/` | Booking components |
| `projects/` | Project management UI |
| `ui/` | Buttons, cards, forms, modals |
| `providers/` | Context providers (auth, theme) |
| `seo/` | SEO components |

## Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_URL=https://support-forge.com
NEXTAUTH_SECRET=...

# AI Providers
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...

# Stripe
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_ACADEMY_PRICE_ID=...
STRIPE_ACADEMY_PAYMENT_PLAN_PRICE_ID=...
STRIPE_ACADEMY_LIVE_PRICE_ID=...

# App
NEXT_PUBLIC_APP_URL=https://support-forge.com
```

## Deployment

### Docker Commands
```bash
# Build and deploy
docker-compose build --no-cache web && docker-compose up -d

# Logs
docker-compose logs -f web

# Database
docker-compose exec db psql -U supportforge
```

### Services (docker-compose.yml)
- **web**: Next.js app on port 3000
- **db**: PostgreSQL 15 Alpine
- **nginx**: Reverse proxy (80/443) with Let's Encrypt

### EC2 Access
```bash
ssh -i ~/.ssh/support-forge-key.pem ubuntu@44.197.15.102
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development servers |
| `npm run build` | Build all packages |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |

## Branding

- **Primary Color**: Purple (#6366f1, #8B5CF6)
- **Background**: Dark (#050508, #0f0f14)
- **Font**: Space Grotesk (headings)
- **Logo**: sf-logo.png, academy-logo.svg

## Recent Redirects (next.config.ts)

Legacy routes redirected to new pages:
- `/academy/*` → `/services`
- `/launchpad/*` → `/services`
- `/shop/*` → `/services`
- `/student/*` → `/login`
- `/tools/*` → `/services`
