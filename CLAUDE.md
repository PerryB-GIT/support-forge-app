# Support Forge - Project Context

## Quick Reference
- **Live URL**: https://support-forge.com
- **Repo**: support-forge-app (this directory)
- **Stack**: Next.js 16, React 19, Tailwind 4, Prisma, TypeScript
- **Hosting**: GCP Cloud Run (us-central1)
- **Cloud Run URL**: https://support-forge-lr2jeeijaq-uc.a.run.app
- **GCP Project**: gen-lang-client-0978337543
- **Legacy EC2**: 44.197.15.102 (deprecated, AWS profile: `support-forge`)

## Architecture

```
support-forge-app/
├── apps/
│   ├── web/           # Main Next.js site (port 3000)
│   └── mobile/        # React Native (future)
├── packages/
│   ├── database/      # Prisma schema + client
│   └── shared/        # Shared types + utils
├── docs/              # Internal documentation
├── scripts/           # Build + deploy scripts
└── tools/             # Dev tooling
```

## Brand Guidelines
- **Primary Purple**: #6366f1, #8B5CF6
- **Dark Backgrounds**: #050508, #0f0f14
- **Logo**: sf-logo-final.png, /public/academy-logo.svg
- **Tone**: Professional but approachable, tech-forward

## Key Files
- `apps/web/src/app/` - App Router pages
- `apps/web/src/components/` - React components
- `packages/database/prisma/schema.prisma` - DB schema
- `docker-compose.yml` - Container orchestration
- `nginx.conf` - Reverse proxy config

## Commands

### Development
```bash
npm run dev          # Start all workspaces
npm run build        # Build all
npm run lint         # ESLint all
npm run test         # Run tests
```

### Database
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to DB
npx prisma studio    # GUI for DB
```

### Deployment (Cloud Run)
```bash
# Build and deploy to Cloud Run
gcloud run deploy support-forge \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# Quick deploy with existing image
gcloud run services update support-forge \
  --region us-central1 \
  --image gcr.io/gen-lang-client-0978337543/support-forge

# Check deployment status
gcloud run services describe support-forge --region us-central1

# View logs
gcloud run logs read support-forge --region us-central1 --limit 50
```

### Legacy EC2 Deployment (deprecated)
```bash
# SSH to server (if EC2 is running)
ssh -i ~/.ssh/support-forge-key.pem ubuntu@44.197.15.102

# On server - full rebuild
cd /home/ubuntu/support-forge-app
git pull
docker-compose build --no-cache web
docker-compose up -d
```

## Environment Variables
Required in `.env` and Cloud Run secrets:
- `DATABASE_URL` - Postgres connection
- `NEXTAUTH_SECRET` - Auth secret
- `NEXTAUTH_URL` - https://support-forge.com
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `STRIPE_SECRET_KEY` - Payment processing
- `ANTHROPIC_API_KEY` - AI features
- `OPENAI_API_KEY` - Backup AI

### Update Cloud Run env vars
```bash
gcloud run services update support-forge \
  --region us-central1 \
  --set-env-vars "KEY=value"
```

## Features in Development
- AI Academy courses (Launchpad)
- Consulting booking system
- Client portal
- Stripe subscriptions

## Known Issues / Gotchas
- Next.js 16 + React 19 requires `--legacy-peer-deps` for some packages
- Turbo cache can get stale - run `rm -rf .turbo node_modules/.cache` if builds act weird
- Docker builds on EC2 need `--no-cache` after package.json changes

## Testing Checklist Before Deploy
1. `npm run build` succeeds locally
2. `npm run lint` passes
3. Check `/api/health` endpoint
4. Test auth flow (login/logout)
5. Verify Stripe webhook in test mode

## Related Docs
- `docs/` - Internal documentation
- `PROJECT_INDEX.md` - Full project index
- `PARTNERSHIP_STRATEGY.md` - Business strategy
- `prd.json` - Product requirements
