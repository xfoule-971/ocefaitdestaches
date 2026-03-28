const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");
const handleValidation = require("../middlewares/handleValidation");

const oeuvreValidator = require("../validators/oeuvreValidator").create;
const collectionValidator = require("../validators/collectionValidator").create;
const techniqueValidator = require("../validators/techniqueValidator").create;
const statutValidator = require("../validators/statutValidator").create;

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Opérations d'administration (Authentification requise)
 */

//
// ==============================
//        ŒUVRES
// ==============================
//

router.post(
    "/oeuvres",
    auth,
    upload.single("image"),
    oeuvreValidator,
    handleValidation,
    adminController.addOeuvre
);

router.put(
    "/oeuvres/:id",
    auth,
    upload.single("image"),
    oeuvreValidator,
    handleValidation,
    adminController.editOeuvre
);

router.delete(
    "/oeuvres/:id",
    auth,
    adminController.removeOeuvre
);

//
// ==============================
//        COLLECTIONS
// ==============================
//

router.post(
    "/collections",
    auth,
    collectionValidator,
    handleValidation,
    adminController.addCollection
);

router.put(
    "/collections/:id",
    auth,
    collectionValidator,
    handleValidation,
    adminController.editCollection
);

router.delete(
    "/collections/:id",
    auth,
    adminController.removeCollection
);

//
// ==============================
//        TECHNIQUES
// ==============================
//

router.post(
    "/techniques",
    auth,
    techniqueValidator,
    handleValidation,
    adminController.addTechnique
);

router.put(
    "/techniques/:id",
    auth,
    techniqueValidator,
    handleValidation,
    adminController.editTechnique
);

router.delete(
    "/techniques/:id",
    auth,
    adminController.removeTechnique
);

//
// ==============================
//        STATUTS
// ==============================
//

router.post(
    "/statuts",
    auth,
    statutValidator,
    handleValidation,
    adminController.addStatut
);

router.put(
    "/statuts/:id",
    auth,
    statutValidator,
    handleValidation,
    adminController.editStatut
);

router.delete(
    "/statuts/:id",
    auth,
    adminController.removeStatut
);

module.exports = router;