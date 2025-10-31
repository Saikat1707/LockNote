import React, { useEffect } from 'react'
import FolderStructure from '../component/FolderStructure'
import Preview from '../component/Preview'
import "../css/pagesCSS/DashBoard.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../ContextProvider'
import {toast} from "react-toastify"
import { userLogin } from '../BackendData'

const DashBoard = () => {
  const location = useLocation()
  console.log("Current location is : ",location.pathname)
  const {userKey} = useParams()

  const {isLogIn} = useAppContext()
  const navigate = useNavigate()

  useEffect(async () => {
    if(!isLogIn){
      const password = prompt("Enter your password:");

      if (!password) {
        toast.warn("Password is required");
        navigate("/");
        return;
      }else{
        try {
          const data = await userLogin(userKey,password)
          
          if(!data){
            toast.error("userKey or Password is incorrect")
            navigate("/")
          }
    
        } catch (error) {
          console.log(error.message)
        }
      }
    }
  }, [])
  
  
  return (
    <div className='DashBoardMain'>
        <FolderStructure/>
        <Preview/>
    </div>
  )
}

export default DashBoard