import React from 'react'
import "./App.css"
import Authentication from './pages/Authentication'
import DashBoard from './pages/DashBoard'
import { Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
const App = () => {
  return (
    <>
    <ToastContainer 
        position="top-right"
        autoClose={2000}   // closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Routes>
      <Route path='/' element={<Authentication/>}/>
      <Route path='/:userKey' element={<DashBoard/>}/>
    </Routes>
    </>
  )
}
export default App