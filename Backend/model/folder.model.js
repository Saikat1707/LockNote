import mongoose from "mongoose";


const folderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    folderName:{
        type:String,
        required:true
    },
    fileList:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"File"
        }
    ]
})

const Folder = mongoose.model("Folder",folderSchema)
export default Folder