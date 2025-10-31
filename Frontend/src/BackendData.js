import axios from "../src/axiosConfig";
import { toast } from "react-toastify";

const handleError = (error, customMsg = "Something went wrong") => {
  console.error(error);
  toast.error(error?.response?.data?.message || error?.message || customMsg);
};

const handleSuccess = (message) => {
  toast.success(message);
};

// ===== USER =====
export const getAllUserData = async (userKey) => {
  try {
    const { data } = await axios.post("/user/details", { userKey });
    console.log("User Data:", data);
    return data;
  } catch (error) {
    handleError(error, "Failed to fetch user data");
  }
};

export const userLogin = async (userKey, password) => {
  try {
    const { data } = await axios.post("/user/login", { userKey, password });
    if (!data) {
      toast.warn("Invalid login credentials");
      return null;
    }
    handleSuccess("Login successful");
    return data;
  } catch (error) {
    handleError(error, "Login failed");
  }
};

export const userSignUp = async (userKey, password) => {
  try {
    const { data } = await axios.post("/user/create", { userKey, password });
    handleSuccess("Account created successfully");
    return data;
  } catch (error) {
    handleError(error, "Signup failed");
  }
};

// ===== FILES =====
export const fileDetails = async (fileId) => {
  try {
    const { data } = await axios.post("/file/details", { fileId });
    console.log("File data:", data);
    return data;
  } catch (error) {
    handleError(error, "Failed to load file details");
  }
};

export const updateFileContent = async (fileId, fileContent) => {
  try {
    const { data } = await axios.patch("/file/update/fileContent", { fileId, fileContent });
    handleSuccess("File updated successfully");
    return data;
  } catch (error) {
    handleError(error, "File update failed");
  }
};

export const deleteFile = async (fileId) => {
  try {
    console.log("Deleting File ID:", fileId);
    const { data } = await axios.delete("/file/delete", { data: { fileId } });
    handleSuccess("File deleted successfully");
    return data;
  } catch (error) {
    handleError(error, "Failed to delete file");
  }
};

export const createFileForTheUser = async (userKey, fileName) => {
  try {
    const { data } = await axios.post("/file/create/user", { userKey, fileName });
    handleSuccess("New file created successfully");
    return data;
  } catch (error) {
    handleError(error, "Failed to create file");
  }
};

export const createFileForTheFolder = async (folderId, fileName) => {
  try {
    const { data } = await axios.post("/file/create/folder", { folderId, fileName });
    handleSuccess("File added to folder successfully");
    return data;
  } catch (error) {
    handleError(error, "Failed to create file in folder");
  }
};

// ===== FOLDERS =====
export const getFolderDetails = async (folderId) => {
  try {
    const { data } = await axios.post("/folder/details", { folderId });
    console.log("Folder data:", data?.data?.fileList);
    console.log(data)
    return data;
  } catch (error) {
    handleError(error, "Failed to fetch folder details");
  }
};

export const addFolderToTheUser = async (userKey, folderName) => {
  try {
    const { data } = await axios.post("/folder/create", { userKey, folderName });
    handleSuccess("Folder created successfully");
    return data;
  } catch (error) {
    handleError(error, "Failed to create folder");
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const { data } = await axios.delete("/folder/delete", { data: { folderId } });
    handleSuccess("Folder deleted successfully");
    return data;
  } catch (error) {
    handleError(error, "Failed to delete folder");
  }
};
