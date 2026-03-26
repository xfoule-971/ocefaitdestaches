const express = require("express");
const router = express.Router();
const oeuvreController = require("../controllers/oeuvreController");

// Routes publiques
router.get("/", oeuvreController.getOeuvres); 
router.get("/search", oeuvreController.search);
router.get("/:id", oeuvreController.getOneOeuvre);

module.exports = router;
