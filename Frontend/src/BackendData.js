
import axios from "../src/axiosConfig"

export const getAllUserData = async (userKey)=>{
    try {
        const data = await axios.post("/user/details",{userKey})
        console.log("User Data : ",data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const userLogin = async (userKey,password)=>{
    try {
        const user = await axios.post("/user/login",{userKey,password})
        if(!user) console.log("blank user")
        return user
    } catch (error) {
        console.log(error)
    }
}
export const userSignUp = async (userKey,password)=>{
    try {
        const user = await axios.post("/user/create",{userKey,password})
        if(!user) console.log("blank user")
        return user
    } catch (error) {
        console.log(error)
    }
}

export const fileDetails = async (fileId)=>{
    try {
        const fileData = await axios.post("/file/details",{fileId})
        console.log(fileData)
        if(fileData) return fileData
    } catch (error) {
        console.log(error)
    }
}

export const getFolderDetails = async(folderId)=>{
    try {
        const folderData = await axios.post("/folder/details",{folderId})
        console.log("Folder data = ",folderData.data.data.fileList)
        if(folderData) return folderData
    } catch (error) {
        console.log(error)
    }
}   

export const updateFileContent  = async (fileId,fileContent)=>{
    try {
        const newFileData = await axios.patch("/file/update/fileContent",{fileId,fileContent})
        if(newFileData) return newFileData
        return null;
    } catch (error) {
        console.log(error)
    }
}

export const deleteFolder = async(folderId)=>{
    try {
        const deletedFolder = await axios.delete("/folder/delete",{data:{folderId}})
        if(deletedFolder) return deletedFolder.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteFile = async(fileId)=>{
    try {
        console.log("deleted File ID : ",fileId)
        const deletedFile = await axios.delete("/file/delete",{data:{fileId}})
        console.log(deletedFile)
        if(deletedFile) return deletedFile.data
    } catch (error) {
        console.log(error)
    }
}

export const createFileForTheuser = async (userKey,fileName)=>{
    try {
        const fileData = await axios.post("/file/create/user",{userKey,fileName})
        if(fileData) return fileData.data
    } catch (error) {
        console.log(error)
    }
}

export const createFileForTheFolder = async (folderId,fileName)=>{
    try {
        const fileData = await axios.post("/file/create/folder",{folderId,fileName})
        if(fileData) return fileData.data
    } catch (error) {
        console.log(error)
    }
}

export const addFolderToTheUser = async (userKey,folderName)=>{
    try {
        const folderData = await axios.post("/folder/create",{userKey,folderName})
        if(folderData) return folderData.data
    } catch (error) {
        console.log(error)
    }
}