import fileModel from "../model/file.model.js";
import {getUserByKey} from "../DAO/user.dao.js"
import folderModel from "../model/folder.model.js"
import userModel from "../model/user.model.js";

export const isFileExistedOfUser = async (userKey, fileName) => {
  try {
    const user = await getUserByKey(userKey);
    if (!user) return false;

    const file = await fileModel.findOne({
      userId: user._id,
      fileName
    });

    return !!file;
  } catch (error) {
    console.log("❌ Error in finding existing file DAO:", error.message);
    return false;
  }
};

export const isFileExistedOfFolder = async (folderId,fileName) =>{
  try {
    const file = await fileModel.findOne({
      folderId,fileName
    })
    return !!file
  } catch (error) {
    console.log("Error is finding file in folder : ",error.message)
    return false
  }
}

export const createFileOfUser = async (userKey,fileName,fileContent = "") => {
  try {
    const user = await getUserByKey(userKey)
    if(!user){
      console.log("Can not get the user")
      return null
    }
    const file = await fileModel.create({ userId:user?._id,fileName,fileContent});
    user.fileList.push(file._id)
    await user.save();
    return file;
  } catch (error) {
    console.log("❌ Error in creating file DAO:", error.message);
    return null;
  }
};


export const createFileOfFolder = async (folderId,fileName) => {
  try {
    const folder = await folderModel.findById(folderId)
    if (!folder) {
      console.log("Folder not found");
      return null;
    }
    const file = await fileModel.create({ folderId,fileName});
    folder.fileList.push(file._id)
    await folder.save();
    return file;
  } catch (error) {
    console.log("❌ Error in creating file DAO:", error.message);
    return null;
  }
};


export const deleteFileDao = async (fileId) => {
  try {
    const deletedFile = await fileModel.findByIdAndDelete(fileId);
    if (!deletedFile) return null;
    if (deletedFile.folderId == null) {
      await userModel.findByIdAndUpdate(
        deletedFile.userId,
        { $pull: { fileList: deletedFile._id } }
      );
    } else if (deletedFile.userId == null) {
      await folderModel.findByIdAndUpdate(
        deletedFile.folderId,
        { $pull: { fileList: deletedFile._id } }
      );
    }
    return deletedFile;
  } catch (error) {
    console.log("❌ Error while deleting file DAO:", error.message);
    return null;
  }
};

export const updateFileContentDao = async (fileId, fileContent) => {
  try {
    const updatedFile = await fileModel.findByIdAndUpdate(
      fileId,
      { fileContent },
      { new: true }
    );
    return updatedFile;
  } catch (error) {
    console.log("❌ Error while updating file content DAO:", error.message);
    return null;
  }
};

export const updateFileNameDao = async (fileId, newFileName) => {
  try {
    const file = await fileModel.findById(fileId);
    if (!file) {
      console.log("File not found");
      return null;
    }

    // Check if it belongs to a user
    if (file.userId) {
      const existing = await fileModel.findOne({
        userId: file.userId,
        fileName: newFileName
      });
      if (existing) {
        console.log("File name already exists for this user");
        return null;
      }
    }

    // Check if it belongs to a folder
    if (file.folderId) {
      const existing = await fileModel.findOne({
        folderId: file.folderId,
        fileName: newFileName
      });
      if (existing) {
        console.log("File name already exists in this folder");
        return null;
      }
    }

    const updatedFile = await fileModel.findByIdAndUpdate(
      fileId,
      { fileName: newFileName },
      { new: true }
    );

    return updatedFile;
  } catch (error) {
    console.log("❌ Error while updating file name DAO:", error.message);
    return null;
  }
};


export const getFileById = async (fileId) => {
  try {
    const file = await fileModel.findById(fileId);
    return file || null;
  } catch (error) {
    console.log("❌ Error while fetching file by ID DAO:", error.message);
    return null;
  }
};
