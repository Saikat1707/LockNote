import express from "express"
const router = express.Router()
import folderController from "../controller/folderController.js"



router.post("/create",folderController.createFolderOfUser)
router.patch("/rename",folderController.renameFolderOfUser)
router.delete("/delete",folderController.deleteFolderOfUser)


router.post("/details",folderController.getAllTheFilesOfTheFolder)

export default router