const express = require("express");
const router = express.Router();
const validateController = require("../controller/validateController");


// Create a new Validation For Specific form
router.post("/createValidate/:Key", validateController.addvalidateData);

// Get a new Validation For Specific form
router.get("/readValidate/:Name", validateController.readValidateByFormName);

// Get a new Validation For Specific Validation Name
router.get("/readValidateByItsName/:Name", validateController.readValidateByValidationName);

// Get a All Validation 
router.get("/readValidateByKey/:Key", validateController.readAllValidation);

//Update Form With Schema
router.put("/updateValidationForm/:ValiId", validateController.updateValidationForm)

// Delete Form From Database
router.delete("/deleteForm/:id", validateController.deleteValidateForm)

module.exports = router;