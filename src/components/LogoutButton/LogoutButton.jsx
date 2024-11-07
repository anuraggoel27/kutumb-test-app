import React, {useState} from 'react';
import { CiLogout } from "react-icons/ci";
import "./LogoutButton.css"
import { useDispatch } from 'react-redux';
import { clearToken } from '../../redux/auth/authSlice';
function LogoutButton() {
    const [showText, setShowText] = useState(false);
    const dispatch = useDispatch();
    function handleClick() {
        sessionStorage.removeItem("authToken");
        dispatch(clearToken());
    }
    return ( 
        <div className="logout-button-container" onMouseOver={()=>setShowText(true)} onMouseLeave={()=>setShowText(false)} onClick={handleClick}>
            <button className="logout-button">{showText ? "LOGOUT"  : <CiLogout />} </button>
        </div>
     );
}

export default LogoutButton;