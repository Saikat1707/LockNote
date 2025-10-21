import React, { useState } from 'react'
import "../css/component/logincss.css"

import { userLogin } from '../BackendData';
import { useNavigate } from 'react-router-dom';
const LoginUser = () => {
  const [userKeyLogin, setUserKeyLogin] = useState()
  const [password, setPassword] = useState();
  const navigation = useNavigate()

  const handleLogin = async ()=>{
    console.log(userKeyLogin,password)
    try {
      const user = await userLogin(userKeyLogin,password)
      if(user){
        console.log(user)
        navigation(`/${userKeyLogin}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='loginRouteBox'>
      <p>Go to LockNote.com/ 
        <span><input type="text" placeholder='Enter key' value={userKeyLogin} onChange={(e)=>setUserKeyLogin(e.target.value)}/></span> 
        (or write directly in the address bar)</p>
      <p><input type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/> <button onClick={handleLogin}>Go</button>
       (Enter you route password)</p>
    </div>
  )
}

export default LoginUser