
# Conde_Nicolas_Projet7_Groupomania: Backend
> Le backend est l'api gérant les actions sur la base de donnée ainsi que la reconnaissance utilisateur

## Plan
* [Information générale]
* [Technologies Utilisées]
* [Fonctionnalités]
* [Installation]
* [Utilisation]
* [Pistes d'améliorations]
* [Contact]



## Information générale
- Le projet est un système de chat interne pour l'entreprise groupomania
- Il doit permettre l'envoi, la modification, la suppression de posts et commentaires; l'inscription, la connexion et la modification des données utilisateur.
Ainsi que la mise en place de réactions : like et dislike pour les posts. 



## Technologies Utilisées
- node.js 7.11.2
- mysql: 2.18.1,
- mysql2: 2.2.5,
- sequelize: 6.6.5  


## Fonctionnalités
- Utilisateur: création d'un compte, connexion avec le compte, émission de token, modifications des informations utilisateur
- Post: création de posts, modification de Post selon le statut de propriétaire du post, suppression du post selon le même critère.
(pour accéder à la modification du post, cliquez sur le post que vous voulez modifier)
- Commentaires: création de commentaires, modifications des commentaires, suppression des commentaires.
(le projet étant à la version 1, le même système "propriétaire" n'a pas été mis en place)
- Réactions: création d'un like ou d'un dislike



## Setup
Dépendances: 
- "bcrypt": "^5.0.1",
- "cookie-parser": "^1.4.5",
- "dotenv": "^10.0.0",
- "express": "^4.17.1",
- "express-rate-limit": "^5.3.0",
- "helmet": "^4.6.0",
- "hpp": "^0.2.3",
- "jsonwebtoken": "^8.5.1",
- "multer": "^1.4.2",
- "mysql": "^2.18.1",
- "mysql2": "^2.2.5",
- "password-validator": "^5.1.1",
- "save": "^2.4.0",
- "sequelize": "^6.6.5",
- "xss-clean": "^0.1.1"

- Vous aurez besoin d'un package manage comme [NPM](https://docs.npmjs.com/cli/v6/commands/npm-install)
- Clonez le repo git: backend  
- Dans le terminal de votre éditeur de code, entrez : npm install 
- Pour lancer le serveur, tapez : npm start.

Pour accéder à la base de donnée mysql via l'invite de commandes:  
- Connectez vous à l'invite commandes
- nom base de données: sequelize_db_p7users
- [db_p7.zip](https://github.com/Serafear/Conde_Nicolas_Projet7_Groupomania/files/7258483/db_p7.zip)
- importez la base de données à l'aide du mysqldump



## Utilisation
Une fois que le backend/api est installé(e), vous pourrez utiliser les routes d'appel api pour réaliser les différentes opérations citées plus haut.  
ex: async refreshPost() {
      let fetchPost = await axios.get(
        `http://localhost:4000/api/post/${this.Post.id}`,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(fetchPost);
      this.pc = fetchPost.data;
    },


# Conde_Nicolas_Projet7_Groupomania: Frontend

## Plan
* [Information générale]
* [Technologies Utilisées]
* [Fonctionnalités]
* [Installation]
* [Utilisation]
* [Pistes d'améliorations]
* [Contact]



## Information générale
- Le projet est un système de chat interne pour l'entreprise groupomania
- Il doit permettre l'envoi, la modification, la suppression de posts et commentaires; l'inscription, la connexion et la modification des données utilisateur.
Ainsi que la mise en place de réactions : like et dislike pour les posts. 



## Technologies Utilisées
- vue 3.0.5
- tailwind 2.2.7


## Fonctionnalités
- Utilisateur: création d'un compte, connexion avec le compte, émission de token, modifications des informations utilisateur
- Post: création de posts, modification de Post selon le statut de propriétaire du post, suppression du post selon le même critère.
(pour accéder à la modification du post, cliquez sur le post que vous voulez modifier)
- Commentaires: création de commentaires, modifications des commentaires, suppression des commentaires.
(le projet étant à la version 1, le même système "propriétaire" n'a pas été mis en place)
- Réactions: création d'un like ou d'un dislike



## Setup
Dépendances: 
- "@fortawesome/fontawesome-svg-core": "^1.2.36",
- "@fortawesome/free-solid-svg-icons": "^5.15.4",
- "@fortawesome/vue-fontawesome": "^3.0.0-4",
- "axios": "^0.21.1",
- "stylelint-config-recommended": "^5.0.0",
- "vue": "^3.0.5",
- "vue-router": "^4.0.11",
- "vuex": "^4.0.2"
- "@vitejs/plugin-vue": "^1.3.0",
- "@vue/compiler-sfc": "^3.0.5",
- "autoprefixer": "^10.3.1",
- "postcss": "^8.3.6",
- "tailwindcss": "^2.2.7",
- "vite": "^2.4.4"

- Vous aurez besoin d'un package manage comme [NPM](https://docs.npmjs.com/cli/v6/commands/npm-install)
- Clonez le repo git: frontend  
- Dans le terminal de votre éditeur de code, entrez : npm install 
- Pour lancer le serveur, tapez : npm run dev.



## Utilisation
Une fois que le backend/api est installé(e), vous pourrez utiliser les routes d'appel api pour réaliser les différentes opérations citées plus haut.  
ex: async refreshPost() {
      let fetchPost = await axios.get(
        `http://localhost:4000/api/post/${this.Post.id}`,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(fetchPost);
      this.pc = fetchPost.data;
    },

## Pistes d'améliorations

- Implémenter un refreshToken
- Ajouter un modèle administrateur
- Rattacher la suppréssion ou modification des éléments dans le backend
- Modifier le design du front
- Créez des comosants réutilisables sur tout le projet
- Utiliser vuex


## Contact
Crée par Condé Nicolas, contact: nicolas.conde@hotmail.fr

