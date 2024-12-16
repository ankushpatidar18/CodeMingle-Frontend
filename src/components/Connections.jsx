import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';


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
  const currentUserId = useSelector((state) => state.user._id);
  
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Initialize socket(Todo : withcredentials (token))
    const socketInstance = io('http://localhost:8080');  // Adjust URL as needed
    console.log(socketInstance)
    setSocket(socketInstance);

    return () => {
      // Cleanup socket when component unmounts
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

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

    if (socket) {
      socket.on('receiveMessage', (message) => {
        // Ensure the message is for the currently selected user
        if (message.senderId === selectedUser) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('receiveMessage');
      }
    };
  }, [dispatch, selectedUser, socket]);

  // Fetch messages when a user is selected
  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/messages/${userId}`, {
        withCredentials: true,
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleChat = (userId) => {
    setSelectedUser(userId);
    if (socket) {
      socket.emit('join', currentUserId);  // Join with current user's ID
    }
    fetchMessages(userId);  // Fetch previous messages
    setIsChatOpen(true);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && socket && selectedUser) {
      try {
        // save message via HTTP request
        await axios.post('http://localhost:8080/messages', 
          { 
            receiverId: selectedUser, 
            text: newMessage 
          }, 
          { withCredentials: true }
        );

        // Then emit via socket for real-time communication
        const messagePayload = { 
          senderId: currentUserId, 
          receiverId: selectedUser, 
          text: newMessage 
        };
        
        socket.emit('sendMessage', messagePayload);
        
        // Optimistically update messages
        setMessages((prev) => [...prev, messagePayload]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
    setMessages([]);
  };

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
    <div>
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
              <p className="text-lg font-bold text-gray-800">
                {user.fullName} <span className="text-sm text-gray-500">({user.experienceLevel})</span>
              </p>
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

      {/* Chat Window */}
      {isChatOpen && selectedUser && (
        <div className="fixed bottom-4 right-4 bg-white w-80 p-4 rounded-lg shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Chat</h3>
            <button onClick={handleCloseChat} className="text-red-500">Close</button>
          </div>
          <div className="overflow-y-scroll max-h-60 mt-2">
            { messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet</p>
            ) :(messages.map((message, index) => (
              <div key={index} className="mb-2">
                <p className={`text-sm ${message.senderId === currentUserId ? 'text-blue-600 text-right' : 'text-gray-600 text-left'}`}>
                  {message.text}
                </p>
              </div>
            )))}
          </div>
          <div className="mt-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
