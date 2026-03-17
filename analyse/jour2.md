# Jour 2 — Intégration visuelle & Fonctionnalités

## Changements d'architecture vs Jour 1

- Pages **"Comprendre"** + **"Galerie"** → fusionnées en une seule page `/comprendre`
- **"Dashboard"** → renommé **"Classement"** → route `/classement`
- Route `/galerie` supprimée
- Nouveau flux : fin de quiz → **modal saisie prénom** → ajout au classement public (localStorage en J2, backend en J3)

### Nouvelles routes

| Route | Page | Responsable |
|---|---|---|
| `/` | Home | Adam |
| `/comprendre` | Comprendre (Learn + Galerie fusionnées) | Ridwan |
| `/jouer` | Quiz interactif | Maxime |
| `/classement` | Classement public | Maxime |

---

## Répartition des tâches

### Maxime (B2) — Quiz + Classement

**Matin :**
- `QuizCard.tsx` fonctionnel : question, options cliquables, feedback visuel (vert/rouge) après réponse
- Logique quiz dans `Play.tsx` : navigation Q1→Q10, calcul score, affichage explication après chaque réponse
- Support des questions avec images A/B (Q8 villa, Q9 donut, Q10 œil)

**Après-midi :**
- Écran de résultats : score final, bouton rejouer
- Modal saisie prénom après le quiz
- Sauvegarder `{ name, score, total, date }` dans localStorage
- Page `/classement` : tableau top 10 trié par score décroissant

### Ridwan (B2) — Page Comprendre

**Matin :**
- Sections pédagogiques dans `Learn.tsx` (renommée Comprendre) :
  - "Qu'est-ce qu'une IA ?"
  - "Les hallucinations"
  - "Les deepfakes"
- Cards de contenu avec DA (Poppins / Playfair Display, couleurs #FFF0CC / #933600)

**Après-midi :**
- Intégrer la galerie d'exemples fictifs en bas de la page (grille de `ExampleCard`)
- Remplir/valider `examples.json` (5 exemples : texte, image, post fictif)
- Filtres visuels par type si le temps le permet (texte / image / post)

### Adam (B1) — Homepage

**Matin :**
- Variables CSS globales dans `index.css` (couleurs, fonts, espacements)
- Section hero : 2 colonnes (texte + illustration), bouton CTA "C'est parti !"

**Après-midi :**
- Section 3 modules (cards vers Comprendre, Jouer, Classement)
- BurgerMenu : animation d'ouverture, overlay, fermeture au clic extérieur
- Responsive mobile sur la homepage

### Simon (B1)
- Journée : Rédaction de nouvelles questions

---

## Direction artistique (rappel)

```css
--cream:       #FFF0CC;   /* fond général */
--brown:       #933600;   /* CTA, accents, titres forts */
--brown-title: #2a1a0e;   /* titres h1 */
--text-muted:  #6b5c44;   /* sous-titres */

--font-display: 'Playfair Display', serif;  /* h1, h2 */
--font-body:    'Poppins', sans-serif;      /* tout le reste */
```

---

## Fichiers à modifier

| Fichier | Qui | Quoi |
|---|---|---|
| `app/src/App.tsx` | Maxime | Mettre à jour les routes |
| `app/src/index.css` | Adam | Variables CSS globales |
| `app/src/pages/Home.tsx` | Adam | Hero + modules |
| `app/src/pages/Play.tsx` | Maxime | Quiz interactif |
| `app/src/components/QuizCard.tsx` | Maxime | Composant question |
| `app/src/pages/Dashboard.tsx` → `Classement.tsx` | Maxime | Leaderboard localStorage |
| `app/src/pages/Learn.tsx` | Ridwan | Page Comprendre fusionnée |
| `app/src/data/examples.json` | Ridwan | 5 exemples fictifs |
| `app/src/types/index.ts` | Maxime | Ajouter `LeaderboardEntry` |

---

## Pièges à éviter

- Ne pas commencer le backend (c'est le J3) — tout en localStorage pour l'instant
- Ne pas bloquer sur le CSS parfait : fonctionnel d'abord, polish ensuite
- Les images Q8/Q9/Q10 sont dans `assets/quiz/` — les importer directement (pas de chemin en string)
- Garder la page `Gallery.tsx` vide mais ne pas la supprimer (le routing peut rester, on la réutilisera peut-être)

---

## Checklist fin de Jour 2

- [ ] Homepage avec hero + 3 modules, DA respectée (Adam)
- [ ] BurgerMenu animé, liens vers les 4 pages (Adam)
- [ ] Quiz jouable de bout en bout — 10 questions + images Q8/Q9/Q10 (Maxime)
- [ ] Modal fin de quiz → saisie prénom → enregistrement localStorage (Maxime)
- [ ] Page Classement avec top 10 trié par score (Maxime)
- [ ] Page Comprendre : 3 sections péda + galerie 5 exemples (Ridwan)
- [ ] Responsive mobile sur toutes les pages
- [ ] `npm run dev` sans erreur
