import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setToken } from '../../redux/auth/authSlice';

function Login() {
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async( ) => {
        try {
            const response = await axios.post('https://assignment.stage.crafto.app/login', {
                username,
                otp
            });

            const token = response.data.token;
            dispatch(setToken(token)); 

        } catch (error) {
            console.error('Login failed:', error);
        }
    }    
    return ( 
        <div className="login-container">
            <div className="input-container">
                <label htmlFor="username">Username</label>
                <input name="username" type="text" target={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="otp-container">
                <label htmlFor="otp">OTP</label>
                <input name="otp" type="text" target={otp} onChange={(e)=>setOtp(e.target.value)}/>
            </div>
            <div className="button-container">
                <button onClick={handleLogin}>Submit</button>
            </div>
        </div>
    );
}

export default Login;