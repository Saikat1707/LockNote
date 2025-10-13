import folderModel from "../model/folder.model.js";

export const isExistedFolder = async (userId, folderName) => {
  try {
    const existingFolder = await folderModel.findOne({
      user: userId,
      folderName: folderName,
    });
    return !!existingFolder;
  } catch (error) {
    console.log("❌ Error while checking existing folder:", error.message);
    return false;
  }
};


export const createFolder = async (userId, folderName) => {
  try {
    const folder = await folderModel.create({ user: userId, folderName });
    if (folder) return await folder.populate("user fileList");
    return null;
  } catch (error) {
    console.log("❌ Error while creating folder:", error.message);
    return null;
  }
};

export const renameFolder = async (folderId, newName) => {
  try {
    const updatedFolder = await folderModel.findByIdAndUpdate(
      folderId,
      { folderName: newName },
      { new: true, runValidators: true }
    );
    if (!updatedFolder) {
      console.log("⚠️ Folder not found for rename.");
      return null;
    }
    return updatedFolder;
  } catch (error) {
    console.log("❌ Error while renaming folder:", error.message);
    return null;
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const deletedFolder = await folderModel.findByIdAndDelete(folderId);
    if (deletedFolder.fileList && deletedFolder.fileList.length > 0) {
      await fileModel.deleteMany({ _id: { $in: deletedFolder.fileList } });
    }
    if (!deletedFolder) {
      console.log("⚠️ Folder not found for deletion.");
      return null;
    }
    return deletedFolder;
  } catch (error) {
    console.log("❌ Error while deleting folder:", error.message);
    return null;
  }
};

export const addFileToFolder = async (folderId, fileId) => {
  try {
    const updatedFolder = await folderModel.findByIdAndUpdate(
      folderId,
      { $push: { fileList: fileId } },
      { new: true }
    );
    return updatedFolder;
  } catch (error) {
    console.log("❌ Error while adding file to folder:", error.message);
    return null;
  }
};

export const removeFileFromFolder = async (folderId, fileId) => {
  try {
    const updatedFolder = await folderModel.findByIdAndUpdate(
      folderId,
      { $pull: { fileList: fileId } },
      { new: true }
    );
    return updatedFolder;
  } catch (error) {
    console.log("❌ Error while removing file from folder:", error.message);
    return null;
  }
};

export const getFolderById = async (folderId) => {
  try {
    const folder = await folderModel
      .findById(folderId)
      .populate("fileList", "fileName");
    return folder || null;
  } catch (error) {
    console.log("❌ Error while fetching folder by ID:", error.message);
    return null;
  }
};
