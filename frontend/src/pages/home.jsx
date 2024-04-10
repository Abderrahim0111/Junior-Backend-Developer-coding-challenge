import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import ThreadItem from "../components/threadItem";

const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setloading] = useState(true);

  useEffect(() => { 
    let ignore = false
    const fetchThreads = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/fetchThreads?page=${currentPage}&limit=6`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!data.error && !ignore) {
          setloading(false)
          setThreads(data.threads);
          setTotalPages(data.totalPages);
        }
        setloading(false)
      } catch (error) {
          setloading(false)
          console.log(error);
      }
    };
    if (!currentUser) {
      navigate("/login");
    } else {
      fetchThreads();
    }
    return () => {ignore = true}
  }, [navigate, currentUser, currentPage]);
  

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if(loading) return <p>Loading...</p>

  return (
    <div>
      <div className="m-10 flex flex-wrap justify-center gap-8">
        {threads.map((thread, index) => {
          return <ThreadItem key={index} thread={thread} />;
        })}
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="mx-2 px-3 py-1 disabled:opacity-60 rounded-lg bg-gray-200 text-gray-700"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`mx-2 px-3 py-1 rounded-lg ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="mx-2 px-3 py-1  disabled:opacity-60 rounded-lg bg-gray-200 text-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
