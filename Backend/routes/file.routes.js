import express from "express"
const router = express.Router()

import fileController from "../controller/fileController.js"

router.post("/create/user",fileController.createFileForUser)
router.post("/create/folder",fileController.createFileForFolder)

router.patch("/update/fileName",fileController.updateFileName)
router.patch("/update/fileContent",fileController.updateFileContent)

router.delete("/delete",fileController.deleteFile)
router.post("/details",fileController.getFileDetails)

export default router