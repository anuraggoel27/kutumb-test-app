import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import LogoutButton from "../LogoutButton/LogoutButton";
import { CiCircleRemove } from "react-icons/ci";

import "./QuoteGeneration.css";
import FeedButton from "../QuotesList/FeedButton";

function QuoteGeneration() {
  const [quote, setQuote] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "image/jpeg") {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Only JPG files are allowed.");
    }
  };

  const handleImageRemove = () => {
    setFile(null);
    setPreview(null);
    setImageURL("");
  };

  const handleGetURL = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        process.env.REACT_APP_UPLOAD_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageURL(response.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleUpload = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_POST_URL,
        {
          text: quote,
          mediaURL: imageURL,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Quote uploaded successfully!")
    } catch (error) {
      alert("Quote generation failed");
    }
  };

  return (
    <div className="quote-generation-container">
      <div className="quote-generation-content">
        <div className="quote-generation-heading">
          <h1>CREATE YOUR QUOTE</h1>
        </div>
        <div className="image-uploader">
          {/*<label htmlFor="quote-image">Upload a JPG image for your quote</label>*/}
            <div className="image-preview-container">
              {preview && <img className="image-preview" src={preview} alt="Preview" />}
            </div>

          <input
            type="file"
            id="file-input"
            name="quote-image"
            target={file}
            onChange={handleFileChange}
            disabled={file}
            style={styles.fileInput}
          />
          </div>
          <div className="stage-control-buttons">
          <button className="stage-image" onClick={() => document.getElementById("file-input").click()} disabled={preview !== null}>
           <FaUpload/>
          </button>
          <div >
            <button className="remove-image" onClick={handleImageRemove} disabled={preview === null}><CiCircleRemove/></button>
          </div>
        </div>

        <div className="quote-container">
          {/*<label htmlFor="quote">Enter your quote</label>*/}
          <input
            type="text"
            name="quote"
            placeholder="Enter your quote"
            target={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
        </div>

        {file && (
          <div className="buttons-container">
            
            <div className="get-image-url">
              <button onClick={handleGetURL} disabled={imageURL !== ""}>
                GET URL
              </button>
            </div>
            {imageURL !== "" && (
              <div className="upload-image">
                <button onClick={handleUpload}> GENERATE IMAGE </button>
              </div>
            )}
          </div>
        )}
        <FeedButton />
        <LogoutButton />
      </div>
    </div>
  );
}

export default QuoteGeneration;

const styles = {
  fileInput: {
    display: "none",
  },
};
