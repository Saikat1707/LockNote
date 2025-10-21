
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