
# Conde_Nicolas_Projet7_Groupomania: Backend


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
- [node.js 7.11.2](https://nodejs.org/en/download/)
- [mysql: 2.18.1](https://www.mysql.com/fr/downloads/),


## Fonctionnalités
- Utilisateur: création d'un compte, connexion avec le compte, émission de token, modifications des informations utilisateur
- Post: création de posts, modification de Post selon le statut de propriétaire du post, suppression du post selon le même critère.
(pour accéder à la modification du post, cliquez sur le post que vous voulez modifier)
- Commentaires: création de commentaires, modifications des commentaires, suppression des commentaires.
(le projet étant à la version 1, le même système "propriétaire" n'a pas été mis en place)
- Réactions: création d'un like ou d'un dislike



## Setup
Dépendances: 
- bcrypt: 5.0.1,
- cookie-parser: 1.4.5,
- dotenv: 10.0.0,
- express": "^4.17.1,
- express-rate-limit: 5.3.0,
- helmet: 4.6.0,
- hpp: 0.2.3,
- jsonwebtoken: 8.5.1,
- multer: 1.4.2,
- mysql: 2.18.1,
- mysql2: 2.2.5,
- password-validator: 5.1.1,
- save: 2.4.0,
- sequelize: 6.6.5,
- xss-clean: 0.1.1

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
- [vue 3.0.5](https://github.com/vuejs/docs)
- [tailwind 2.2.7](https://tailwindcss.com/docs/installation)


## Fonctionnalités
- Utilisateur: création d'un compte, connexion avec le compte, émission de token, modifications des informations utilisateur
- Post: création de posts, modification de Post selon le statut de propriétaire du post, suppression du post selon le même critère.
(pour accéder à la modification du post, cliquez sur le post que vous voulez modifier)
- Commentaires: création de commentaires, modifications des commentaires, suppression des commentaires.
(le projet étant à la version 1, le même système "propriétaire" n'a pas été mis en place)
- Réactions: création d'un like ou d'un dislike



## Setup
Dépendances: 
- @fortawesome/fontawesome-svg-core: 1.2.36,
- @fortawesome/free-solid-svg-icons: 5.15.4,
- @fortawesome/vue-fontawesome: 3.0.0-4,
- axios: 0.21.1,
- stylelint-config-recommended: 5.0.0,
- vue: 3.0.5,
- vue-router: 4.0.11,
- vuex: 4.0.2,
- @vitejs/plugin-vue: 1.3.0,
- @vue/compiler-sfc: 3.0.5,
- autoprefixer: 10.3.1,
- postcss: 8.3.6,
- tailwindcss: 2.2.7,
- vite: 2.4.4

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

## English

# Conde_Nicolas_Projet7_Groupomania: Backend


## Plan
* [General information]
* [Technologies Used]
* [Features]
* [Installation]
* [Usage]
* [Areas for Improvement]
* [Contact]



## General Information
- The project is an internal chat system for the groupomania company
- It must allow the sending, modification, deletion of posts and comments; registration, connection and modification of user data.
As well as setting up reactions: like and dislike for posts. 



## Technologies Used
- [node.js 7.11.2](https://nodejs.org/en/download/)
- [mysql: 2.18.1](https://www.mysql.com/en/downloads/),


## Features
- User: account creation, account connection, token issue, information changes;

 
 
- Post: création de posts, modification de Post selon le statut de propriétaire du post, suppression du post selon le même critère.
(pour accéder à la modification du post, cliquez sur le post que vous voulez modifier)
- Commentaires: création de commentaires, modifications des commentaires, suppression des commentaires.
(le projet étant à la version 1, le même système "propriétaire" n'a pas été mis en place)
- Réactions: création d'un like ou d'un dislike



## Setup
Dépendances:
- bcrypt: 5.0.1,
- cookie-parser: 1.4.5,
- dotenv: 10.0.0,
- express": "^4.17.1,
- express-rate-limit: 5.3.0,
- helmet: 4.6.0,
- hpp: 0.2.3,
- jsonwebtoken: 8.5.1,
- multer: 1.4.2,
- mysql: 2.18.1,
- mysql2: 2.2.5,
- password-validator: 5.1.1,
- save: 2.4.0,
- sequelize: 6.6.5,
- xss-clean: 0.1.1

- Vous aurez besoinLimit reached 4645/800Translate a document
- Post: creation of posts, modification of Post according to the status of owner of the post, deletion of the post according to the same criterion.
(to access the post edit, click on the post you want to edit)
- Comments: creation of comments, changes to comments, deletion of comments.
(the project is in version 1, the same "proprietary" system has not been implemented)
- Reactions: creating a like or dislike



## Setup
Outbuildings:
- bcrypt: 5.0.1,
- cookie-parser: 1.4.5,
- endowment: 10.0.0,
- express": " 4.17.1,
- express-rate-limit: 5.3.0,
- helmet: 4.6.0,
- hpp: 0.2.3,
- jsonwebtoken: 8.5.1,
- multer: 1.4.2,
- mysql: 2.18.1,
- mysql2: 2.2.5,
- password-validator: 5.1.1,
- save: 2.4.0,
- sequelize: 6.6.5,
- xss-clean: 0.1.1;
- You will need a manage package like [NPM](https://docs.npmjs.com/cli/v6/commands/npm-install)
- Clone the git repo: backend  
- In your code editor terminal, enter: npm install 
- To launch the server, type: npm start.

To access the mysql database via the command prompt:  
- Connect to the command prompt
- Database name: sequelize_db_p7users;
- [db_p7.zip](https://github.com/Serafear/Conde_Nicolas_Projet7_Groupomania/files/7258483/db_p7.zip)
- import the database using the mysqldump



## Usage
Once the backend/api is installed, you can use the API call routes to perform the various operations mentioned above.  
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
* [General information]
* [Technologies Used]
* [Features]
* [Installation]
* [Usage]
* [Areas for Improvement]
* [Contact]



## General Information
- The project is an internal chat system for the groupomania company
- It must allow the sending, modification, deletion of posts and comments; registration, connection and modification of user data.
As well as the implementation of reactions: like and dislike## Technologies Used
- [view 3.0.5](https://github.com/vuejs/docs)
- [tailwind 2.2.7](https://tailwindcss.com/docs/installation)


## Features
- User: account creation, account connection, token issue, changes in user information;
- Post: creation of posts, modification of Post according to the status of owner of the post, deletion of the post according to the same criterion.
(to access the post edit, click on the post you want to edit)
- Comments: creation of comments, changes to comments, deletion of comments.
(the project is in version 1, the same "proprietary" system has not been implemented)
- Reactions: creating a like or dislike



## Setup
Outbuildings: 
- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons: 5.15.4,
- @fortawesome/vue-fontawesome: 3.0.0-4,
- axios: 0.21.1,
- stylelint-config-recommended: 5.0.0,
- view: 3.0.5,
- view-route: 4.0.11,
- vuex: 4.0.2,
- @vitejs/plugin-vue: 1.3.0,
- @vue/compiler-sfc: 3.0.5,
- self refixing: 10.3.1,
- postcss: 8.3.6,
- tailwindcss: 2.2.7,
- fast: 2.4.4

- You will need a manage package like [NPM](https://docs.npmjs.com/cli/v6/commands/npm-install)
- Clone the git repo: frontend  
- In your code editor terminal, enter: npm install 
- To launch the server, type: npm run dev.



## Usage
Once the backend/api is installed, you can use the API call routes to perform the various operations mentioned above.  
ex: async refreshPost() {
      let fetchPost = await(
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

## Areas for improvement

- Implementing a refreshToken
- Add administrator template
- Attach the deletion or modification of the elements in the backend
- Changing the design of the front
- Create reusable co-drivers throughout the project
- Use vuex


## Contact
Created by Condé Nicolas, contact: nicolas.conde@hotmail.fr




