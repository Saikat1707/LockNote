import React, { useState } from 'react'
import '../css/component/createRouteBox.css'
import { userSignUp } from '../BackendData';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const CreateRouteBox = () => {
  const [userKeySignUp, setUserKeySignUp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleSignUp = async () => {
    if (!userKeySignUp || !password) {
      toast.warn("Please enter both key and password");
      return;
    }

    setLoading(true);
    try {
      const user = await userSignUp(userKeySignUp, password);
      navigation(`/${user.data.data.userKey}`);
      toast.success("Successfully logged in");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='createRouteBox'>
      <p>
        Enter your routing key
        <span>
          <input 
            type="text" 
            placeholder='Enter key' 
            value={userKeySignUp} 
            onChange={(e) => setUserKeySignUp(e.target.value)} 
          />
        </span>
        (This is your unique route identifier)
      </p>

      <p>
        <input 
          type="password" 
          placeholder='Enter password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        /> 
        <button onClick={handleSignUp} disabled={loading}>
          {loading ? <span className="loader"></span> : "Go"}
        </button>
        (Enter your route password to continue)
      </p>

      <p className="infoText">
        <strong>Note:</strong> Once you create a route, you won’t be able to delete it later.
      </p>
    </div>
  );
};

export default CreateRouteBox;
