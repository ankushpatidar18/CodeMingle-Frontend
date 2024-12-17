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

      const newUsers = response.data.data.filter(
        (newUser) => !users.some((user) => user._id === newUser._id)
      );
  
      if (newUsers.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
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
        console.log(updatedUsers.length)
        console.log(currentIndex)
        if (currentIndex >= updatedUsers.length && updatedUsers.length > 0) {
          setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, updatedUsers.length - 1));
        }

        if (updatedUsers.length === 0) {
          setPage((prevPage) => prevPage + 1); // Load next batch
          setCurrentIndex(0);
        }
        return updatedUsers;
      });

      if (users.length <= 1) {
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

  if (users.length <= 0){
    return <p>No users available in your feed.</p>;
  }

  const currentUser = users[currentIndex];
  // if (!currentUser) {
  //   return <p>No users available in your feed.</p>;
  // }
  
  

  return (
    <div className="border border-gray-200 rounded-2xl p-6 w-80 mx-auto text-center shadow-lg bg-white mt-4 overflow-hidden relative">
    {/* Decorative background element */}
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-50"></div>
  
    {/* Circular Image */}
    <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
      <img
        src={currentUser?.photoUrl}
        alt={`${currentUser?.fullName}`}
        className="w-full h-full object-cover"
      />
    </div>
  
    {/* Name and Experience */}
    <h3 className="mt-3 text-xl font-bold text-gray-800">
      {currentUser?.fullName}
    </h3>
    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold mt-1">
      {currentUser?.experienceLevel}
    </span>
  
    {/* About and Looking For */}
    <div className="mt-4 text-left space-y-2">
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-blue-600">About:</span> {currentUser?.about}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-purple-600">Looking For:</span> {currentUser?.lookingFor}
      </p>
    </div>
  
    {/* Skills */}
    <div className="flex flex-wrap justify-center mt-4">
      {currentUser?.skills.map((skill, index) => (
        <span
          key={index}
          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs m-1 border border-gray-200"
        >
          {skill}
        </span>
      ))}
    </div>
  
    {/* Social Profiles */}
    <div className="flex justify-center mt-4 space-x-3">
      {currentUser?.githubProfile && (
        <a
          href={currentUser.githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-110 transition-transform duration-200"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="w-6 h-6"
          />
        </a>
      )}
      {currentUser?.leetCodeProfile && (
        <a
          href={currentUser.leetCodeProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-110 transition-transform duration-200"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
            alt="LeetCode"
            className="w-6 h-6"
          />
        </a>
      )}
    </div>
  
    {/* Buttons */}
    <div className="mt-4 flex space-x-2">
      <button
        onClick={() => handleAction("interested", currentUser?._id)}
        className="flex-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-600 transition-colors duration-200"
      >
        Interested
      </button>
      <button
        onClick={() => handleAction("ignored", currentUser?._id)}
        className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-600 transition-colors duration-200"
      >
        Ignore
      </button>
    </div>
  </div>


  );
};

export default Feed;
