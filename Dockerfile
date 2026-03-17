# ── Stage 1 : build ──────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /build

# Installer les dépendances en premier (cache Docker)
COPY app/package*.json ./
RUN npm ci

# Copier le reste du code et builder
COPY app/ .
RUN npm run build

# ── Stage 2 : serve ──────────────────────────────────────────
FROM nginx:stable-alpine

# Config Nginx pour SPA (toutes les routes → index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fichiers statiques produits par Vite
COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
