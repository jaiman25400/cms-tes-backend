const express = require("express");
const router = express.Router();
const formController = require("../controller/formController");
const formDocController = require("../controller/formDocController");
const validation = require("../middleware/validation");


//Get All Forms & Their Schema
router.get("/", formController.getAllForms);

router.get("/readformbyKey/:Key", formController.getFormByKey);


//Get Form With Name
router.get("/readForm/:Name", formController.getformByName)

//Add Form With Schema
router.post("/createForm/:Key", formController.createForm)

//Add Page Form 
router.post("/createPage/:Key", formController.createPageForm)

//Update Form With Schema
router.put("/updateForm/:formId", formController.updateForm)


// Delete Form From Database
router.delete("/deleteForm/:formId", formController.deleteForm)

//Add Form Docs With Schema
router.post("/createFormDoc/:formName", formDocController.addFormData)

//Get Form Doc With Name
router.get("/readFormDoc/:formName", formDocController.showFormByItsName)

router.put("/updateFormDocuments/:formName", formDocController.updateFormData)


router.delete("/deleteFormDocuments/:formDocName", formDocController.deleteFormDocData)
//Add Form Docs With Schema
router.post("/readThisFormDoc/:formName", formDocController.showFormDocById)

module.exports = router;