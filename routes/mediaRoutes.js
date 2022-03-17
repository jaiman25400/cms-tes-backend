const express = require("express");
const router = express.Router();
const mediaController = require("../controller/mediaController");

router.get("/readAllMedia",mediaController.getAllMedia)

router.get("/readMediaByKeyId/:KeyId",mediaController.getMediaByKeyId)

// Create a new Media For Specific Model
router.post("/createMedia", mediaController.addMediaData);

router.get("/view/:name",mediaController.getMediaByNameAndId)

router.put("/updateMedia/:id",mediaController.updateMedia)

router.delete("/deleteMedia/:id",mediaController.deleteMedia)

router.put("/archiveMedia/:id",mediaController.archiveMedia)

router.post("/deleteSelectedMedia",mediaController.deleteSelectedMedia)

router.post("/archiveSelectedMedia",mediaController.archiveSelectedMedia)

module.exports = router;
