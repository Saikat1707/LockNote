import express from "express"
import userController from "../controller/userController.js"
const router = express.Router()

router.post("/create",userController.createUser)
router.post("/login",userController.loginUser)
router.post("/details",userController.getUserWithAllDetails)
export default router