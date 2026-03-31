require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const oeuvreRoutes = require("./routes/oeuvreRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const techniqueRoutes = require("./routes/techniqueRoutes");
const statutRoutes = require("./routes/statutRoutes");
const adminRoutes = require("./routes/adminRoutes")
const contactRoutes = require("./routes/contactRoutes");

// MIDDLEWARES
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/handleValidation");

const app = express();

/**
 * Sécurité HTTP
 */
app.use(

    helmet({

        crossOriginResourcePolicy: false

    })

);

/**
 * CORS (à adapter en prod)
 */
app.use(cors({

    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
    
}));

/**
 * Body parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Fichiers statiques (images)
 */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/oeuvres", oeuvreRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/techniques", techniqueRoutes);
app.use("/api/statuts", statutRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

/**
 * Swagger docs
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * 404
 */
app.use(notFound);

/**
 * Gestion erreurs
 */
app.use(errorHandler);

module.exports = app;