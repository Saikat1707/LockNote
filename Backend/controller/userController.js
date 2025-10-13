import { createUserRoute, getUserByKey, getUserWithAllData, isUserExist} from "../DAO/user.dao.js"
import {comparePassword, generatePassword} from "../utils/passwordUtil.js"
import {badResponse,goodResponse} from "../utils/response.js"


const createUser = async (req,res)=>{
    try {
        const{userKey,password} = req.body
        let trimmedKey = userKey.trim()
        if(!userKey || !password) return badResponse(res,"Missing Data")
        const isExist = await isUserExist(userKey)
        if(isExist){
            return badResponse(res,"User is already existed in the DATABASE")
        }
        const hashedPassword = await generatePassword(password)
        const user = await createUserRoute(trimmedKey,hashedPassword)
        if(!user){
            return badResponse(res,"user is not created")
        }
        return goodResponse(res,"Successfully user created",user)
    } catch (error) {
        console.log(error.message)
        return badResponse(res,"Server error while creating the user",error.message)
    }
}

const loginUser = async (req,res)=>{
    try {
        const {userKey,password} = req.body
        if(!userKey || !password) return badResponse(res,"Missing data")
        const trimmedKey = userKey.trim()
        const user = await getUserByKey(trimmedKey)
        if (!user) return badResponse(res, "User does not exist");
        if (!user?.password) {
            return badResponse(res, "Invalid user data");
        }
        const isMatched = await comparePassword(password,user?.password)
        if(!isMatched) return badResponse(res,"Log in Credentials are invalid")
        
        const userWithAllData = await getUserWithAllData(trimmedKey)
        return goodResponse(res,"Successfully fetched User",userWithAllData)
    } catch (error) {
        console.log(error.message)
        return badResponse(res,"Server error while logging in the user",error.message)
    }
}

const getUserWithAllDetails = async(req,res)=>{
    try {
        const{userKey} = req.body
        if(!userKey) return badResponse(res,"All the fields are required")
        let trimmedKey = userKey.trim()
        const user = await getUserWithAllData(trimmedKey)
        if(!user) return badResponse(res,"Could not fetch the user")
        return goodResponse(res,"Successfully fetched the user",user)
    } catch (error) {
        console.log("Error in fetching the user ",error.message)
        return badResponse(res,"Server error while fetching the user",error.message)
    }
}
export default {createUser,loginUser,getUserWithAllDetails}