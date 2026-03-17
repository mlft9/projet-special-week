# Instructions Design — Page d'accueil (Home)

> Inspiré du modèle de référence fourni, adapté à la DA du projet.

---

## Structure générale de la page

```
┌─────────────────────────────────────────────────────┐
│  BURGER MENU (position fixe, coin haut gauche)       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  HERO SECTION (pleine hauteur viewport)              │
│  ┌─────────────────────┐  ┌────────────────────┐    │
│  │  Contenu texte       │  │   Illustration     │    │
│  │  (côté gauche)       │  │   (côté droit)     │    │
│  └─────────────────────┘  └────────────────────┘    │
│                                                      │
│  Vague de séparation (SVG)                          │
├─────────────────────────────────────────────────────┤
│  SECTION MODULES (3 cards)                          │
└─────────────────────────────────────────────────────┘
```

---

## 1. Burger Menu

Pas de navbar complète — juste un **bouton burger fixe** en haut à gauche qui ouvre un panneau latéral (drawer).

**Comportement :**
- Icône `☰` visible en permanence, position fixe
- Au clic → drawer slide-in depuis la gauche avec les liens de navigation
- Fond du drawer : `#FFF0CC` avec overlay sombre derrière

```css
/* Bouton burger fixe */
.burger-btn {
  position: fixed;
  top: 20px;
  left: 24px;
  z-index: 100;
  background: #fff;
  border: none;
  border-radius: 10px;
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.burger-btn span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-secondary);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

/* Animation croix quand ouvert */
.burger-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger-btn.open span:nth-child(2) { opacity: 0; }
.burger-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Overlay sombre */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 90;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.drawer-overlay.open {
  opacity: 1;
  pointer-events: all;
}

/* Panneau drawer */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background: var(--color-primary);   /* #FFF0CC */
  z-index: 95;
  padding: 80px 32px 40px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drawer.open {
  transform: translateX(0);
}

/* Liens dans le drawer */
.drawer-link {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 1px solid rgba(147, 54, 0, 0.1);
  transition: color 0.2s;
}

.drawer-link:hover {
  color: var(--color-secondary);
}

/* Liens du drawer */
/* - Accueil
   - Comprendre
   - Illustrer
   - Jouer
   - Dashboard */
```

**Composant TSX (logique) :**
```tsx
const [isOpen, setIsOpen] = useState(false)

// Fermer au clic sur overlay ou sur un lien
// Bloquer le scroll du body quand ouvert :
// document.body.style.overflow = isOpen ? 'hidden' : ''
```

---

## 2. Hero Section

**Layout :** 2 colonnes (60% texte / 40% illustration), centré verticalement, `min-height: 100vh`.

**Fond :** `#FFF0CC` avec une **vague SVG** en bas de section (couleur légèrement plus sombre `#e6d4a8`).

### Colonne gauche — Contenu texte

**Hiérarchie :**
1. `h1` — Titre principal (grand, bold)
2. `p` — Sous-titre descriptif
3. Liste numérotée — 3 étapes clés
4. Bouton CTA principal
5. Lien secondaire

```css
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 540px;
}

.hero-content h1 {
  font-family: var(--font-display);    /* Playfair Display */
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  color: #2a1a0e;                      /* brun très foncé pour lisibilité */
  line-height: 1.15;
}

.hero-content p {
  font-family: var(--font-body);       /* Poppins */
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}
```

**Card des étapes (fond blanc, coins arrondis, ombre légère) :**

```css
.steps-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 1.5px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
```

**Boutons :**

```css
/* CTA principal */
.btn-primary {
  background: var(--color-secondary);   /* #933600 */
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 16px 32px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s, transform 0.15s;
}

.btn-primary:hover {
  background: var(--color-secondary-light);   /* #b84500 */
  transform: translateY(-2px);
}

/* Lien secondaire */
.btn-secondary-link {
  background: transparent;
  border: 1.5px solid #ccc;
  border-radius: 999px;
  padding: 14px 32px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s;
}

.btn-secondary-link:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}
```

### Colonne droite — Illustration

- Utiliser une illustration **flat design** (style vecteur, personnages stylisés)
- Fond de l'illustration : transparent ou légèrement crème
- Taille : `100%` de la colonne, `max-width: 480px`
- Alignée verticalement au centre

```css
.hero-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-illustration img {
  width: 100%;
  max-width: 480px;
  object-fit: contain;
}
```

---

## 3. Vague de séparation (SVG)

Entre le hero et la section modules, une forme organique pour la transition.

```css
.wave-divider {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  margin-top: -2px;
}

.wave-divider svg {
  display: block;
  fill: #fff;           /* blanc si la section suivante est blanche */
}
```

---

## 4. Section Modules (3 cards)

3 cards côte à côte présentant les 3 modules principaux : **Comprendre**, **Illustrer**, **Jouer**.

```css
.modules-section {
  background: #fff;
  padding: 80px 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.module-card {
  background: var(--color-primary);    /* #FFF0CC */
  border-radius: 20px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.module-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(147, 54, 0, 0.12);
}

.module-card h3 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-secondary);
}

.module-card p {
  font-family: var(--font-body);
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}
```

---

## 5. Responsive (Mobile)

```css
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    padding: 100px 24px 48px;
    text-align: center;
  }

  .hero-illustration {
    display: none;  /* masquée sur mobile */
  }

  .modules-section {
    grid-template-columns: 1fr;
    padding: 48px 24px;
  }

  .navbar {
    padding: 0 24px;
  }
}
```

---

## Résumé visuel

| Élément | Couleur fond | Couleur texte | Police |
|---------|-------------|---------------|--------|
| Navbar | Transparent → `#FFF0CC` | `#1a1a1a` | Poppins 500 |
| Hero | `#FFF0CC` | `#2a1a0e` (titre) / `#555` (sous-titre) | Playfair (h1) + Poppins (reste) |
| Card étapes | `#fff` | `#1a1a1a` | Poppins 500 |
| CTA bouton | `#933600` | `#fff` | Poppins 600 |
| Numéros étapes | `#FFF0CC` | `#933600` | Poppins 600 |
| Module cards | `#FFF0CC` | `#933600` (titre) / `#555` (texte) | Playfair (h3) + Poppins (p) |
