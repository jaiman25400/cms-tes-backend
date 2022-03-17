const express = require("express");
const router = express.Router();
const docController = require("../controller/docController");
const validation = require("../middleware/validation");


// Get All Docs Of Specific Model
router.get("/readDoc/:modelName", docController.getDocByModelName);

// Get All Docs Of Specific Model
router.get("/readDoc/:modelName/:id", docController.getDocByModelNameAndID);

// Create a new Docs For Specific Model
router.post("/createDoc/:modelName", docController.addData);

// router.get("/public/pimg",docController.getImageFile)

// Update Docs Of Specific Model validation.validatonCheck, validation.checkDocSchema,
router.put("/updateDoc/:modelName/:docId", docController.updateData)

// Delete Docs From Database
router.delete("/deleteDoc/:docId", docController.deleteData)

module.exports = router;
