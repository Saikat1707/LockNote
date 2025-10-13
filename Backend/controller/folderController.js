import {badResponse,goodResponse} from "../utils/response.js"
import {getUserByKey} from "../DAO/user.dao.js"
import { createFolder, deleteFolder, getFolderById, isExistedFolder, renameFolder } from "../DAO/folder.dao.js"
import userModel from "../model/user.model.js"

const createFolderOfUser = async (req,res)=>{
    try {
        const{userKey,folderName} = req.body
        if(!userKey || !folderName) return badResponse(res,"All fields are required")
        const user = await getUserByKey(userKey)
        if(!user?._id) return badResponse(res,"Could not get the user _id while creating folder")

        const isExist = await isExistedFolder(user._id,folderName)
        if(isExist) return badResponse(res,"Folder is already present with the same name")


        const folderData = await createFolder(user._id,folderName)
        if(!folderData) return badResponse(res,"error in creating folder")
        user.folderList.push(folderData._id)
        await user.save()
        return goodResponse(res,"Successfully folder created",folderData)
    } catch (error) {
        console.log("Error in creating folder 📂")
        return badResponse(res,"Server error while creating folder 📂",error.message)
    }
}

const renameFolderOfUser = async (req,res)=>{
    try {
        const {userKey,folderId, newName} = req.body
        if(!userKey || !folderId || !newName) return badResponse(res,"All fields are required")
        const user = await getUserByKey(userKey)
        if(!user?._id) return badResponse(res,"Could not get the user _id while creating folder")

        const isExist = await isExistedFolder(user._id,newName)
        if(isExist) return badResponse(res,"Folder is already present with the same name")
        
        const updatedFolder = await renameFolder(folderId,newName)
        if(!updatedFolder) return badResponse(res,"Folder not updated")
        return goodResponse(res,"Successfully update the folder",updatedFolder)
    } catch (error) {
        console.log("Error while updating the folder ",error.message)
        return badResponse(res,"Server error while updating folder",error.message)
    }
}

const deleteFolderOfUser = async(req,res)=>{
    try {
        const{folderId} = req.body
        if(!folderId) return badResponse(res,"All fields are required")
        const deletedFolder = await deleteFolder(folderId)
        if(!deletedFolder) return badResponse(res,"folder is not deleted")
        if(deletedFolder.user){
            const userId = deletedFolder.user
            const user = await userModel.findById(userId)
            if(user){
                user.folderList.pull(deletedFolder._id)
                await user.save()
            }
        }
        return goodResponse(res,"Successfully delete the folder")
    } catch (error) {
        console.log("Error while deleting the folder ",error.message)
        return badResponse(res,"Server error while deleting the folder ",error.message)
    }
}

const getAllTheFilesOfTheFolder = async(req,res)=>{
    try {
        const {folderId} = req.body
        if(!folderId) return badResponse(res,"All fields are required")
        const folderData = await getFolderById(folderId)
        if(!folderData) return badResponse(res,"Can not fetch data")
        return goodResponse(res,"Sucessfully fetched the data of the folder",folderData)
    } catch (error) {
        console.log("Error while fetching the files ",error.message)
        return badResponse(res,"Server error while fetcing the data",error.message)
    }
}

export default {createFolderOfUser,renameFolderOfUser,deleteFolderOfUser,getAllTheFilesOfTheFolder}