FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
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
RUN npm ci --include=dev

# Explicitly install musl binaries for Alpine compatibility
RUN npm install lightningcss-linux-x64-musl @tailwindcss/oxide-linux-x64-musl --save-optional || true

# Build the app
FROM base AS builder
RUN apk add --no-cache openssl openssl-dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

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

# Install OpenSSL for Prisma runtime detection
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# For monorepo: standalone preserves directory structure
# Copy the standalone output (includes server.js at apps/web/)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./

# Copy public folder to the correct location within standalone structure
COPY --from=builder /app/apps/web/public ./apps/web/public

# Copy static files to the correct location
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# For monorepo, server.js is at apps/web/server.js
CMD ["node", "apps/web/server.js"]
