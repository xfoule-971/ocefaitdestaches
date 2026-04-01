PORTOFOLIO ARTISTE — OCEANE FOULE

Application web complète permettant de présenter les œuvres d’une artiste, organisées par collections, avec un espace d’administration sécurisé.

Le projet est composé de :
    - BACKEND : Node.js / Express / MySQL
    - FRONTEND : React
    - DOCUMENTATION API : Swagger
    - SECURITE : JWT, Rate Limiter, CAPTCHA (Google reCAPTCHA v2)
    - UPLOAD FICHIERS : Multer


I. Architecture du projet

project 
│ 
├── README.md
│
├── backend
│   ├── .env
│   ├── app.js
│   ├── server.js 
│   ├── swagger.js
│   │
│   ├── config
│   │   ├── db.js
│   │   └── mail.js
│   │
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── collectionController.js
│   │   ├── contactController.js
│   │   ├── oeuvreController.js
│   │   ├── statutController.js
│   │   └── techniqueController.js
│   │
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── captacha.js
│   │   ├── handleValidation.js
│   │   ├── notFound.js
│   │   ├── rateLimiter.js
│   │   └── Upload.js
│   │
│   ├── models
│   │   ├── adminModel.js
│   │   ├── collectionModel.js
│   │   ├── oeuvreModel.js
│   │   ├── statutModel.js
│   │   └── techniqueModel.js
│   │
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── collectionRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── oeuvreRoutes.js
│   │   ├── statutRoutes.js
│   │   └── techniqueRoutes.js
│   │
│   ├── services
│   │   ├── adminService.js
│   │   ├── authService.js
│   │   ├── collectionService.js
│   │   ├── mailService.js
│   │   ├── oeuvreService.js
│   │   ├── statutService.js
│   │   └── techniqueService.js
│   │
│   ├── validators
│   │   ├── authValidator.js
│   │   ├── collectionValidator.js
│   │   ├── contactValidator.js
│   │   ├── oeuvreValidator.js
│   │   ├── statutValidator.js
│   │   └── techniqueValidator.js
│   │
│   └── uploads
│  
├── database
│   └── setup.sql
│ 
└── frontend
    ├── src
    │   ├── components
    │   │   ├── AdminCard.js
    │   │   ├── AdminHerocard.js
    │   │   ├── AdminlogCard.js
    │   │   ├── ArtisteCard.js
    │   │   ├── CollectionCard.js
    │   │   ├── ContactForm.js
    │   │   ├── Footer.js
    │   │   ├── FormUniv.js
    │   │   ├── HeroCard.js
    │   │   ├── InfoCard.js
    │   │   ├── MentionsCard.js
    │   │   ├── ModalUniv.js
    │   │   ├── Navigation.js
    │   │   ├── PolitiqueCard.js
    │   │   ├── PrestaCard.js
    │   │   ├── RequireAuth.js
    │   │   ├── SearchBar.js
    │   │   ├── TableUniv.js
    │   │   ├── ToileCard.js
    │   │   ├── TopCard.js
    │   │   └── UniversalCarousel.js
    │   │ 
    │   ├── pages
    │   │   ├── Accueil.jsx
    │   │   ├── AdminCollections.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminOeuvres.jsx
    │   │   ├── AdminStatus.jsx
    │   │   ├── AdminTechniques.jsx
    │   │   ├── Annee.jsx
    │   │   ├── Artiste.jsx
    │   │   ├── Collection.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Erreur.jsx
    │   │   ├── Galerie.jsx
    │   │   ├── Mentions.jsx
    │   │   ├── Politique.jsx
    │   │   ├── Prestattions.jsx
    │   │   ├── Status.jsx
    │   │   ├── Technique.jsx
    │   │   └── Toile.jsx
    │   │ 
    │   ├── services
    │   │   ├── authFtech.jsx
    │   │   └── config.js
    │   │ 
    │   ├── styles
    │   │   └── index.scss
    │   │ 
    ├── App.js
    └── index.js

II. Backend — Installation

    1️ Installer les dépendances
        npm install

    2️ Configuration de la base de données

        Créer une base MySQL :
            CREATE DATABASE artisteoce_db;

        Tables :
            collections
            techniques
            statuts
            oeuvres
            administrateurs

        Structure : (table oeuvres)
            id INT AUTO_INCREMENT PRIMARY KEY,
            titre VARCHAR(100) NOT NULL,
            annee INT NOT NULL,
            description TEXT,
            nom_fichier VARCHAR(255) NOT NULL,
            collection_id INT,
            technique_id INT,
            statut_id INT,
            top3 TINYINT(1) DEFAULT 0,
            CONSTRAINT fk_oeuvre_collection FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL,
            CONSTRAINT fk_oeuvre_technique FOREIGN KEY (technique_id) REFERENCES techniques(id) ON DELETE SET NULL,
            CONSTRAINT fk_oeuvre_statut FOREIGN KEY (statut_id) REFERENCES statuts(id) ON DELETE SET NULL

        Utiliser le fichier database/setup.sql

    3. Fichier .env

        PORT=4000

        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=
        DB_NAME=paintoce_db

        JWT_SECRET=supersecretkey

        SMTP_HOST=smtp.mailtrap.io
        SMTP_PORT=2525
        SMTP_USER=xxx
        SMTP_PASS=xxx

        MAIL_RECEIVER=tonemail@test.com

        RECAPTCHA_SECRET=xxxxxxxx

    4. Lancer le serveur

        npm run dev
        API disponible :
        http://localhost:4000


II. Documentation API

        Swagger :
        http://localhost:4000/api-docs


III. Endpoints API

    1. Admin (authentification)

        POST /api/auth/login
    
    2. Admin (gestion CRUD)

        POST   /api/oeuvres        
        PUT    /api/oeuvres/:id
        DELETE /api/oeuvres/:id   

        POST   /api/collections  
        PUT    /api/collections/:id
        DELETE /api/collections/:id 

        POST   /api/techniques  
        PUT    /api/techniques/:id
        DELETE /api/techniques/:id 

        POST   /api/statuts  
        PUT    /api/statuts/:id
        DELETE /api/statuts/:id 

    3. Œuvres

        GET    /api/oeuvres/top3
        GET    /api/oeuvres/search
        GET    /api/oeuvres
        GET    /api/oeuvres/:id
        GET    /api/oeuvres/annee/:year

    
    4. Collections 

        GET    /api/collections
        GET    /api/collections/:id/oeuvres
        GET    /api/collections/:id

    5. Techniques 

        GET    /api/techniques
        GET    /api/techniques/:id/oeuvres
        GET    /api/techniques/:id   

    6. Statuts 

        GET    /api/statuts
        GET    /api/statuts/:id/oeuvres
        GET    /api/statuts/:id

    4. Contact 

        POST /api/contact
        Inclut :
            - Validation des champs
            - Envoi email (nodemailer)
            - Protection CAPTCHA


IV. Accès aux images

    Les images sont servies via :
    http://localhost:4000/uploads/{filename}
    Exemple :
    http://localhost:4000/uploads/mon-image.jpg


V. Frontend React

    1. Installation

        cd frontend
        npm install

    2. Lancer

        npm start

    3. Application

        http://localhost:3000


VII. Sécurité

    Le backend inclut :
        - Authentification JWT
        - Middleware de protection des routes
        - Rate Limiter (anti brute-force)
        - CAPTCHA (Google reCAPTCHA v2)
        - Validation des données (express-validator)
        - Gestion centralisée des erreurs
        - Upload sécurisé (Multer)


VIII. Fonctionnalités principales

    1. Galerie
        - Affichage des œuvres
        - Filtrage par collection / technique (de peinture) / status (disponibles et/ou vendues) / année
        - Détail d’une œuvre

    2. Admin
        - Connexion sécurisée
        - Ajout / modification / suppression :
            - œuvres
            - collections
            - techniques
            - status
        - Upload d’images

    3. Contact
        - Formulaire utilisateur
        - Protection anti-spam (captcha)
        - Envoi email automatique


IX. Exemple réponse API

    {
        "success": true,
        "data": [
            {
                "id": 1,
                "titre": "Muse Stellaire",
                "annee": 2025,
                "description": "Portrait de profil...",
                "nom_fichier": "image.jpg",
                "collection_id": 1,
                "technique_id": 5,
                "statut_id": 2,
                "top3": 1
            }
        ]
    }


X. Auteur

    Projet développé pour :

    Océane Foule — Artiste peintre


XII. Licence

    Projet artistique et éducatif.