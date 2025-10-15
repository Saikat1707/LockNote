import React from 'react'
import "../css/component/FolderStructure.css"
const FolderStructure = () => {
  return (
    <div className='FolderContainerMain'>
      <div className="FolderHeadings">
        <p>FINDER</p>
      </div>
      <div className="FolderActionButtons">
        <div className="FileFolderAction">
          <button>File</button>
          <button>Folder</button>
        </div>
        <button>Delete</button>
      </div>
      <div className="FolderItems"></div>
    </div>
  )
}

export default FolderStructure