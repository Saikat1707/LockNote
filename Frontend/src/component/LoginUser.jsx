import React from 'react'
import "../css/component/logincss.css"
const LoginUser = () => {
  return (
    <div className='loginRouteBox'>
      <p>Go to LockNote.com/ 
        <span><input type="text" placeholder='Enter key'/></span> 
        (or write directly in the address bar)</p>
      <p><input type="password" placeholder='Enter passkey'/> <button>Go</button>
       (Enter you route password)</p>
    </div>
  )
}

export default LoginUser