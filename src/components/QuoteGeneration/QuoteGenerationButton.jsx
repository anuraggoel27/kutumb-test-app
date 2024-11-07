import React, { useState } from 'react';

function QuoteGenerationButton() {
    const [showText, setShowText] = useState(false);
    return ( 
        <div onMouseOver={()=>setShowText(true)} onMouseLeave={()=>setShowText(false)} onClick={()=>window.location.href=process.env.REACT_APP_FRONTEND_URL+"upload"}>
            <button className="generation-floating-button" > {showText ? "Add Quote" : "+"} </button>
        </div>
     );
}

export default QuoteGenerationButton;