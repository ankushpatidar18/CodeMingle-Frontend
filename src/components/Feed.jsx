import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { debounce } from "lodash";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    // Fetch new results when search term changes
    setUsers([]); // Clear users list on new search
    setPage(1); // Reset to the first page
    fetchFeed(1, searchTerm);
  }, [searchTerm]);

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 500);

  const fetchFeed = async (pageNumber, skill) => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await axios.get(
        `http://localhost:8080/user/feed?page=${pageNumber}&skill=${skill}`,
        { withCredentials: true }
      );

      const newUsers = response.data.data.filter(
        (newUser) => !users.some((user) => user._id === newUser._id)
      );

      if (newUsers.length === 0 && pageNumber === 1) {
        setNoResults(true); // Show "no results" only if this is the first page
      }

      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
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

        if (updatedUsers.length === 0) {
          setPage((prevPage) => prevPage + 1);
          fetchFeed(page + 1, searchTerm);
        } else {
          setCurrentIndex((prevIndex) =>
            prevIndex >= updatedUsers.length ? updatedUsers.length - 1 : prevIndex
          );
        }

        return updatedUsers;
      });
    } catch (error) {
      console.error(`Error handling ${status} action:`, error);
      toast.error("Error recording action.", { autoClose: 500 });
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    debouncedSearch(term);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mx-6 mt-2 sm:mx-8 md:mx-16 lg:mx-24 mb-4">
  <div className="relative">
    <input
      type="text"
      placeholder="Search by skill"
      className="w-full p-4 pl-12 pr-4 text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition-colors duration-300 shadow-sm hover:shadow-md"
      onChange={handleSearchChange}
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  </div>
</div>

      {loading && users.length === 0 && <p>Loading...</p>}

      {!loading && noResults && users.length === 0 && (
  <p className="text-center text-gray-500 mt-4">
    No users found for "{searchTerm}". Try a different search term.
  </p>
)}


      {/* User Card */}
      {!loading && users.length > 0 && (
        <div className="border border-gray-200 rounded-2xl p-6 w-80 mx-auto text-center shadow-lg bg-white mt-4 overflow-hidden relative">
          <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={users[currentIndex]?.photoUrl}
              alt={`${users[currentIndex]?.fullName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-3 text-xl font-bold text-gray-800">
            {users[currentIndex]?.fullName}
          </h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold mt-1">
            {users[currentIndex]?.experienceLevel}
          </span>
          <div className="mt-4 text-left space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">About:</span>{" "}
              {users[currentIndex]?.about}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-purple-600">Looking For:</span>{" "}
              {users[currentIndex]?.lookingFor}
            </p>
          </div>
          <div className="flex flex-wrap justify-center mt-4">
            {users[currentIndex]?.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs m-1 border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() =>
                handleAction("interested", users[currentIndex]?._id)
              }
              className="flex-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-600 transition-colors duration-200"
            >
              Interested
            </button>
            <button
              onClick={() =>
                handleAction("ignored", users[currentIndex]?._id)
              }
              className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Ignore
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
