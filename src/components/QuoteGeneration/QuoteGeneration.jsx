import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./QuoteGeneration.css";

function QuoteGeneration() {
  const [quote, setQuote] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
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
  };

  const handleGetURL = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("Upload successful!");
      setImageURL(response.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed. Try again.");
    }
  };

  const handleUpload = async () => {
    try {
      await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
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
      console.log("File upload successful!");
    } catch (error) {
        alert("Quote generation failed");
        console.log(error);
    }
  };

  return (
    <div className="quote-generation-container">
      <div className="image-uploader">
        <label htmlFor="quote-image">Upload a JPG image for your quote</label>
        <input
          type="file"
          id="file-input"
          name="quote-image"
          target={file}
          onChange={handleFileChange}
          disabled={file}
          style={styles.fileInput}
        />
        <button onClick={() => document.getElementById("file-input").click()}>
          Choose Image
        </button>
      </div>

      {preview && (
        <div className="image-preview-container">
          <img className="image-preview" src={preview} alt="Preview" />
        </div>
      )}

      <div className="quote-container">
        <label htmlFor="quote">Enter your quote</label>
        <input
          type="text"
          name="quote"
          target={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
      </div>

      {file && (
        <div className="buttons-container">
          <div className="remove-image">
            <button onClick={handleImageRemove}>Remove Image</button>
          </div>
          <div className="get-image-url">
            <button onClick={handleGetURL}>Get URL</button>
          </div>
          {imageURL !== "" && (
            <div className="upload-image">
              <button onClick={handleUpload}> Generate Image </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuoteGeneration;

const styles = {
  fileInput: {
    display: "none",
  },
};
