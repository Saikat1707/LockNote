import React from 'react'
import FolderStructure from '../component/FolderStructure'
import Preview from '../component/Preview'
import "../css/pagesCSS/DashBoard.css"
const DashBoard = () => {
  return (
    <div className='DashBoardMain'>
        <FolderStructure/>
        <Preview/>
    </div>
  )
}

export default DashBoard