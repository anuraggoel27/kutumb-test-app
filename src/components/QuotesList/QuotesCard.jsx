import React, { forwardRef } from "react";
import "./QuotesList.css";

const QuotesCard = forwardRef(({ item }, ref) => {

  function timeAgo(timestamp) {
    const now = new Date();
    const timeDifference = now - new Date(timestamp);

    // Calculate time differences in various units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (hours < 1) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 7) {
        return `${days} days ago`;
    } else {
        return `${Math.floor(days / 7)} weeks ago`;
    }
}
  return (
    <div className="quote-item" ref={ref}>
      <div className="quote-list-image-container">
        <img
          className="quote-list-image"
          src={item.mediaUrl}
          alt="Failed to Load"
        ></img>
        <div className="overlay">
            <p className="quote-text">{item.text}</p>
        </div>
      </div>
      <div className="quote-list-info-container">
        <p>{item.username}</p>
        <p>{timeAgo(item.createdAt)}</p>
      </div>
    </div>
  );
});

export default QuotesCard;
