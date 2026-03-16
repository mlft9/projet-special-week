# Jour 1 - Les Bases

## Stack technique confirmée

- **Front :** React 19 + TypeScript (TSX) + Vite
- **Routing :** React Router
- **Backend :** Node.js + Express + TypeScript (Jour 3) dans `backend/`
- **Stockage :** JSON local (Jour 1-2) puis SQLite via backend (Jour 3)
- **Avantage :** TypeScript sur toute la stack : types partagés entre front et back

---

## Matin - UX & Architecture (3h)

**Persona principal : le collégien/lycéen (13-18 ans)**
- Attention courte : contenus courts, visuels, gamifiés
- Habitué aux réseaux sociaux : reproduire les codes visuels (style post Instagram/Twitter fictif)
- Motivé par le score et la compétition : quiz avec points, médailles

**Parcours utilisateur web :**
Accueil --> Comprendre (pages péda) --> Illustrer (galerie) --> Jouer (quiz + mini-jeu) --> Score / Dashboard

**Parcours mobile :**
```
Accueil --> Quiz rapide --> Mini-jeu tactile --> Règles d'or
```

---

### 2. Maquettes Figma

Créer des maquettes rapides (pas besoin d'être parfait) pour **Web** et **Mobile**.

**Direction artistique (DA confirmée) :**
- Primaire : `#FFF0CC` (crème) — fond général
- Secondaire : `#933600` (brun-rouge) — CTA, accents, titres forts
- Fonts : **Playfair Display** (titres) + **Poppins** (corps/UI)
- Détail complet → `analyse/design.md`

**Pages à maquetter (Web) :**
- Page d'accueil (hero visuel, navigation claire vers les 3 modules)
- Page "Découvrir" (layout pédagogique avec sections)
- Page "Ressource" (galerie de cards avec exemples fictifs)
- Page "Jouer" (quiz interactif + mini-jeu)
- Dashboard (scores, progression)

---

## Après-midi - Setup Technique (3h)

### 3. Structure du projet cible

```
Projet-cap/
├── app/                        ← Front React TSX (déjà là)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Learn.tsx       ← "Comprendre"
│   │   │   ├── Gallery.tsx     ← "Illustrer"
│   │   │   ├── Play.tsx        ← "Jouer"
│   │   │   └── Dashboard.tsx
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── QuizCard.tsx
│   │   │   ├── ExampleCard.tsx
│   │   │   └── ScoreBadge.tsx
│   │   ├── types/
│   │   │   └── index.ts        ← Types TypeScript partagés
│   │   └── data/               ← Fichiers JSON locaux
│   │       ├── quiz.json
│   │       └── examples.json
├── backend/                    ← À créer Jour 3 (Node.js + Express + TypeScript)
├── analyse/                    ← Ce dossier
└── docker/                     ← À créer Jour 4
```

### 4. Package à installer

```bash
cd app
npm install react-router-dom
npm install @types/react-router-dom
npm install chart.js
npm install react-chartjs-2
```

## Répartition des tâches en équipe (4 personnes)

| Personne | Matin | Après-midi |
|----------|-------|------------|
| Simon (B1) |  Mise en place du figma | Finition du figma |
| Adam (B1) | Aide Figma + Veille technologique | Validation du figma + Choix des palettes, etc... |
| Ridwan (B2) | Rédaction quiz.json (10 questions) | Intégration quiz.json x |
| Maxime (B2) | Mise en place de la structure de l'application | Création des premières pages. |

---

## Objectifs de fin de Jour 1

- [ ] Maquettes Figma Web + Mobile partagées avec l'équipe
- [x] `react-router` installé
- [ ] Routing en place, toutes les routes accessibles
- [ ] Navbar fonctionnelle avec liens vers chaque page
- [ ] `quiz.json` rempli avec 10 questions
- [ ] `examples.json` rempli avec 5 exemples fictifs
- [ ] Chaque page affiche au moins un titre
- [ ] `npm run dev` tourne sans erreur

---

## Pièges à éviter

- Ne pas passer trop de temps sur le CSS Jour 1 - le style vient Jour 2
- Ne pas commencer le backend Jour 1 - on n'en a pas encore besoin
- Ne pas chercher de vraies images pour les exemples - créer des placeholders fictifs avec du texte
- Garder les exemples **100% neutres et non sensibles**
