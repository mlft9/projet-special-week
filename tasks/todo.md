# TODO - Graphiques Admin (Chart.js)

- [x] Analyser les données disponibles (stats, leaderboard, signalements)
- [x] Ajouter plusieurs graphiques utiles dans la page admin
- [x] Ajuster le layout CSS pour bien afficher les graphes sur desktop/mobile
- [x] Vérifier la compilation front (`npm run build` dans `app/`)

## Review
- Graphiques ajoutés: activité globale, distribution des scores quiz, top 10 quiz, statuts des signalements, types de signalements.
- Affichage vide géré proprement quand il n'y a pas encore de données.
- Validation: `npm run build` dans `app/` OK (TypeScript + Vite), sans erreur bloquante.

## Historique
- Fix backend env admin: fallback `.env` puis `env`, validation des variables admin, démarrage backend vérifié.
