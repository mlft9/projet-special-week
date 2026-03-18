export interface ResponseRow {
  keywords: string[]
  response: string
  category: string
}

export const responses: ResponseRow[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir'],
    response: "Salut ! Je suis l'assistant TruthSense 👋 Tu peux me poser des questions sur les deepfakes, les IA qui inventent des infos, les fake news... Je suis là pour t'aider à décrypter tout ça !",
    category: 'navigation',
  },
  {
    keywords: ['deepfake', 'visage', 'vidéo', 'fausse', 'truquée', 'montage', 'remplacé'],
    response: "Un deepfake, c'est une vidéo ou une image où le visage d'une vraie personne est remplacé par un autre grâce à l'IA. C'est fait si bien que c'est difficile à repérer ! Des politiciens, des célébrités... même des gens ordinaires peuvent en être victimes sans le savoir.",
    category: 'deepfake',
  },
  {
    keywords: ['deepfake', 'repérer', 'détecter', 'reconnaître', 'identifier', 'voir'],
    response: "Pour repérer un deepfake, regarde ces 4 indices : 1) Les yeux clignent de façon bizarre ou pas assez. 2) La peau semble trop lisse ou les cheveux flous aux bords. 3) Les dents ou les oreilles ont l'air étranges. 4) L'éclairage du visage ne correspond pas au reste de l'image.",
    category: 'deepfake',
  },
  {
    keywords: ['hallucination', 'invente', 'erreur', 'faux', 'mensonge', 'inventé'],
    response: "Une \"hallucination\" d'IA, c'est quand un chatbot comme ChatGPT invente des informations qui ont l'air vraies mais qui sont complètement fausses. Il peut te citer un article de journal qui n'existe pas, avec un auteur inventé. C'est super dangereux si on ne vérifie pas !",
    category: 'hallucination',
  },
  {
    keywords: ['chatgpt', 'gpt', 'claude', 'gemini', 'chatbot', 'répond', 'source', 'fiable'],
    response: "Même si les IA comme ChatGPT, Gemini ou Claude semblent très sûres d'elles, elles ne vérifient pas leurs sources en temps réel. Elles produisent du texte \"probable\" basé sur des milliards de données, mais elles peuvent se tromper. Toujours vérifier une info importante donnée par une IA !",
    category: 'hallucination',
  },
  {
    keywords: ['ia', 'intelligence', 'artificielle', 'comment', 'fonctionne', 'crée', 'génère', 'générative'],
    response: "L'IA générative apprend à partir d'énormes quantités de textes, d'images ou de sons. Elle repère des patterns et peut en créer de nouveaux. C'est comme si elle avait \"lu\" internet entier et pouvait imiter n'importe quel style. Mais elle ne \"comprend\" pas vraiment : elle prédit juste ce qui vient ensuite.",
    category: 'ia-generative',
  },
  {
    keywords: ['image', 'générée', 'créée', 'photo', 'midjourney', 'dall-e', 'stable'],
    response: "Pour reconnaître une image générée par IA, cherche : les mains (souvent trop de doigts), les textes illisibles dans l'image, les arrière-plans qui n'ont pas de sens, les bijoux ou lunettes asymétriques. Des outils comme Hive Moderation ou \"AI or Not\" peuvent t'aider à vérifier !",
    category: 'ia-generative',
  },
  {
    keywords: ['texte', 'généré', 'écrit', 'article', 'post', 'reconnaître'],
    response: "Un texte écrit par une IA est souvent très fluide mais un peu \"trop parfait\" : pas de vraies opinions, beaucoup de \"d'un côté... de l'autre côté\", des formulations répétitives. Il évite aussi les positions tranchées. Des outils comme ZeroGPT peuvent t'aider à le détecter.",
    category: 'ia-generative',
  },
  {
    keywords: ['vérifier', 'source', 'fiable', 'crédible', 'confiance', 'méthode'],
    response: "La méthode SIFT en 4 étapes : S = Stop (pause avant de partager), I = Investiguer la source (c'est qui ?), F = Find better coverage (cherche d'autres sources), T = Trace the claim (remonte à l'origine de l'info). Simple mais très efficace !",
    category: 'verification',
  },
  {
    keywords: ['fact-check', 'vérification', 'fake', 'news', 'hoax', 'outil', 'site'],
    response: "En France, les sites de fact-checking officiels sont : AFP Factuel (factuel.afp.com), Les Décodeurs du Monde, Libération CheckNews, et France Télévisions Vrai ou Faux. Pour les images, utilise TinEye ou la recherche d'images Google inversée !",
    category: 'verification',
  },
  {
    keywords: ['photo', 'vraie', 'fausse', 'recherche', 'inverse', 'inversée'],
    response: "La recherche d'image inversée, c'est super utile ! Sur Google Images, clique sur l'appareil photo et colle l'URL de l'image. Tu verras où cette image a été publiée avant. Souvent une \"photo du jour\" est en fait une vieille photo recyclée pour un autre contexte !",
    category: 'verification',
  },
  {
    keywords: ['fake', 'news', 'fausse', 'information', 'propagande', 'manipulation', 'désinformation'],
    response: "Les fake news marchent parce qu'elles jouent sur les émotions : peur, colère, indignation. Notre cerveau est câblé pour mémoriser et partager ce qui nous choque. Une étude du MIT a montré que les fausses infos se propagent 6 fois plus vite que les vraies sur Twitter !",
    category: 'fake-news',
  },
  {
    keywords: ['partager', 'repost', 'like', 'réseaux', 'sociaux', 'viral', 'diffuser'],
    response: "Avant de partager une info, pose-toi 3 questions : 1) Est-ce que je connais la source originale ? 2) Est-ce que d'autres médias sérieux en parlent ? 3) Est-ce que je la partage parce qu'elle me choque, ou parce qu'elle est vraie ? Si tu doutes, ne partage pas !",
    category: 'fake-news',
  },
  {
    keywords: ['titre', 'choc', 'sensationnel', 'clickbait', 'piège', 'appât', 'accroche'],
    response: "Les titres pièges (clickbait) utilisent des formules comme \"Tu ne devineras jamais...\", \"Choc : ...\", \"Officiel : ...\". Ils jouent sur la curiosité pour te faire cliquer. Le contenu est souvent beaucoup moins spectaculaire que le titre. Lis toujours l'article complet !",
    category: 'fake-news',
  },
  {
    keywords: ['quiz', 'jouer', 'jeu', 'tester', 'score', 'classement', 'partie'],
    response: "Tu veux tester tes connaissances ? Direction la section Jouer ! Tu pourras analyser de vrais cas de désinformation et voir si tu arrives à repérer les pièges. Ton score sera enregistré dans le classement. Alors, prêt(e) à relever le défi ? 🏆",
    category: 'quiz',
  },
  {
    keywords: ['site', 'truthsense', 'apprendre', 'comprendre', 'module', 'page', 'section'],
    response: "TruthSense c'est un portail en 3 étapes : 1) Comprendre → des explications sur l'IA et la désinformation, 2) Jouer → un quiz pour tester tes réflexes, 3) Classement → compare-toi aux autres. Commence par \"Comprendre\" si tu es nouveau ici !",
    category: 'navigation',
  },
  {
    keywords: ['aide', 'help', 'question', 'problème', 'comment', 'sais'],
    response: "Je suis là pour répondre à tes questions sur la désinformation, les deepfakes, les IA qui inventent des infos, ou la navigation sur le site ! Essaie de me demander quelque chose comme \"c'est quoi un deepfake ?\" ou \"comment vérifier une info ?\".",
    category: 'navigation',
  },
  {
    keywords: ['merci', 'super', 'cool', 'bien', 'génial', 'parfait', 'top', 'nickel'],
    response: "Avec plaisir ! N'hésite pas si tu as d'autres questions sur la désinformation ou les IA. Et si tu veux aller plus loin, va jeter un oeil aux modules \"Comprendre\" du site ! 😊",
    category: 'navigation',
  },
    {
    keywords: ['google', 'gemini', 'claude', 'bard', 'chatgpt', 'ia', 'intelligence', 'artificielle'],
    response: "Il existe plusieurs IA génératives populaires : ChatGPT d'OpenAI, Gemini de Google, Claude d'Anthropic, et Bard de Google. Chacune a ses forces et faiblesses, mais elles peuvent toutes produire du texte impressionnant... et parfois des hallucinations !",
    category: 'ia-generative',
  },
  {
    keywords: ['harcèlement', 'cyberharcèlement', 'victime', 'protéger', 'aider', 'France'],
    response: "Le cyberharcèlement est un problème grave. En France, il existe des ressources pour les victimes : le site officiel cyberharcelement.fr propose des conseils et un numéro d'aide (3018). N'hésite pas à en parler à quelqu'un de confiance et à chercher de l'aide si tu es victime ou témoin de harcèlement en ligne.",
    category: 'cyberharcelement',
  },
  {
    keywords: ['rgpd', 'données', 'personnelles', 'protection', 'vie privée', 'loi', 'européenne'],
    response: "Le RGPD (Règlement Général sur la Protection des Données) est une loi européenne qui protège les données personnelles des citoyens. Il oblige les entreprises à être transparentes sur l'utilisation de tes données et te donne des droits comme le droit d'accès, de rectification, et d'effacement de tes données. C'est un outil important pour protéger ta vie privée en ligne !",
    category: 'rgpd',
  },
  {
    keywords: ['but', 'mission', 'objectif', 'pourquoi', 'raison', 'intention'],
    response: "La mission de TruthSense, c'est de t'aider à comprendre et à combattre la désinformation à l'ère de l'IA. On veut te donner les clés pour repérer les fake news, les deepfakes, et les hallucinations d'IA, afin que tu puisses naviguer sur internet en toute confiance !",
    category: 'navigation',
  },
  {
    keywords: ['contact', 'support', 'aide', 'problème', 'question', 'équipe'],
    response: "Si tu as des questions, des suggestions, ou besoin d'aide, n'hésite pas à nous contacter ! Tu peux nous envoyer un email à contact@truthsense.fr",
    category: 'navigation',
  },
  {
    keywords: ['deepfake','victime','voix','audio','faux','truqué','montage'],
    response: "Un deepfake audio, c'est quand la voix d'une personne est imitée de manière très réaliste grâce à l'IA. Ça peut être utilisé pour faire dire à quelqu'un des choses qu'il n'a jamais dites, ou pour créer de faux messages vocaux. C'est aussi dangereux que les deepfakes vidéo, car ça peut tromper les gens et causer du tort à la réputation d'une personne !",
    category: 'deepfake',   
  },
  {
    keywords: ['securité', 'en ligne', 'protection', 'compte', 'mot de passe', 'authentification'],
    response: "Pour protéger tes comptes en ligne,pense à utiliser des mots de passe forts et uniques pour chaque site. Active l'authentification à deux facteurs (2FA) quand c'est possible, et fais attention aux emails de phishing qui essaient de te voler tes informations de connexion. La sécurité en ligne, c'est important pour protéger ta vie privée !",
    category: 'securite-en-ligne',
  },
  {
    keywords: ['protéger', 'enfants', 'données', 'personnelles', 'contrôle parental', 'sécurité', 'en ligne'],
    response: "Pour protéger les enfants en ligne, il est important de mettre en place un contrôle parental efficace. Cela permet de surveiller leur activité sur internet et de les aider à naviguer en toute sécurité.",
    category: 'securite-en-ligne',
  },
  {
    keywords: ['transparence', 'algorithme', 'ia', 'intelligence artificielle', 'fonctionnement', 'explication'],
    response: "La transparence des algorithmes d'IA est essentielle pour comprendre comment ils prennent des décisions. Les entreprises devraient expliquer clairement comment leurs IA fonctionnent, quelles données elles utilisent, et quels biais elles peuvent avoir. Cela permettrait aux utilisateurs de faire des choix éclairés et de mieux se protéger contre les manipulations !",
    category: 'ia-generative',
  }
] 
