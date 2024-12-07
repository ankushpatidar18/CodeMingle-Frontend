import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import RequestCard from './RequestCard';
import { removeRequest, selectRequests, setRequests } from '../utils/slices/requestSlice';

const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
   console.log('Requests in Component:', requests);


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/request/received', {
          withCredentials: true,
        });
        console.log(response.data.data)
        dispatch(setRequests(response.data.data));
        setError(null);
      } catch (err) {
        setError('Error fetching requests');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [dispatch]);

  const handleAccept = async (id) => {
    try {
      await axios.post(
        `http://localhost:8080/request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error('Error accepting request:', err.message);
      setError('Error accepting request');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        `http://localhost:8080/request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error('Error rejecting request:', err.message);
      setError('Error rejecting request');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading requests...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  console.log(requests)

  if (requests?.length === 0) {
    return (
      <div className="text-center text-gray-700 font-semibold h-screen">
        <span className="inline-block mt-40 text-6xl">NO REQUESTS</span>
      </div>
    );
  }

  return (
 
    <div className="flex overflow-x-auto space-x-4 p-4">
      {requests?.map((request) => {
        const user = request.fromUserId;
        return (
          <RequestCard
            key={request._id}
            photo={user.photoUrl}
            name={`${user.firstName} ${user.lastName}`}
            age={user.age}
            gender={user.gender}
            onAccept={() => handleAccept(user._id)}
            onReject={() => handleReject(user._id)}
          />
        );
      })}
    </div>
  );
};

export default Requests;
