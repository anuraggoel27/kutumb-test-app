import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/auth/authSlice';

function WelcomePage() {
    const dispatch = useDispatch();
    const handleLogout = () =>{
        sessionStorage.removeItem('authToken');
        dispatch(setToken(null));
    }
    return ( 
        <div>
            <p>You are already logged in</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
     );
}

export default WelcomePage;