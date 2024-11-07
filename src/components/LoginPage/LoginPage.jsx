import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setToken } from "../../redux/auth/authSlice";
import "./login.css";
import LogoutButton from "../LogoutButton/LogoutButton";

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const check = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_GET_QUOTES_URL,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.status === 200) setLoggedIn(true);
        } catch (error) {
          if (error.response.status === 401) {
            setLoggedIn(false);
          }
        }
      };
      check();
    }
  }, []);

  const handleLogin = async () => {
    try {
      if(otp !== process.env.REACT_APP_OTP){
        alert("Incorrect OTP entered!");
        window.location.href = process.env.REACT_APP_FRONTEND_URL + "login";
      }else if(username === ""){
        alert("Username cant be empty");
        window.location.href = process.env.REACT_APP_FRONTEND_URL + "login";
      }else{
        const response = await axios.post(
          process.env.REACT_APP_LOGIN_URL,
          {
            username,
            otp,
          }
        );
        const token = response.data.token;
  
        sessionStorage.setItem("authToken", token);
        dispatch(setToken(token));
        if (response.status === 200) {
          window.location.href = process.env.REACT_APP_FRONTEND_URL;
        }
      }
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="login-container">
      {!loggedIn && (
        <div className="login-page-content">
          <div className="login-page-heading">
            <h1>LOGIN</h1>
          </div>
          <div className="input-container">
            <input
              name="username"
              type="text"
              placeholder="USERNAME"
              target={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              name="otp"
              type="text"
              placeholder="OTP"
              target={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button onClick={handleLogin}>Submit</button>
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="loggedin-content">
          <div className="loggedin-heading">
            <h1>ALREADY LOGGED IN!</h1>
          </div>
          <div className="loggedin-buttons">
            <div className="loggedin-button">
              <button onClick={()=>window.location.href=process.env.REACT_APP_FRONTEND_URL}> GO TO FEED</button>
            </div>
            <div className="loggedin-button">
              <button onClick={()=>window.location.href=process.env.REACT_APP_FRONTEND_URL}> UPLOAD A NEW QUOTE </button>
            </div>
          </div>
          <LogoutButton/>
        </div>
      )}
    </div>
  );
}

export default Login;
