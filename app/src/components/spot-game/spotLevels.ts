export interface HotspotZone {
  id: string
  x: number        // % depuis la gauche de l'image (0-100)
  y: number        // % depuis le haut (0-100)
  radius: number   // rayon de détection en % de la largeur de l'image
  label: string
  description: string
}

export interface SpotLevel {
  id: number
  image: string    // chemin public, ex: '/assets/spot-game/image1.jpg'
  title: string
  hotspots: HotspotZone[]
  maxClicks: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Niveaux — coordonnées à ajuster une fois les images ajoutées dans
// app/public/assets/spot-game/
// ─────────────────────────────────────────────────────────────────────────────

export const SPOT_LEVELS: SpotLevel[] = [
  {
    id: 1,
    image: '/assets/spot-game/image1.webp',
    title: 'Niveau 1',
    maxClicks: 3,
    hotspots: [
      {
        id: 'h1',
        x: 41.7,
        y: 44.3,
        radius: 5,
        label: 'Main dédoublée',
        description: "L'IA a généré deux versions superposées de la même main. C'est l'un des artefacts les plus fréquents : les modèles peinent à comprendre l'anatomie des extrémités.",
      },
    ],
  },
  {
    id: 2,
    image: '/assets/spot-game/image2.webp',
    title: 'Niveau 2',
    maxClicks: 3,
    hotspots: [
      {
        id: 'h1',
        x: 33.1,
        y: 25.6,
        radius: 5,
        label: 'Texte illisible sur l\'affiche',
        description: "Les IA génèrent des formes qui ressemblent à des lettres mais ne forment aucun mot réel. Le texte sur l'affiche à côté de la fenêtre est une suite de symboles incohérents — un indice classique d'image générée.",
      },
    ],
  },
  {
    id: 3,
    image: '/assets/spot-game/image3.webp',
    title: 'Niveau 3',
    maxClicks: 3,
    hotspots: [
      {
        id: 'h1',
        x: 69.2,
        y: 43.6,
        radius: 5,
        label: 'Écriture déformée sur le tracteur',
        description: "Les inscriptions sur la carrosserie du tracteur sont illisibles ou forment des lettres impossibles. Les IA ne savent pas reproduire fidèlement des marques ou des textes, ce qui trahit systématiquement leur origine.",
      },
    ],
  },
  {
    id: 4,
    image: '/assets/spot-game/image4.webp',
    title: 'Niveau 4',
    maxClicks: 3,
    hotspots: [
      {
        id: 'h1',
        x: 47.4,
        y: 81.7,
        radius: 8,
        label: 'Pas sans trace au sol',
        description: "La chaussure gauche de la personne ne laisse aucune trace ni empreinte sur le sol après son pas. Une image réelle montrerait une légère marque, une déformation du sol ou une ombre cohérente.",
      },
    ],
  },
  {
    id: 5,
    image: '/assets/spot-game/image5.webp',
    title: 'Niveau 5',
    maxClicks: 3,
    hotspots: [
      {
        id: 'h2',
        x: 32.1,
        y: 73.2,
        radius: 5,
        label: 'Verre déformé par la bouteille',
        description: "Le verre posé devant l'assiette est visuellement déformé par la bouteille en arrière-plan. La réfraction est rendue de façon incohérente par l'IA, qui ne maîtrise pas correctement les lois de l'optique.",
      },
    ],
  },
]
