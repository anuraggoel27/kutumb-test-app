import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import "./QuotesList.css";


function QuotesList() {
    const [list, setList] = useState([]);
    const token = useSelector((state) => state.auth.token);
    
    
    useEffect(()=>{
        const getQuotes = async() => {
            try{
                const response = await axios.get('https://assignment.stage.crafto.app/getQuotes?limit=20&offset=0', {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response.data);
                setList(response.data.data);
            }catch(error){
                alert("Failed to get items");
                console.log(error);
            }
        }
        getQuotes();
    }, [token]);
    
    return ( 
        <div className="quotes-list-container">
            <p>This contains all the images uploaded</p>
            <div>
                {list.length > 0 && list.map((item, index) => {
                    console.log(item.mediaUrl);
                    return (<img className="quote-list-image" key={index} src={item.mediaUrl} alt="Failed to Load"></img>)
                })}
            </div>
        </div>

    );
}

export default QuotesList;