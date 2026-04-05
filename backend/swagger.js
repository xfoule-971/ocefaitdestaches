const swaggerJsdoc = require("swagger-jsdoc");

const options = {

  definition: {

    openapi: "3.0.0",

    info: {

      title: "API Ocefaitdestaches",
      version: "1.0.0",
      description: "API pour la gestion des œuvres artistiques, collections, techniques et statuts"

    },

    servers: [

      {
        url: "http://localhost:4000",
        description: "Serveur local"
      },

      {
        url: process.env.API_URL || "https://tonsite.com",
        description: "Production"
      }

    ],

    components: {

      securitySchemes: {

        bearerAuth: {

          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"

        }

      },

      schemas: {

        Oeuvre: {

          type: "object",
          required: ["titre", "annee", "collection_id"],

          properties: {

            id: { type: "integer", example: 1 },
            titre: { type: "string", example: "Maré Tèt" },
            annee: { type: "integer", example: 2023 },
            nom_fichier: { type: "string", example: "17104562.jpg" },
            description: { type: "string", example: "Huile sur toile..." },
            collection_id: { type: "integer", example: 2 },
            technique_id: { type: "integer", example: 1 },
            statut_id: { type: "integer", example: 1 },
            top3: {
              type: "integer",
              description: "Coup de cœur (0 ou 1)",
              example: 0,
              minimum: 0,
              maximum: 1
            },

            // ⚡ adapté à ton SQL actuel
            collection_nom: { type: "string", example: "Afro-Caribéenne" },
            technique_nom: { type: "string", example: "Acrylique" },
            statut_nom: { type: "string", example: "Disponible" }

          }

        },

        Collection: {

          type: "object",
          required: ["nom", "slogan"],
          properties: {

            id: { type: "integer", example: 1 },
            nom: { type: "string", example: "Afro-Caribéenne" },
            slogan: { type: "string", example: "Entre tradition et modernité" },
            image_presentation: { type: "string", example: "cover.jpg" }

          }

        },

        Technique: {

          type: "object",
          required: ["nom"],
          properties: {

            id: { type: "integer", example: 1 },
            nom: { type: "string", example: "Acrylique" }

          }

        },

        Statut: {

          type: "object",
          required: ["nom"],
          properties: {

            id: { type: "integer", example: 1 },
            nom: { type: "string", example: "Disponible" }

          }

        },

        // FORMAT STANDARD API
        SuccessResponse: {

          type: "object",
          properties: {

            success: { type: "boolean", example: true },
            count: { type: "integer", example: 3 },
            data: {

              type: "array",
              items: {}

            }

          }

        },

        AuthResponse: {

          type: "object",
          properties: {

            success: { type: "boolean", example: true },
            token: { type: "string", example: "jwt.token.here" },
            adminId: { type: "integer", example: 1 },
            message: { type: "string", example: "Connexion réussie" }

          }

        },

        Error: {

          type: "object",
          properties: {

            success: { type: "boolean", example: false },
            message: { type: "string", example: "Erreur serveur" }

          }

        }

      },

      responses: {

        UnauthorizedError: {

          description: "Token invalide ou manquant",
          content: {

            "application/json": {

              schema: {

                $ref: "#/components/schemas/Error"

              }

            }

          }

        }

      }

    },

    security: [

      {
        bearerAuth: []
      }

    ],

    tags: [

      { name: "Auth", description: "Authentification administrateur" },
      { name: "Oeuvres", description: "Gestion des œuvres (Public & Admin)" },
      { name: "Collections", description: "Gestion des collections" },
      { name: "Techniques", description: "Gestion des techniques de peinture" },
      { name: "Statuts", description: "Gestion des statuts de vente" },
      { name: "Admin", description: "Opérations globales d'administration" }

    ]

  },

  apis: ["./routes/*.js"]
  
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
