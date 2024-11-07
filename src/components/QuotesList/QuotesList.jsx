import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import "./QuotesList.css";
import QuotesCard from "./QuotesCard";
import QuoteGenerationButton from "../QuoteGeneration/QuoteGenerationButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import LoadingAnimation from "./LoadingAnimation";

function QuotesList() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [quotesPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const token = sessionStorage.getItem("authToken");

  const observer = useRef();

  
  // Load more items when the last item becomes visible
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchItems = async (page) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=${quotesPerPage}&offset=${
            currentPage * 20
          }`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data && response.data.data.length > 0) {
          setList((prevItems) => [...prevItems, ...response.data.data]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert("Please login to continue");
          window.location.href = "http://localhost:3000/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItems(currentPage);
  }, [currentPage, token, quotesPerPage]);

  return (
    <div className="quotes-list-container">
      <div className="paginator">
        {list.map((item, index) => (
          <QuotesCard
            key={index}
            item={item}
            ref={index === list.length - 1 ? lastItemRef : null}
          />
        ))}
        {loading && <LoadingAnimation/>}
        <div id="load-more-trigger"></div>
        <QuoteGenerationButton/>
        <LogoutButton/>
      </div>
    </div>
  );
}

export default QuotesList;
