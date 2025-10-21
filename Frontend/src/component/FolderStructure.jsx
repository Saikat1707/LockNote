import { BiRightArrow } from "react-icons/bi"; 
import { HiTemplate } from "react-icons/hi"; 
import { AiFillFolderOpen, AiFillFileText, AiFillFolderAdd, AiFillFileAdd, AiFillDelete } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react';
import "../css/component/FolderStructure.css";
import { getAllUserData, getFolderDetails } from "../BackendData";
import { useParams } from "react-router-dom";
import { useAppContext } from "../contextProvider";

const FolderStructure = () => {
  // const [userData, setUserData] = useState(null);
  const [folderData, setFolderData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [folderFiles, setFolderFiles] = useState({}); // folder-specific files
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {userKey} = useParams(); // destructure useParams
  const { setFileId } = useAppContext();
  const [selectedFolderId, setSelectedFolderId] = useState(null);


  const [activeFolder, setActiveFolder] = useState();
  const [activeFile, setActiveFile] = useState();

  

  // Fetch all user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllUserData(userKey);
        setFileData(response.data?.data?.fileList || []);
        setFolderData(response.data?.data?.folderList || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch folder data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userKey]);

  // Handle folder click
  const handleFolderClick = async (folderId) => {
    setSelectedFolderId(folderId);
    setActiveFolder(folderId)
    if (!folderFiles[folderId]) {
      try {
        const response = await getFolderDetails(folderId);
        if (response?.data?.data) {
          setFolderFiles(prev => ({ ...prev, [folderId]: response.data.data }));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch files for the folder");
      }
    }
  };

  // Handle file click
  const handleFileClick = (fileId) => {
    setFileId(fileId);
    setActiveFile(fileId)
    setActiveFolder("")
  };


  const FolderAction = (folderId) => {
    console.log("Add file to the folder id:", folderId);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='FolderContainerMain'>
      <div className="FolderHeadings">
        <p>FINDER</p>
      </div>

      <div className="FolderActionButtons">
        <div className="FileFolderAction">
          <button><AiFillFileAdd className="ActionIcons"/>File</button>
          <button><AiFillFolderAdd className="ActionIcons"/>Folder</button>
        </div>
        <button><AiFillDelete className="ActionIcons"/>Delete</button>
      </div>

      {error === "" ? (
        <div className="FolderItems">
          {/* Top-level files */}
          {fileData?.map(item => (
            <div key={item._id} className={`FileFolderItem ${activeFile == item._id ? "activeFile":""}`} onClick={() => handleFileClick(item._id)}>
              <p><AiFillFileText className="FileFolderIcon"/>{item.fileName}</p>
            </div>
          ))}

          <p>All Folders<HiTemplate /></p>

          {/* Folders */}
          {folderData?.map(folder => (
            <div key={folder._id} className="FileFolderItem openingFolder" onClick={() => handleFolderClick(folder._id)}>
              <div className={`FolderTitle ${activeFolder == folder._id?"activeFolder":""}`}>
                <p><AiFillFolderOpen className="FileFolderIcon"/>{folder.folderName}</p>
                {selectedFolderId === folder._id && (
                  <div className="specificFolderAction">
                    <button onClick={() => FolderAction(folder._id)}><AiFillFileAdd/></button>
                  </div>
                )}
              </div>

              {selectedFolderId === folder._id && (
                <div className="fileShowingArea">
                  {(folderFiles[folder._id]?.fileList || folderFiles[folder._id] || folder.fileList)?.map(file => (
                    <p key={file._id} onClick={() => handleFileClick(file._id)} className={`${activeFile == file._id?"activeFile":""}`}><BiRightArrow/>{file.fileName}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div><p className="errorTag">{error}</p></div>
      )}
    </div>
  );
};

export default FolderStructure;
