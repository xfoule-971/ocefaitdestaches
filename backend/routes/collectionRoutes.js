const express = require("express");
const router = express.Router()
const collectionController = require("../controllers/collectionController");

router.get("/", collectionController.getAll);
router.get("/:id", collectionController.getOne)

module.exports = router;