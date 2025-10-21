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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/component/FolderStructure.css";
import {
  addFolderToTheUser,
  createFileForTheFolder,
  createFileForTheuser,
  deleteFile,
  deleteFolder,
  getAllUserData,
  getFolderDetails,
} from "../BackendData";
import { useAppContext } from "../contextProvider";

const FolderStructure = () => {
  const { userKey } = useParams();
  const { setFileId } = useAppContext();

  const [folderData, setFolderData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [folderFiles, setFolderFiles] = useState({});
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all user data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllUserData(userKey);
      const data = response?.data?.data;
      setFileData(data?.fileList || []);
      setFolderData(data?.folderList || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch folder data");
    } finally {
      setLoading(false);
    }
  }, [userKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Folder click handler
  const handleFolderClick = async (folderId) => {
    setSelectedFolderId(folderId);
    setActiveFolder(folderId);
    setActiveFile(null);
    try {
      const response = await getFolderDetails(folderId);
      const data = response?.data?.data;
      if (data) setFolderFiles((prev) => ({ ...prev, [folderId]: data }));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch files for the folder");
    }
  };

  // File click handler
  const handleFileClick = (fileId) => {
    setFileId(fileId);
    setActiveFile(fileId);
    setActiveFolder(null);
  };

  // ===== FILE / FOLDER ACTIONS =====
  const addFileToUser = async (userKey, fileName) => {
    try {
      const res = await createFileForTheuser(userKey, fileName);
      if (!res) return toast.error("File not created");
      toast.success(`${fileName} created successfully`);
      await fetchData();
    } catch {
      toast.error(`${fileName} not created. Internal server error`);
    }
  };

  const addFileToFolder = async (folderId, fileName) => {
    try {
      const res = await createFileForTheFolder(folderId, fileName);
      if (!res) return toast.error("File not created");
      toast.success(`${fileName} created successfully`);
      await fetchData();

      // Refresh this folder's files immediately
      const folderRes = await getFolderDetails(folderId);
      setFolderFiles((prev) => ({ ...prev, [folderId]: folderRes?.data?.data }));
    } catch {
      toast.error(`${fileName} not created. Internal server error`);
    }
  };

  const addFolder = async (userKey, folderName) => {
    try {
      const res = await addFolderToTheUser(userKey, folderName);
      if (!res) return toast.error("Folder not created");
      toast.success(`${folderName} created successfully`);
      await fetchData();
    } catch {
      toast.error("Internal server error");
    }
  };

  const handleFolderDelete = async (folderId) => {
    try {
      const res = await deleteFolder(folderId);
      if (!res) return toast.error("Folder not deleted");
      toast.success(`Folder deleted: ${res.data.folderName}`);
      await fetchData();

      // Remove folder from folderFiles state
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
      toast.success(`File deleted: ${res.data.fileName}`);
      await fetchData();

      // Refresh folder files if inside a folder
      if (folderId) {
        const folderRes = await getFolderDetails(folderId);
        setFolderFiles((prev) => ({ ...prev, [folderId]: folderRes?.data?.data }));
      }
    } catch {
      toast.error("Internal server error");
    }
  };

  // ===== PROMPT HANDLERS =====
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

  if (loading) return <p className="FolderContainerMain">Loading...</p>;

  // ===== UI =====
  return (
    <div className="FolderContainerMain">
      <div className="FolderHeadings">
        <p>FINDER</p>
      </div>

      {/* ======= Action Buttons ======= */}
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

      {/* ======= Folder + File Display ======= */}
      {error ? (
        <p className="errorTag">{error}</p>
      ) : (
        <div className="FolderItems">
          {/* Top-level files */}
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

          {/* Folders */}
          {folderData.length === 0 ? (
            <p>No Folders</p>
          ) : (
            folderData.map((folder) => {
              const folderFileList =
                folderFiles[folder._id]?.fileList || folderFiles[folder._id] || folder.fileList;

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

                  {/* Folder Files */}
                  {selectedFolderId === folder._id && (
                    <div className="fileShowingArea">
                      {folderFileList && folderFileList.length > 0 ? (
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
