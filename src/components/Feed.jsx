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
    <div className="border border-gray-300 rounded-lg p-6 w-80 mx-auto text-center shadow-lg bg-gray-50 mt-4">
  {/* Circular Image */}
  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
    <img
      src={currentUser?.photoUrl}
      alt={`${currentUser?.fullName}`}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Name and Experience */}
  <h3 className="mt-2 text-xl font-bold text-gray-800">
    {currentUser?.fullName}{" "}
    <span className="text-blue-500 text-sm">
      ({currentUser?.experienceLevel})
    </span>
  </h3>

  {/* About and Looking For */}
  <div className="mt-4 text-left">
    <p className="text-sm text-gray-600">
      <strong>About:</strong> {currentUser?.about}
    </p>
    <p className="text-sm text-gray-600 mt-2">
      <strong>Looking For:</strong> {currentUser?.lookingFor}
    </p>
  </div>

  {/* Skills */}
  <div className="flex flex-wrap justify-center mt-4">
    {currentUser?.skills.map((skill, index) => (
      <span
        key={index}
        className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm m-1 shadow-sm"
      >
        {skill}
      </span>
    ))}
  </div>

  {/* Social Profiles */}
  <div className="flex justify-center mt-6 space-x-4">
    {currentUser?.githubProfile && (
      <a
        href={currentUser.githubProfile}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          className="w-8 h-8"
        />
      </a>
    )}
    {currentUser?.leetCodeProfile && (
      <a
        href={currentUser.leetCodeProfile}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
          alt="LeetCode"
          className="w-8 h-8"
        />
      </a>
    )}
  </div>

  {/* Buttons */}
  <div className="mt-4">
    <button
      onClick={() => handleAction("interested", currentUser?._id)}
      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 mr-2"
    >
      Interested
    </button>
    <button
      onClick={() => handleAction("ignored", currentUser?._id)}
      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
    >
      Ignore
    </button>
  </div>
</div>


  );
};

export default Feed;
