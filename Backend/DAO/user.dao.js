import mongoose from "mongoose";
import userModel from "../model/user.model.js";

export const isUserExist = async (userKey) => {
  try {
    const existUser = await userModel.findOne({ userKey });
    return !!existUser;
  } catch (error) {
    console.log("❌ Error in Existing user finding DAO:", error.message);
    return false;
  }
};

export const createUserRoute = async (userKey, password) => {
  try {
    const user = await userModel.create({ userKey, password });
    return user || null;
  } catch (error) {
    console.log("❌ Error in create user DAO:", error.message);
    return null;
  }
};

export const getUserByKey = async (userKey) => {
  try {
    const user = await userModel.findOne({ userKey })
    return user || null;
  } catch (error) {
    console.log("❌ Error in getUserByKey DAO:", error.message);
    return null;
  }
};

export const getUserWithAllData = async (userKey) => {
  try {
    const user = await userModel.findOne({ userKey })
      .select("-password")
      .populate("folderList", "folderName fileList")
      .populate("fileList", "fileName");

    if(user.folderList.length == 0){
      console.log("No folder")
    }

    if(user.fileList.length == 0){
      console.log("No file")
    }
    return user || null;
  } catch (error) {
    console.log("❌ Error in getUserWithAllData DAO:", error.message);
    return null;
  }
};

// admin
export const getAllUser = async () => {
  try {
    const users = await userModel.find().select("-password");
    if (!users || users.length === 0) {
      console.log("ℹ️ No user found.");
      return [];
    }
    return users;
  } catch (error) {
    console.log("❌ Error in getting all users:", error.message);
    return null;
  }
};

export const deleteUser = async (userKey) => {
  try {
    const deletedUser = await userModel.findOneAndDelete({ userKey });
    if (!deletedUser) {
      console.log("⚠️ User not found with this key.");
      return null;
    }
    return deletedUser;
  } catch (error) {
    console.log("❌ Error while deleting user:", error.message);
    return null;
  }
};

