# Direction Artistique

## Typographie

| Usage | Police |
|-------|--------|
| Titres / Display | Playfair Display |
| Corps / UI | Poppins |

**Import Google Fonts dans `index.html` :**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Variables CSS dans `index.css` :**
```css
:root {
  --font-display: 'Playfair Display', serif;
  --font-body: 'Poppins', sans-serif;
}
```

---

## Palette de couleurs

| Rôle | Nom | Hex | Aperçu |
|------|-----|-----|--------|
| Primaire | Crème | `#FFF0CC` | fond principal, zones claires |
| Secondaire | Brun-rouge | `#933600` | CTA, accents, titres forts |

**Variables CSS recommandées :**
```css
:root {
  --color-primary: #FFF0CC;
  --color-secondary: #933600;

  /* Dérivées utiles */
  --color-primary-dark: #e6d4a8;    /* hover sur fond clair */
  --color-secondary-light: #b84500; /* hover sur boutons */
  --color-text: #1a1a1a;            /* texte principal sur fond clair */
  --color-text-on-secondary: #fff;  /* texte sur fond brun-rouge */
}
```

---

## Règles d'usage

- **Playfair Display** → titres de pages (`h1`, `h2`), éléments hero
- **Poppins** → tout le reste (nav, paragraphes, boutons, labels)
- **Fond général** → `#FFF0CC` (primaire crème)
- **CTA / boutons principaux** → `#933600` avec texte blanc
- **Liens actifs / hover** → `#933600`
- **Cards** → fond blanc `#fff` ou `#FFF0CC` avec bordure ou ombre légère
