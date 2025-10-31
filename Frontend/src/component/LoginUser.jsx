import React, { useState } from 'react';
import "../css/component/logincss.css";
import { userLogin } from '../BackendData';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoginUser = () => {
  const [userKeyLogin, setUserKeyLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userKeyLogin || !password) {
      toast.warn("Please enter both key and password");
      return;
    }

    try {
      console.log("Attempting login with:", userKeyLogin, password);
      const user = await userLogin(userKeyLogin, password);

      if (user) {
        console.log("Login successful:", user);
        toast.success("Successfully logged in");
        navigate(`/${userKeyLogin}`);
      } else {
        toast.error("Invalid key or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className='loginRouteBox'>
      <p>
        Go to LockNote.com/
        <span>
          <input
            type="text"
            placeholder="Enter key"
            value={userKeyLogin}
            onChange={(e) => setUserKeyLogin(e.target.value)}
          />
        </span>
        (or write directly in the address bar)
      </p>
      <p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Go</button>
        (Enter your route password)
      </p>
    </div>
  );
};

export default LoginUser;
