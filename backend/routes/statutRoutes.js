const express = require("express");
const router = express.Router()
const statutController = require("../controllers/statutController");

router.get("/", statutController.getAll);
router.get("/:id", statutController.getOne)

module.exports = router;