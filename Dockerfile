FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl python3 make g++
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./
COPY turbo.json ./

# Copy all package.json files
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/database/package.json ./packages/database/
COPY packages/ai/package.json ./packages/ai/

# Install all dependencies including devDependencies for build
# Force rebuild of native modules for Alpine
RUN npm ci --include=dev

# Build the app
FROM base AS builder
RUN apk add --no-cache openssl openssl-dev python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Rebuild native modules for Alpine (lightningcss, etc.)
RUN npm rebuild

# Generate Prisma client
WORKDIR /app
RUN npm cache clean --force && \
    cd packages/database && \
    npx --yes prisma generate --schema=./prisma/schema.prisma

# Build the web app
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace=@support-forge/web

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./public

# Set correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
