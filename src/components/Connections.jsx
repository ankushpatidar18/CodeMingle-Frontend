import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchConnectionsStart,
  fetchConnectionsSuccess,
  fetchConnectionsFailure,
} from '../utils/slices/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const { data: connections, loading, error } = useSelector(
    (state) => state.connections
  );

  useEffect(() => {
    const fetchConnections = async () => {
      dispatch(fetchConnectionsStart());
      try {
        const response = await axios.get('http://localhost:8080/user/connections', {
          withCredentials: true,
        });
        dispatch(fetchConnectionsSuccess(response.data.data));
      } catch (err) {
        dispatch(fetchConnectionsFailure('Error fetching connections'));
        console.error(err.message);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-gray-700">Loading connections...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (connections.length === 0) {
    return (
      <div className="text-center text-gray-700 font-semibold h-screen">
        <span className="inline-block mt-40 text-6xl">NO CONNECTIONS</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
  {connections.map((user) => (
    <div
      key={user._id}
      className="flex flex-col items-center bg-white rounded-lg shadow-2xl overflow-hidden py-4 space-y-2"
    >
      {/* Photo Section */}
      <div className="relative w-28 h-28">
        <img
          src={user.photoUrl}
          alt={`${user.fullName}`}
          className="rounded-full object-cover border-2 border-gray-300 w-full h-full"
        />
        <button
          className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600"
          onClick={() => handleChat(user._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 16.5A6.5 6.5 0 0017.5 3H6.5A6.5 6.5 0 003 16.5L3.83 19.83A1 1 0 005.17 19.83L8.5 19H17.5A6.5 6.5 0 0021 16.5z"
            />
          </svg>
        </button>
      </div>

      {/* Name and Experience */}
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">{user.fullName} <span className='text-sm text-gray-500'>({user.experienceLevel})</span>  </p>
      </div>


      {/* Skills Section */}
      {user.skills.length > 0 && (
        <div className="text-center">
         
          <div className="flex flex-wrap justify-center space-x-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  ))}
</div>

  );
};

export default Connections;
