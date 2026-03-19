# E-alertés — Documentation API

Base URL production : `https://e-alerte.com/api`
Base URL développement : `http://localhost:3001/api`

---

## Authentification

Les routes admin sont protégées par un token Bearer (session en mémoire, expiration 8h).

```
Authorization: Bearer <token>
```

---

## Routes publiques

### Quiz

#### `GET /quiz`
Retourne toutes les questions du quiz.

**Réponse `200`**
```json
[
  {
    "id": 1,
    "question": "Qu'est-ce qu'une hallucination d'IA ?",
    "options": ["...", "...", "...", "..."],
    "correct": 2,
    "explanation": "..."
  }
]
```

---

### Exemples pédagogiques

#### `GET /examples`
Retourne la liste des exemples de la galerie pédagogique.

**Réponse `200`**
```json
[
  {
    "id": 1,
    "type": "post",
    "title": "...",
    "content": "...",
    "clues": ["...", "..."],
    "explanation": "...",
    "isFake": true
  }
]
```

---

### Classement

#### `GET /leaderboard/quiz`
Top 20 du classement quiz, trié par score décroissant.

**Réponse `200`**
```json
[
  {
    "id": "uuid",
    "name": "Alice",
    "score": 13,
    "total": 14,
    "date": "2026-03-19T12:00:00.000Z"
  }
]
```

#### `POST /leaderboard/quiz`
Ajoute une entrée au classement quiz.

**Rate limit :** 10 requêtes / 15 min par IP

**Corps**
```json
{
  "name": "Alice",
  "score": 13,
  "total": 14
}
```

**Contraintes**
- `name` : chaîne non vide, max 30 caractères
- `score` : entier entre 0 et 14
- `total` : doit être exactement `14`

**Réponse `201`**
```json
{
  "id": "uuid",
  "name": "Alice",
  "score": 13,
  "total": 14,
  "date": "2026-03-19T12:00:00.000Z"
}
```

**Erreurs**
| Code | Message |
|------|---------|
| `400` | `Nom invalide` |
| `400` | `Score invalide` |
| `400` | `Total invalide` |
| `429` | Trop de requêtes |

---

#### `GET /leaderboard/spot`
Top 20 du classement Spot, trié par score décroissant.

**Réponse `200`**
```json
[
  {
    "id": "uuid",
    "name": "Bob",
    "score": 98,
    "maxScore": 125,
    "date": "19/03/2026"
  }
]
```

#### `POST /leaderboard/spot`
Ajoute une entrée au classement Spot.

**Rate limit :** 10 requêtes / 15 min par IP

**Corps**
```json
{
  "name": "Bob",
  "score": 98,
  "maxScore": 125
}
```

**Contraintes**
- `name` : chaîne non vide, max 30 caractères
- `score` : entier entre 0 et 125
- `maxScore` : doit être exactement `125`

**Réponse `201`** — même structure que la requête avec `id` et `date` ajoutés.

---

### Signalements

#### `GET /reports`
Retourne le store complet des signalements.

**Réponse `200`**
```json
{
  "schemaVersion": "1.0.0",
  "updatedAt": "2026-03-19T12:00:00.000Z",
  "reports": [...]
}
```

#### `POST /reports`
Soumet un nouveau signalement.

**Rate limit :** 5 requêtes / heure par IP

**Corps**
```json
{
  "siteName": "exemple.com",
  "articleTitle": "Titre de l'article suspect",
  "articleUrl": "https://exemple.com/article",
  "reportReason": "Ce texte semble entièrement généré par IA sans source.",
  "aiUsageType": "suspected",
  "reporterName": "Alice",
  "evidenceNotes": "Tournures de phrases typiques de GPT-4."
}
```

**Champs**
| Champ | Requis | Type | Contraintes |
|-------|--------|------|-------------|
| `siteName` | ✅ | string | max 120 caractères |
| `articleTitle` | ✅ | string | max 180 caractères |
| `articleUrl` | ✅ | string | URL http/https valide |
| `reportReason` | ✅ | string | max 500 caractères |
| `aiUsageType` | ✅ | enum | `suspected` \| `declared` \| `generated` \| `unknown` |
| `reporterName` | ❌ | string | max 80 caractères |
| `evidenceNotes` | ❌ | string | max 1000 caractères |

**Réponse `201`**
```json
{
  "report": {
    "id": "uuid",
    "submittedAt": "2026-03-19T12:00:00.000Z",
    "siteName": "exemple.com",
    "articleTitle": "...",
    "articleUrl": "https://exemple.com/article",
    "reportReason": "...",
    "aiUsageType": "suspected",
    "reporterName": "Alice",
    "evidenceNotes": "...",
    "status": "pending"
  }
}
```

---

### Chatbot

#### `POST /chat`
Envoie un message au chatbot et reçoit une réponse.

**Rate limit :** 30 requêtes / minute par IP

**Corps**
```json
{ "message": "C'est quoi une deepfake ?" }
```

**Réponse `200`**
```json
{ "response": "Une deepfake est une vidéo ou image manipulée par IA..." }
```

---

### Santé

#### `GET /health`
Vérifie que le backend est opérationnel.

**Réponse `200`**
```json
{ "status": "ok", "timestamp": "2026-03-19T12:00:00.000Z" }
```

---

## Routes admin (authentification requise)

### `POST /admin/login`
Authentifie un administrateur.

**Rate limit :** 5 tentatives / 15 min par IP

**Corps**
```json
{ "username": "admin", "password": "motdepasse" }
```

**Réponse `200`**
```json
{ "token": "abc123..." }
```

**Erreur `401`**
```json
{ "error": "Identifiants incorrects" }
```

---

### `POST /admin/logout`
Invalide la session en cours.

**Réponse `200`**
```json
{ "ok": true }
```

---

### `GET /admin/stats`
Retourne les statistiques globales du site.

**Réponse `200`**
```json
{
  "quizPlays": 42,
  "spotPlays": 18,
  "reportsSubmitted": 7,
  "chatMessages": 134,
  "quizEntriesInLeaderboard": 30,
  "spotEntriesInLeaderboard": 12,
  "pendingReports": 5,
  "avgQuizScore": 9.4,
  "avgSpotScore": 87.2,
  "bestQuizScore": 14,
  "bestSpotScore": 125
}
```

---

### `GET /admin/leaderboard`
Retourne l'intégralité des classements (quiz + spot).

**Réponse `200`**
```json
{
  "quiz": [ { "id": "uuid", "name": "...", "score": 13, "total": 14, "date": "..." } ],
  "spot": [ { "id": "uuid", "name": "...", "score": 98, "maxScore": 125, "date": "..." } ]
}
```

---

### `GET /admin/reports`
Retourne tous les signalements.

**Réponse `200`** — tableau de `ReportEntry`

---

### `DELETE /admin/leaderboard/quiz/:id`
Supprime une entrée du classement quiz.

**Réponse `200`** `{ "ok": true }`
**Erreur `404`** `{ "error": "Entrée introuvable" }`

---

### `DELETE /admin/leaderboard/spot/:id`
Supprime une entrée du classement Spot.

**Réponse `200`** `{ "ok": true }`
**Erreur `404`** `{ "error": "Entrée introuvable" }`

---

### `DELETE /admin/reports/:id`
Supprime un signalement.

**Réponse `200`** `{ "ok": true }`
**Erreur `404`** `{ "error": "Rapport introuvable" }`

---

## Codes d'erreur communs

| Code | Signification |
|------|--------------|
| `400` | Données invalides (voir message d'erreur) |
| `401` | Non authentifié ou session expirée |
| `404` | Ressource introuvable |
| `429` | Trop de requêtes (rate limit atteint) |

---

## Schéma de données

```
data/
├── leaderboard.json   { quiz: QuizEntry[], spot: SpotEntry[] }
├── reports.json       { schemaVersion, updatedAt, reports: ReportEntry[] }
└── stats.json         { quizPlays, spotPlays, reportsSubmitted, chatMessages }
```
