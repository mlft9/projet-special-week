# E-alertés — Détecte la désinformation par l'IA

Plateforme éducative et gamifiée pour apprendre à repérer la désinformation et les contenus générés par l'IA.

---

## Fonctionnalités

- **Comprendre** — cours interactifs sur les deepfakes, hallucinations IA et fake news
- **Jouer** — quiz de désinformation avec score et certificat PDF
- **Repérer** — mini-jeu de détection de zones générées par IA dans des images
- **Classement** — leaderboard des meilleurs scores (quiz + repérer)
- **Signaler** — formulaire de signalement d'articles ou sites suspects
- **Chatbot** — assistant pédagogique par mots-clés intégré à toutes les pages
- **Extension navigateur** — marque les sites signalés directement dans le navigateur
- **Admin** — dashboard de gestion des signalements

---

## Stack technique

| Couche | Technologie |
|--------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Animations | GSAP |
| Graphiques | Chart.js / react-chartjs-2 |
| Backend | Express.js, TypeScript |
| Stockage | Fichiers JSON (pas de base de données) |
| Déploiement | Docker, Docker Compose, Nginx |
| PWA | Service Worker + Web Manifest |

---

## Structure du projet

```
Projet-cap/
├── app/                  # Frontend React + Vite
│   ├── src/
│   │   ├── pages/        # Composants de routes
│   │   ├── components/   # Composants réutilisables
│   │   ├── data/         # Données statiques (quiz, exemples)
│   │   └── utils/        # Génération de certificat PDF
│   └── public/           # Assets statiques + PWA manifest
├── backend/              # API Express.js
│   └── src/
│       ├── routes/       # Endpoints API
│       ├── db/           # Accès aux données JSON
│       └── data/         # Données persistées (leaderboard, reports)
├── extension/            # Extension navigateur (Chrome)
├── nginx.conf            # Config Nginx (SPA + proxy API)
├── Dockerfile            # Build frontend multi-stage
└── docker-compose.yml    # Orchestration frontend + backend
```

---

## Pages et routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Accueil | Landing page et parcours utilisateur |
| `/comprendre` | Comprendre | Cours et exemples interactifs |
| `/jouer` | Jouer | Quiz de désinformation |
| `/reperer` | Repérer | Jeu de détection d'images IA |
| `/classement` | Classement | Leaderboard Top 10 |
| `/signaler` | Signaler | Signalement de contenus douteux |
| `/admin` | Admin | Dashboard d'administration |
| `/mentions-legales` | Mentions légales | Informations légales |
| `/politique-confidentialite` | Politique de confidentialité | RGPD et données |

---

## API

| Endpoint | Méthode | Description | Limite |
|----------|---------|-------------|--------|
| `/api/chat` | POST | Réponses du chatbot | 30 req/min |
| `/api/quiz` | GET | Questions du quiz | — |
| `/api/examples` | GET | Exemples de désinformation | — |
| `/api/reports` | GET / POST | Signalements | 5 req/h |
| `/api/leaderboard` | GET / POST | Classement | 10 POST/15min |
| `/api/admin/login` | POST | Authentification admin | 5 req/15min |
| `/api/health` | GET | État du serveur | — |

---

## Lancer le projet

### Développement

```bash
# Frontend
cd app
npm install
npm run dev       # http://localhost:5173

# Backend (dans un autre terminal)
cd backend
npm install
cp .env.example .env   # remplir les variables
npm run dev       # http://localhost:3001
```

### Production (Docker)

```bash
docker-compose up --build
```

L'application est accessible sur le port `5000`.

---

## Variables d'environnement

Copier `backend/.env.example` en `backend/.env` :

```env
ADMIN_USER=       # identifiant admin
ADMIN_PASSWORD=   # mot de passe admin
ADMIN_SECRET=     # secret JWT / session
```

---

## Extension navigateur

Le dossier `extension/` contient une extension Chrome qui marque visuellement les sites présents dans `flagged-sites.json`.

Installation manuelle :
1. Chrome → `chrome://extensions/`
2. Activer le **mode développeur**
3. **Charger l'extension non empaquetée** → sélectionner le dossier `extension/`
