import React from 'react'
import '../css/component/createRouteBox.css'
const CreateRouteBox = () => {
  return (
    <div className='createRouteBox'>
        <p>
          Enter your routing key
          <span>
            <input type="text" placeholder='Enter key' />
          </span>
          (This is your unique route identifier)
        </p>

        <p>
          <input type="password" placeholder='Enter passkey' /> 
          <button>Go</button>
          (Enter your route password to continue)
        </p>

        <p className="infoText">
          <strong>Note:</strong> Once you create a route, you won’t be able to delete it later.
        </p>
    </div>
  )
}

export default CreateRouteBox