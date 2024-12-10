import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track pagination

  useEffect(() => {
    fetchFeed(page);
  }, [page]);

  const fetchFeed = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/user/feed?page=${pageNumber}`,
        { withCredentials: true }
      ); // Include pagination in the API call

      if (response.data.data.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...response.data.data]); // Append new data
      } else {
        toast.info("No more users available.", { autoClose: 500 });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feed:", error);
      setLoading(false);
    }
  };

  const handleAction = async (status, toUserId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user._id !== toUserId);
        if (currentIndex >= updatedUsers.length && updatedUsers.length > 0) {
          setCurrentIndex(0);
        }
        return updatedUsers;
      });

      if (users.length <= 1) {
        console.log(users)
        setPage((prevPage) => prevPage + 1); // Load next batch if users run out
        setCurrentIndex(0);
      } else {
        showNextUser();
      }
    } catch (error) {
      console.error(`Error handling ${status} action:`, error);
      toast.error("Error recording action.", { autoClose: 500 });
    }
  };

  const showNextUser = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, users.length - 1));
  };

  if (loading && users.length === 0) return <p>Loading...</p>;

  if (users.length === 0) return <p>No users available in your feed.</p>;

  const currentUser = users[currentIndex];
  console.log(currentIndex)
  console.log(currentUser)

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          width: "300px",
          margin: "auto",
        }}
      >
        <img
          src={currentUser?.photoUrl}
          alt={`${currentUser?.fullName}`}
          style={{ width: "100%", borderRadius: "10px" }}
        />
        <h3>
          {currentUser?.fullName} 
        </h3>
        <p>Age: {currentUser?.age}</p>
        <p>Gender: {currentUser?.gender}</p>
        {currentUser?.skills?.length > 0 && (
          <p>Skills: {currentUser?.skills.join(", ")}</p>
        )}
        <div>
          <button
            onClick={() => handleAction("interested", currentUser?._id)}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              margin: "5px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Interested
          </button>
          <button
            onClick={() => handleAction("ignored", currentUser?._id)}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              margin: "5px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
