const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController");


//Get Form With Name
router.post("/validation", searchController.getValiAndFormName)

router.post("/Form", searchController.getFormName)

module.exports = router;