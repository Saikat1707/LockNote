import { createFileOfFolder, createFileOfUser, deleteFileDao, getFileById, isFileExistedOfFolder, isFileExistedOfUser, updateFileContentDao, updateFileNameDao } from "../DAO/file.dao.js"
import {badResponse,goodResponse} from "../utils/response.js"

const createFileForUser = async(req,res)=>{
    try {
        const {userKey,fileName} = req.body
        if(!userKey || !fileName) return badResponse("All the fields are required")
        const isExist = await isFileExistedOfUser(userKey,fileName)
        if(isExist) return badResponse(res,"File is already exist with the same name")
        
        const file = await createFileOfUser(userKey,fileName)
        if(!file) return badResponse(res,"Error in creating file . please try after some time")
        return goodResponse(res,"File created Successfully",file)
    } catch (error) {
        console.log("Error in creating file : ",error.message)
        return badResponse(res,"Server error in creating file",error.message)
    }
}

const createFileForFolder = async(req,res)=>{
    try {
        const{folderId,fileName} = req.body
        if(!folderId || !fileName) return badResponse(res,"All the fields are required")
        const isExist = await isFileExistedOfFolder(folderId,fileName)
        const file = await createFileOfFolder(folderId,fileName)
        if(!file) return badResponse(res,"File is not created due to server issue . please try after some time ")
        return goodResponse(res,"File created Successfully",file)
    } catch (error) {
        console.log("Error in creating file : ",error.message)
        return badResponse(res,"Server error in creating file",error.message)
    }
}

const updateFileName = async (req,res)=>{
    try {
        const {fileId,fileName} = req.body
        if(!fileId || !fileName) return badResponse(res,"All fields are required")

        const file = await updateFileNameDao(fileId,fileName)
        if(!file) return badResponse(res,"Error in server . please try after some time")
        return goodResponse(res,"Successfully update the file",file)
    } catch (error) {
        console.log("Error in updating file Name : ",error.message)
        return badResponse(res,"Server error in updating file name ",error.message)
    }
}

const updateFileContent = async (req,res)=>{
    try {
        const{fileId,fileContent} = req.body
        if(!fileId || !fileContent) return badResponse(res,"All fields are required")

        const file = await updateFileContentDao(fileId,fileContent)
        if(!file) return badResponse(res,"File content not updated")
        return goodResponse(res,"Successfully update the file content",file)
    } catch (error) {
        console.log("Error in updating file content : ",error.message)
        return badResponse(res,"Server error in updating file content ",error.message)
    }
}

const deleteFile = async (req,res)=>{
    try {
        const {fileId} = req.body
        if(!fileId) return badResponse(res,"All fields are required")
        const file = await deleteFileDao(fileId)
        if(!file) return badResponse(res,"file is not deleted")
        return goodResponse(res,"Successfully deleted the file",file)
    } catch (error) {
        console.log("Error in deleting file : ",error.message)
        return badResponse(res,"Server error in deleting file",error.message)
    }
}

const getFileDetails = async (req,res)=>{
    try {
        const {fileId} = req.body
        if(!fileId) return badResponse(res,"All fields are required")
        const file = await getFileById(fileId)
        if(!file) return badResponse(res,"Can not get the file")
        return goodResponse(res,"Successfully get the file",file)
    } catch (error) {
        console.log("Error in fetching file : ",error.message)
        return badResponse(res,"Server error in fetching file",error.message)
    }
}

export default {createFileForUser,createFileForFolder,deleteFile,updateFileName,updateFileContent,getFileDetails}