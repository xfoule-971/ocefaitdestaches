const express = require("express");
const router = express.Router()
const techniqueController = require("../controllers/techniqueController");

router.get("/", techniqueController.getAll);
router.get("/:id", techniqueController.getOne)

module.exports = router;