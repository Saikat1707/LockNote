import React, { useEffect, useState, useCallback } from "react";
import {
  AiFillDelete,
  AiFillFolderOpen,
  AiFillFileText,
  AiFillFolderAdd,
  AiFillFileAdd,
} from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { HiTemplate } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/component/FolderStructure.css";
import {
  addFolderToTheUser,
  createFileForTheFolder,
  createFileForTheUser,
  deleteFile,
  deleteFolder,
  getAllUserData,
  getFolderDetails,
} from "../BackendData";
import { useAppContext } from "../ContextProvider";

const FolderStructure = () => {
  const { userKey } = useParams();
  const { setFileId, isLogin } = useAppContext();
  const navigate = useNavigate();

  const [folderData, setFolderData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [folderFiles, setFolderFiles] = useState({});
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState("");
  const [loadingFolderId, setLoadingFolderId] = useState(null); // <-- 1. ADDED STATE

  // 🟣 Fetch user workspace data (files + folders)
  const fetchData = useCallback(async (showLoader = false) => {
    try {
      if (firstLoad || showLoader) setLoading(true);
      const response = await getAllUserData(userKey);
      const data = response?.data;
      setFileData(data?.fileList || []);
      setFolderData(data?.folderList || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch folder data");
    } finally {
      setLoading(false);
      if (firstLoad) setFirstLoad(false);
    }
  }, [userKey, firstLoad]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🟣 Folder click (loads files only once)
  const handleFolderClick = async (folderId) => {
    const isSame = selectedFolderId === folderId;
    setSelectedFolderId(isSame ? null : folderId);
    setActiveFolder(folderId);
    setActiveFile(null);
    if (isSame) return;

    // If files already loaded once, don’t fetch again
    if (folderFiles[folderId]) return;

    try {
      setLoadingFolderId(folderId); // <-- 2. SET LOADER FOR THIS FOLDER
      const response = await getFolderDetails(folderId);
      const folderData =
        response?.data?.data?.fileList ||
        response?.data?.fileList ||
        response?.data ||
        [];
      setFolderFiles((prev) => ({ ...prev, [folderId]: folderData }));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch files for the folder");
    } finally {
      setLoadingFolderId(null); // <-- 2. REMOVE LOADER
    }
  };

  const handleFileClick = (fileId) => {
    setFileId(fileId);
    setActiveFile(fileId);
    setActiveFolder(null);
  };

  // 🟣 Create / Delete handlers
  const addFileToUser = async (userKey, fileName) => {
    try {
      const res = await createFileForTheUser(userKey, fileName);
      if (!res) return toast.error("File not created");
      await fetchData(true);
    } catch {
      toast.error(`${fileName} not created. Internal server error`);
    }
  };

  const addFileToFolder = async (folderId, fileName) => {
    try {
      const res = await createFileForTheFolder(folderId, fileName);
      if (!res) return toast.error("File not created");
      const newFile = res?.data?.data || res?.data;
      setFileId(newFile?._id);

      // Refresh folder content in background (no loader)
      const folderRes = await getFolderDetails(folderId);
      const updatedFiles =
        folderRes?.data?.data?.fileList ||
        folderRes?.data?.fileList ||
        folderRes?.data ||
        [];
      setFolderFiles((prev) => ({ ...prev, [folderId]: updatedFiles }));
    } catch {
      toast.error(`${fileName} not created. Internal server error`);
    }
  };

  const addFolder = async (userKey, folderName) => {
    try {
      const res = await addFolderToTheUser(userKey, folderName);
      if (!res) return toast.error("Folder not created");
      await fetchData(true);
    } catch {
      toast.error("Internal server error");
    }
  };

  const handleFolderDelete = async (folderId) => {
    try {
      const res = await deleteFolder(folderId);
      if (!res) return toast.error("Folder not deleted");
      await fetchData(true);
      setFolderFiles((prev) => {
        const copy = { ...prev };
        delete copy[folderId];
        return copy;
      });
      if (selectedFolderId === folderId) setSelectedFolderId(null);
    } catch {
      toast.error("Internal server error");
    }
  };

  const handleFileDelete = async (fileId, folderId = null) => {
    try {
      const res = await deleteFile(fileId);
      if (!res) return toast.error("File not deleted");

      if (folderId) {
        const folderRes = await getFolderDetails(folderId);
        const updatedFiles =
          folderRes?.data?.data?.fileList ||
          folderRes?.data?.fileList ||
          folderRes?.data ||
          [];
        setFolderFiles((prev) => ({ ...prev, [folderId]: updatedFiles }));
      } else {
        await fetchData(true);
      }
    } catch {
      toast.error("Internal server error");
    }
  };

  // 🟣 Add file/folder prompt wrappers
  const handleAddFileToUser = (e) => {
    e.stopPropagation();
    const name = prompt("Enter file name:")?.trim();
    if (!name) return toast.error("File name cannot be empty");
    addFileToUser(userKey, name);
  };

  const handleAddFolder = () => {
    const name = prompt("Enter folder name:")?.trim();
    if (!name) return toast.error("Folder name cannot be empty");
    addFolder(userKey, name);
  };

  const handleAddFileToFolder = (folderId) => {
    const name = prompt("Enter file name for this folder:")?.trim();
    if (!name) return toast.error("File name cannot be empty");
    addFileToFolder(folderId, name);
  };

  // 🟣 Show loader only for first dashboard entry
  if (firstLoad)
    return (
      <div className="FolderContainerMain loaderWrapper">
        <div className="loader"></div>
        <p>Loading workspace...</p>
      </div>
    );

  return (
    <div className="FolderContainerMain">
      <div className="FolderHeadings">
        <p>FINDER</p>
      </div>

      <div className="FolderActionButtons">
        <div className="FileFolderAction">
          <button onClick={handleAddFileToUser}>
            <AiFillFileAdd className="ActionIcons" /> File
          </button>
          <button onClick={handleAddFolder}>
            <AiFillFolderAdd className="ActionIcons" /> Folder
          </button>
        </div>
      </div>

      {error ? (
        <p className="errorTag">{error}</p>
      ) : (
        <div className="FolderItems">
          <div className="TopLevelFiles">
            {fileData.length === 0 ? (
              <p>No Files</p>
            ) : (
              fileData.map((item) => (
                <div
                  key={item._id}
                  className={`FileFolderItem ${activeFile === item._id ? "activeFile" : ""}`}
                  onClick={() => handleFileClick(item._id)}
                >
                  <p>
                    <AiFillFileText className="FileFolderIcon" /> {item.fileName}
                  </p>
                  <AiFillDelete
                    className="deleteIcon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileDelete(item._id);
                    }}
                  />
                </div>
              ))
            )}
          </div>

          <p className="FolderSectionTitle">
            All Folders <HiTemplate />
          </p>

          {folderData.length === 0 ? (
            <p>No Folders</p>
          ) : (
            folderData.map((folder) => {
              const folderFileList = folderFiles[folder._id] || [];

              return (
                <div key={folder._id} className="FileFolderItem openingFolder">
                  <div
                    className={`FolderTitle ${activeFolder === folder._id ? "activeFolder" : ""}`}
                    onClick={() => handleFolderClick(folder._id)}
                  >
                    <p>
                      <AiFillFolderOpen className="FileFolderIcon" /> {folder.folderName}
                    </p>
                    {selectedFolderId === folder._id && (
                      <div className="specificFolderAction">
                        <button onClick={() => handleAddFileToFolder(folder._id)}>
                          <AiFillFileAdd />
                        </button>
                        <AiFillDelete
                          className="folderDeleteIcon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFolderDelete(folder._id);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* 👇 [ 3. ] THIS IS THE CORRECTED JSX LOGIC 👇 */}
                  {selectedFolderId === folder._id && (
                    <div className="fileShowingArea">
                      {loadingFolderId === folder._id ? (
                        <div className="inline-loader-wrapper">
                          <p>Loading...</p>
                          <div className="loader small-loader"></div>
                        </div>
                      ) : folderFileList.length > 0 ? (
                        folderFileList.map((file) => (
                          <div
                            key={file._id}
                            className={`FolderFileHover ${
                              activeFile === file._id ? "activeFile" : ""
                            }`}
                          >
                            <p onClick={() => handleFileClick(file._id)}>
                              <BiRightArrow /> {file.fileName}
                            </p>
                            <AiFillDelete
                              className="FolderFileDeleteIcon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFileDelete(file._id, folder._id);
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <p>No files</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default FolderStructure;