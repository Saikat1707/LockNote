import mongoose from "mongoose";


const fileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        default:null
    },
    folderId:{
        type:mongoose.Schema.ObjectId,
        ref:"Folder",
        default:null
    },
    fileName:{
        type:String,
        required:true
    },
    fileContent:{
        type:String,
    }
})

const File = mongoose.model("File",fileSchema)
export default File