import React, {useState} from 'react';
import { RiGalleryView2 } from "react-icons/ri";

function FeedButton() {
    const [showText, setShowText] = useState(false);
    return ( 
        <div onMouseOver={()=>setShowText(true)} onMouseLeave={()=>setShowText(false)} onClick={()=>window.location.href="http://localhost:3000/"}>
            <button className="generation-floating-button" > {showText ? "FEED" : <RiGalleryView2/>} </button>
        </div>
     );
}

export default FeedButton;