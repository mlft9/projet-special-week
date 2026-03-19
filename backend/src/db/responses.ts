export interface ResponseRow {
  keywords: string[]
  response: string
  category: string
}

export const responses: ResponseRow[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir'],
    response: "Salut 👋 Je suis l'assistant E-alertés. Mon objectif est de t'aider à comprendre la désinformation et à apprendre des réflexes utiles. Tu peux me demander : \"c'est quoi un deepfake ?\", \"comment vérifier une source ?\" ou \"comment éviter de partager une fake news ?\".",
    category: 'navigation',
  },
  {
    keywords: ['deepfake', 'visage', 'video truquee', 'visage remplace', 'montage ia', 'faux visage'],
    response: "Un deepfake est un contenu (vidéo, image ou audio) modifié par IA pour faire croire qu'une personne a dit ou fait quelque chose qu'elle n'a jamais dit ou fait. Le but est souvent de manipuler, humilier ou tromper. Retien ce réflexe : plus le contenu te choque, plus il faut vérifier avant d'y croire.",
    category: 'deepfake',
  },
  {
    keywords: ['repérer deepfake', 'detecter deepfake', 'reconnaitre deepfake', 'indices deepfake', 'identifier deepfake'],
    response: "Pour repérer un deepfake, utilise la règle des 4 détails : (1) lèvres et voix pas synchronisées, (2) yeux/oreilles/dents étranges, (3) contours flous autour du visage ou des cheveux, (4) lumière incohérente. Ensuite, compare avec une source fiable (chaîne officielle, média reconnu).",
    category: 'deepfake',
  },
  {
    keywords: ['hallucination', 'ia invente', 'info inventee', 'chatbot invente', 'erreur ia'],
    response: "Une hallucination d'IA, c'est quand le chatbot invente une réponse plausible mais fausse (date, citation, source, chiffre...). Ce n'est pas forcément un mensonge volontaire : il prédit du texte probable. Règle d'or : quand une info compte vraiment, vérifie-la ailleurs.",
    category: 'hallucination',
  },
  {
    keywords: ['chatgpt', 'gpt', 'claude', 'gemini', 'chatbot fiable', 'source fiable ia'],
    response: "ChatGPT, Gemini ou Claude peuvent très bien expliquer des notions, mais ils ne garantissent pas la vérité à 100%. Utilise-les pour apprendre et préparer des idées, puis valide avec des sources fiables (sites officiels, médias reconnus, articles vérifiables).",
    category: 'hallucination',
  },
  {
    keywords: ['comment fonctionne ia', 'ia generative', 'fonctionnement ia', 'intelligence artificielle generative'],
    response: "Une IA générative apprend des modèles à partir de beaucoup d'exemples (textes, images, sons). Ensuite, elle prédit ce qui est le plus probable pour répondre. Elle peut produire des résultats impressionnants, mais elle ne comprend pas le monde comme un humain : c'est pour ça qu'elle peut se tromper.",
    category: 'ia-generative',
  },
  {
    keywords: ['image ia', 'photo ia', 'midjourney', 'dall-e', 'stable diffusion', 'image generee'],
    response: "Pour détecter une image générée par IA, regarde les mains, les reflets, les textes dans l'image et les petits détails répétitifs. Si quelque chose semble \"presque normal\", prends une pause et vérifie avec une recherche d'image inversée. Combine ton regard critique + un outil : c'est la meilleure méthode.",
    category: 'ia-generative',
  },
  {
    keywords: ['texte ia', 'texte genere', 'article genere', 'post genere', 'reconnaitre texte ia'],
    response: "Un texte IA peut être très fluide mais aussi vague, répétitif, et sans exemples précis vérifiables. Cherche les affirmations sans source, les tournures qui se répètent et les erreurs de contexte. Bon réflexe scolaire : demande \"quelle est la source exacte ?\".",
    category: 'ia-generative',
  },
  {
    keywords: ['verifier source', 'source fiable', 'source credible', 'methode verification', 'verifier information'],
    response: "Utilise la méthode SIFT : Stop (je fais une pause), Investigate (je regarde qui publie), Find better coverage (je compare avec d'autres médias), Trace (je remonte à la source d'origine). C'est simple, rapide, et super utile pour éviter de tomber dans le piège.",
    category: 'verification',
  },
  {
    keywords: ['fact-check', 'verification info', 'hoax', 'outil verification', 'site fact checking'],
    response: "Pour vérifier une info en France, regarde AFP Factuel, Les Décodeurs (Le Monde), CheckNews (Libération) ou Vrai ou Faux (Franceinfo). Compare toujours plusieurs sources : un seul site ne suffit pas. Pour les images, complète avec TinEye ou Google Images inversée.",
    category: 'verification',
  },
  {
    keywords: ['recherche image inversee', 'photo vraie fausse', 'image inversee', 'verifier photo'],
    response: "La recherche d'image inversée sert à retrouver l'origine d'une photo. Si tu vois la même image publiée il y a des années ou dans un autre pays, c'est peut-être une manipulation de contexte. En 1 minute, tu peux éviter de relayer une intox.",
    category: 'verification',
  },
  {
    keywords: ['fake news', 'desinformation', 'propagande', 'manipulation information', 'fausse information'],
    response: "Les fake news fonctionnent car elles déclenchent des émotions fortes (peur, colère, surprise). Quand on réagit vite, on vérifie moins. Le bon réflexe jeune journaliste : respirer 10 secondes, puis vérifier la source avant de partager.",
    category: 'fake-news',
  },
  {
    keywords: ['partager info', 'repost', 'viral', 'diffuser info', 'reseaux sociaux'],
    response: "Avant de repartager, fais le test des 3 questions : qui est la source ? est-ce confirmé ailleurs ? est-ce factuel ou juste choquant ? Si une réponse manque, attends. Ne pas partager une info douteuse, c'est déjà protéger les autres.",
    category: 'fake-news',
  },
  {
    keywords: ['clickbait', 'titre choc', 'titre piege', 'sensationnel', 'putaclic'],
    response: "Un titre clickbait attire le clic avec du spectaculaire, mais le contenu est souvent moins solide. Indice simple : si le titre promet énormément sans préciser les faits, méfiance. Lis l'article en entier avant de te faire un avis.",
    category: 'fake-news',
  },
  {
    keywords: ['quiz', 'jouer', 'jeu', 'tester', 'score', 'classement', 'partie'],
    response: "Si tu veux progresser vite, va dans Jouer : tu t'entraînes sur des cas concrets, tu comprends tes erreurs et tu développes de vrais réflexes. Le classement te permet de suivre ta progression. Objectif : apprendre en pratiquant.",
    category: 'quiz',
  },
  {
    keywords: ['site', 'e alertes', 'modules', 'pages', 'comment utiliser site', 'parcours'],
    response: "Sur E-alertés, ton parcours est simple : Comprendre (apprendre les bases), Jouer (t'entraîner), Classement (mesurer tes progrès). Si tu débutes, commence par Comprendre, puis enchaîne avec Jouer pour mettre en pratique.",
    category: 'navigation',
  },
  {
    keywords: ['aide', 'help', 'question', 'problème', 'besoin aide', 'je comprends pas'],
    response: "Je peux t'aider sur 3 choses : comprendre un concept (deepfake, hallucination), apprendre une méthode (vérifier une info), ou t'orienter dans le site. Pose une question courte et précise, et je te répondrai étape par étape.",
    category: 'navigation',
  },
  {
    keywords: ['merci', 'super', 'cool', 'bien', 'génial', 'parfait', 'top', 'nickel'],
    response: "Avec plaisir 😊 Si tu veux continuer à apprendre, enchaîne avec une question pratique comme : \"comment vérifier cette image ?\" ou \"comment repérer une source peu fiable ?\".",
    category: 'navigation',
  },
  {
    keywords: ['gemini', 'claude', 'bard', 'chatgpt', 'quelles ia', 'noms ia'],
    response: "Les IA les plus connues sont ChatGPT, Gemini et Claude. Elles peuvent aider à apprendre, résumer ou brainstormer, mais elles peuvent aussi donner des infos inexactes. Utilise-les comme un point de départ, pas comme preuve finale.",
    category: 'ia-generative',
  },
  {
    keywords: ['harcelement', 'cyberharcelement', 'victime harcelement', 'aide harcelement', '3018'],
    response: "Le cyberharcèlement est grave et tu n'as pas à gérer ça seul. En France, tu peux contacter le 3018 et consulter cyberharcelement.fr. Garde des preuves (captures), bloque/signale les comptes, et parle vite à un adulte de confiance.",
    category: 'cyberharcelement',
  },
  {
    keywords: ['rgpd', 'données', 'personnelles', 'protection', 'vie privée', 'loi', 'européenne'],
    response: "Le RGPD protège tes données personnelles dans l'Union européenne. Tu as des droits : savoir quelles données sont collectées, corriger une erreur et demander la suppression dans certains cas. En pratique, ça t'aide à mieux contrôler ta vie privée en ligne.",
    category: 'rgpd',
  },
  {
    keywords: ['but', 'mission', 'objectif', 'pourquoi', 'raison', 'intention'],
    response: "La mission d'E-alertés, c'est la transmission de connaissances utiles aux jeunes : comprendre, pratiquer, puis agir avec esprit critique. L'idée n'est pas d'avoir peur de l'IA, mais de savoir l'utiliser intelligemment et vérifier ce qu'on lit.",
    category: 'navigation',
  },
  {
    keywords: ['contact', 'support', 'equipe', 'email', 'contacter'],
    response: "Pour contacter l'équipe, écris à contact@e-alerte.fr. Tu peux envoyer une question, un retour d'expérience ou une suggestion pour améliorer les contenus pédagogiques.",
    category: 'navigation',
  },
  {
    keywords: ['deepfake audio', 'voix ia', 'fausse voix', 'montage audio', 'audio truque'],
    response: "Un deepfake audio imite la voix d'une personne pour créer un faux message crédible. Si tu reçois un audio surprenant, vérifie par un autre canal (appel direct, message officiel) avant d'agir ou de partager.",
    category: 'deepfake',
  },
  {
    keywords: ['securite en ligne', 'protection compte', 'mot de passe', 'authentification', '2fa', 'phishing'],
    response: "Pour sécuriser tes comptes : mot de passe unique par site, 2FA activé, et vigilance sur les liens suspects. Si un message te met la pression (\"urgent\", \"ton compte va expirer\"), prends une pause et vérifie l'expéditeur.",
    category: 'securite-en-ligne',
  },
  {
    keywords: ['protéger', 'enfants', 'données', 'personnelles', 'sécurité', 'en ligne'],
    response: "Pour ce protéger en ligne, il est important de mettre en place des mots de passe forts et uniques. Cela permet de s'assurer que tes informations de connexion sont sécurisées.",
    category: 'securite-en-ligne',
  },
  {
    keywords: ['transparence algorithme', 'algorithme ia', 'explication algorithme', 'biais ia'],
    response: "La transparence des algorithmes permet de comprendre pourquoi une IA produit un résultat. Sans explication sur les données et les limites, il est difficile de faire confiance. Apprendre à poser la question \"comment cette réponse a été produite ?\" est un excellent réflexe critique.",
    category: 'ia-generative',
  },
  {
    keywords: ['phishing', 'hameconnage', 'arnaque mail', 'sms frauduleux', 'lien suspect'],
    response: "Le phishing essaie de te voler des infos (mot de passe, carte, compte) via un faux message crédible. Vérifie toujours l'adresse de l'expéditeur, ne clique pas dans l'urgence, et passe par le site officiel en tapant l'URL toi-même.",
    category: 'securite-en-ligne',
  },
  {
    keywords: ['arnaque', 'escroquerie', 'faux concours', 'cadeau gratuit', 'trop beau pour etre vrai'],
    response: "Une arnaque promet souvent un gain énorme avec très peu d'effort. Si c'est trop beau pour être vrai, méfiance. Vérifie les conditions, la réputation du compte et ne partage jamais tes données personnelles sans preuve fiable.",
    category: 'securite-en-ligne',
  },
  {
    keywords: ['rumeur', 'buzz', 'on dit que', 'info non verifiee', 'bruit'],
    response: "Une rumeur se diffuse vite car elle est simple et émotionnelle. Avant d'y croire, cherche qui a publié en premier, la date exacte, et une confirmation par des sources indépendantes. Sans preuve solide, garde une posture de doute.",
    category: 'fake-news',
  },
  {
    keywords: ['biais de confirmation', 'je crois deja', 'opinion', 'conviction'],
    response: "Le biais de confirmation, c'est quand on retient surtout les infos qui vont dans notre sens. Pour progresser, lis aussi une source qui n'est pas d'accord avec toi, puis compare les faits vérifiables plutôt que les opinions.",
    category: 'verification',
  },
  {
    keywords: ['source primaire', 'source originale', 'source initiale', 'origine information'],
    response: "La source primaire est l'origine directe d'une information (document officiel, étude, vidéo complète, déclaration intégrale). Quand tu peux remonter à cette source, tu réduis fortement le risque de manipulation.",
    category: 'verification',
  },
  {
    keywords: ['date article', 'contexte date', 'vieux contenu', 'information ancienne'],
    response: "Toujours vérifier la date : une info vraie en 2020 peut être trompeuse en 2026. Beaucoup de manipulations recyclent d'anciens contenus hors contexte. Regarde la date de publication et la date des faits mentionnés.",
    category: 'verification',
  },
  {
    keywords: ['verifier video', 'video sortie de contexte', 'video tronquee', 'sequence coupee'],
    response: "Pour vérifier une vidéo, regarde la version longue, pas juste l'extrait viral. Vérifie qui a filmé, où, quand, et s'il existe d'autres angles. Une vidéo coupée peut raconter une histoire totalement différente.",
    category: 'verification',
  },
  {
    keywords: ['bot', 'faux compte', 'compte automatique', 'reseau de comptes'],
    response: "Un bot est un compte automatisé qui peut amplifier une rumeur. Signes fréquents : publications très répétitives, activité 24h/24, peu d'interactions humaines réelles. Le volume ne prouve pas la vérité.",
    category: 'fake-news',
  },
  {
    keywords: ['preuve', 'factuel', 'opinion', 'difference fait opinion'],
    response: "Un fait est vérifiable (date, source, document), une opinion exprime un point de vue. Pour apprendre à mieux juger une info, demande-toi : est-ce que je peux vérifier cette affirmation avec une preuve indépendante ?",
    category: 'verification',
  },
  {
    keywords: ['intelligence artificielle responsable', 'ia responsable', 'ethique ia', 'usage responsable ia'],
    response: "Utiliser l'IA de façon responsable, c'est citer ses sources, signaler quand un contenu est assisté par IA, et vérifier les informations sensibles. L'objectif est d'apprendre plus vite sans propager d'erreurs.",
    category: 'ia-generative',
  },
  {
    keywords: ['que faire si je doute', 'j ai un doute', 'pas sur info', 'incertain'],
    response: "Si tu doutes : 1) ne partage pas tout de suite, 2) vérifie la source et la date, 3) compare avec 2 médias fiables, 4) demande un avis à une personne de confiance. Douter intelligemment, c'est un super pouvoir numérique.",
    category: 'verification',
  },
  {
    keywords: ['accueil', 'home', 'page d accueil', 'commencer', 'debuter sur le site'],
    response: "Pour commencer, va sur la page Accueil (/). Tu y verras le parcours en 3 étapes et les boutons pour aller vers Comprendre ou Jouer selon ton niveau. C'est la meilleure porte d'entrée si tu découvres E-alertés.",
    category: 'navigation',
  },
  {
    keywords: ['page comprendre', 'comprendre', 'module comprendre', 'apprendre les bases', 'theorie ia'],
    response: "La page Comprendre (/comprendre) t'explique les bases : IA générative, hallucinations et deepfakes, avec une galerie d'exemples. C'est l'étape idéale pour apprendre avant de te tester.",
    category: 'navigation',
  },
  {
    keywords: ['page jouer', 'jouer', 'quiz desinformation', 'faire le quiz', 'tester mes connaissances'],
    response: "La page Jouer (/jouer) propose deux modes : le quiz de désinformation et le mode Repérer les zones suspectes. Tu peux t'entraîner, obtenir un score, puis l'envoyer au classement.",
    category: 'navigation',
  },
  {
    keywords: ['reperer', 'zones suspectes', 'artefacts ia', 'spot game', 'detecter image ia'],
    response: "La page Repérer (/reperer) est un mini-jeu où tu dois cliquer sur les zones générées par IA dans des images. Tu as un nombre limité de clics, des points par zone trouvée et des explications pédagogiques à chaque niveau.",
    category: 'navigation',
  },
  {
    keywords: ['classement', 'leaderboard', 'podium', 'mes scores', 'top 10'],
    response: "La page Classement (/classement) affiche le Top 10 pour le quiz et pour le mode zones suspectes. Tu peux comparer ta progression, voir le podium et relancer une partie depuis cette page.",
    category: 'navigation',
  },
  {
    keywords: ['signaler', 'signaler un site', 'report', 'signalement', 'article suspect'],
    response: "La page Signaler (/signaler) te permet d'envoyer un signalement de site ou d'article suspect, avec la raison et le type d'usage IA observé. Tu peux aussi consulter les signalements récents pour rester vigilant.",
    category: 'navigation',
  },
  {
    keywords: ['mentions legales', 'informations legales', 'editeur du site', 'hebergement', 'propriete intellectuelle'],
    response: "La page Mentions légales (/mentions-legales) contient les infos officielles sur l'éditeur du projet, l'hébergement, la propriété intellectuelle et la responsabilité du site. C'est la page de référence juridique du projet.",
    category: 'navigation',
  },
  {
    keywords: ['politique de confidentialite', 'confidentialite', 'donnees personnelles', 'cookies', 'vie privee site'],
    response: "La page Politique de confidentialité (/politique-confidentialite) explique comment les données sont traitées sur le site, la partie RGPD, et la gestion des cookies. C'est la bonne page si tu veux comprendre ce qui est (ou non) collecté.",
    category: 'navigation',
  },
  {
    keywords: ['certificat', 'diplome quiz', 'attestation', 'pdf score'],
    response: "Après le quiz sur la page Jouer, un certificat PDF peut être généré selon ton score. Si ton objectif est de l'obtenir, entraîne-toi d'abord dans Comprendre puis repasse le quiz pour maximiser tes points.",
    category: 'quiz',
  },
  {
    keywords: ['quel parcours suivre', 'ordre des pages', 'dans quel ordre', 'par ou commencer'],
    response: "Parcours conseillé : 1) Accueil pour comprendre le programme, 2) Comprendre pour apprendre les concepts, 3) Jouer/Reperer pour pratiquer, 4) Classement pour mesurer tes progrès, 5) Signaler si tu trouves un contenu douteux.",
    category: 'navigation',
  }
]
