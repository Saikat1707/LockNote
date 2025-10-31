import React from 'react'
import FolderStructure from '../component/FolderStructure'
import Preview from '../component/Preview'
import "../css/pagesCSS/DashBoard.css"
import { useLocation } from 'react-router-dom'
const DashBoard = () => {
  const location = useLocation()
  console.log("Current location is : ",location.pathname)
  
  return (
    <div className='DashBoardMain'>
        <FolderStructure/>
        <Preview/>
    </div>
  )
}

export default DashBoard