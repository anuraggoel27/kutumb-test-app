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
            `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=0`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log("Logged In");
          if (response.status === 200) setLoggedIn(true);
        } catch (error) {
          console.log(error);
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
      const response = await axios.post(
        "https://assignment.stage.crafto.app/login",
        {
          username,
          otp,
        }
      );
      const token = response.data.token;
      console.log("Login Successful!");

      sessionStorage.setItem("authToken", token);
      dispatch(setToken(token));
      if (response.status === 200) {
        window.location.href = "http://localhost:3000/";
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
            <h1>Login</h1>
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
              <button onClick={()=>window.location.href="http://localhost:3000"}> GO TO FEED</button>
            </div>
            <div className="loggedin-button">
              <button onClick={()=>window.location.href="http://localhost:3000/upload"}> UPLOAD A NEW QUOTE </button>
            </div>
          </div>
          <LogoutButton/>
        </div>
      )}
    </div>
  );
}

export default Login;
