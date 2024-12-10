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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {connections.map((user) => (
        <div
          key={user._id}
          className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden p-4"
        >
          {/* Left Part: Photo and About Section */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src={user.photoUrl}
              alt={`${user.fullName}`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-center">
              <p className="text-sm text-gray-600">{user.about || 'No details provided'}</p>
            </div>
            {user.skills.length > 0 && (
              <div className="text-center">
                <p className="text-gray-700 font-medium">Skills:</p>
                <ul className="list-disc list-inside flex text-sm text-gray-600">
                  {user.skills.map((skill, index) => (
                    <li className="ml-2" key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Part: User Details */}
          <div className="mt-4">
            <p className="text-lg font-bold text-gray-800">
              {user.fullName}
            </p>
            <p className="text-sm text-gray-600">Age: {user.age}</p>
            <p className="text-sm text-gray-600">Gender: {user.gender}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
