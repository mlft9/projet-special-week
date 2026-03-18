# ── Stage 1 : build TypeScript ────────────────────────────────
FROM node:22-alpine AS builder

# better-sqlite3 nécessite python3 + make + g++ pour compiler les bindings natifs
RUN apk add --no-cache python3 make g++

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# ── Stage 2 : runtime ─────────────────────────────────────────
FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /build/dist ./dist

RUN mkdir -p data

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Seed puis démarrage
CMD ["node", "dist/index.js"]
