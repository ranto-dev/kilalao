![screenshot](./gasikarako.png)

# 🇲🇬 MadaKo'IS ? – Quizz Éducatif & Ludique

> 🎮 **Testez vos connaissances sur Madagascar à travers un quizz fun, visuel et immersif !**

MadaKo'IS ? est une application web interactive conçue pour offrir une **expérience utilisateur exceptionnelle**. Mêlant éducation, humour et gameplay dynamique, le projet arbore un design moderne, fluide et entièrement réactif.

## 🎯 Objectifs du projet

- **Valoriser la culture malgache** de manière ludique et accessible à tous.
- **Stimuler la curiosité** et l'apprentissage à travers les mécanismes du jeu (_gamification_).
- **Garantir une UI/UX soignée** avec des animations fluides et un design professionnel.
- **Démontrer le savoir-faire** et le potentiel créatif des développeurs malgaches.

---

## ✨ Fonctionnalités principales

- 🎵 **Immersion sonore :** Musique d'ambiance et effets sonores dynamiques.
- 🔄 **Contenu évolutif :** Chargement dynamique des questions (via API ou JSON local).
- ⏱️ **Défi chronométré :** Gestion du temps pour pimenter les sessions de jeu.
- 🏅 **Bilan interactif :** Écran de fin animé avec résumé des performances et correction des réponses.
- ⚡ **UI/UX Premium :** Animations cinématiques, loaders créatifs et transitions fluides.
- 📱 **100% Responsive :** Expérience optimisée du smartphone à l'écran PC.
- 📚 **Sections annexes :** Pages _À propos_, FAQ et témoignages stylisés intégrés.

---

## 🧩 Stack technique

L'application est propulsée par des technologies modernes et performantes :

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Prise en main

### Prérequis

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée).

### Installation

1. Cloner le projet :

```bash
   git clone git@github.com:ranto-dev/MadaKo-IS.git MadaKo'IS

```

2. Accéder au répertoire :

```bash
   cd MadaKo'IS

```

3. Installer les dépendances :

```bash
   npm install

```

### Lancement de l'application

Démarrez le serveur de développement local :

```bash
npm run dev

```

L'application sera accessible par défaut à l'adresse : `http://localhost:5173`

## 🔧 Structure des Données (Configuration)

Les questions du quizz sont structurées et modifiables via le fichier `questions.json` selon le modèle suivant :

```json
[
  {
    "id": 1,
    "question": "Quelle est la capitale de Madagascar ?",
    "propositions": ["Mahajanga", "Antsirabe", "Fianarantsoa", "Antananarivo"],
    "reponse_correcte": "Antananarivo"
  }
]
```

## 🛠️ Scripts utiles

| Commande          | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Lance le serveur de développement local                        |
| `npm run build`   | Compile l'application pour la production (dossier `dist`)      |
| `npm run preview` | Permet de tester localement le build de production             |
| `npm run lint`    | Analyse le code pour détecter et corriger les erreurs de style |

## 🤝 Contribuer

Les contributions, signalements de bugs et suggestions d'amélioration sont les bienvenus !

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`).
4. Poussez la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une **Pull Request**.

## 👨‍💻 Auteur

Développé avec passion par [ranto-dev](https://www.google.com/search?q=https://github.com/ranto-dev).
N'hésitez pas à jeter un œil à mes autres projets !
