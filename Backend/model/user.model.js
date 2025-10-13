import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userKey:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    folderList:[
        {
        type:mongoose.Schema.ObjectId,
        ref:"Folder"
        }
    ],
    fileList:[
        {
        type:mongoose.Schema.ObjectId,
        ref:"File"
        }
    ]
})

const User = mongoose.model("User",userSchema)
export default User