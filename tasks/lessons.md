# Lessons apprises

## 1. Vérifier les erreurs TS avant un build Docker
Avant de lancer un `docker compose up --build`, toujours vérifier qu'il n'y a pas d'erreurs TypeScript avec `tsc --noEmit` dans `app/`.
Un import inutilisé (`Link` dans Home.tsx) a fait échouer le build en CI/Docker alors que ça compilait en dev (Vite ignore les erreurs TS).

## 2. `position: fixed` cassé par les transforms CSS des parents
Un modal avec `position: fixed` rendu à l'intérieur d'un élément qui a une transform CSS (ex: `hover:-translate-y-0.5`) est contraint à cet ancêtre.
**Fix systématique** : toujours utiliser `createPortal(…, document.body)` pour les modals/overlays.

## 3. UX zoom : clic sur l'image, pas un bouton
Quand l'objectif est d'agrandir une image au clic, rendre l'image elle-même cliquable (`cursor: zoom-in`) plutôt qu'ajouter un bouton séparé. Plus naturel et moins de bruit visuel.

## 4. React Router ne scroll pas en haut automatiquement
À chaque navigation, la position de scroll est conservée. Toujours ajouter un `useEffect(() => window.scrollTo(0,0), [location.pathname])` dans `App.tsx` dès le début du projet.

## 5. Respecter le CLAUDE.md
- Utiliser le **plan mode** pour toute tâche non-triviale (3+ étapes)
- Écrire le plan dans `tasks/todo.md` et le valider avant d'implémenter
- Mettre à jour ce fichier après chaque correction utilisateur
- Déléguer l'exploration de code aux subagents pour garder le contexte propre
