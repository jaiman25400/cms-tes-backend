const express = require("express");
const router = express.Router();
const modelController = require("../controller/modelController");
const validation = require("../middleware/validation");


//Get All Model & Their Schema
router.get("/", modelController.getAllModels);

//Get Specific Model
router.get("/readModel/:name", modelController.getModelByName);

//Add Model With Schema
router.post("/createModel", validation.checkmodelName, validation.checkModelSchema, validation.validatonCheck, modelController.createModel)

//Update Model With Schema
router.put("/updateModel/:name", validation.checkModelSchema, validation.validatonCheck, modelController.updateSchemaByName)

// Delete Model From Database
router.delete("/deleteModel/:modelId", modelController.deleteModel)


module.exports = router;
