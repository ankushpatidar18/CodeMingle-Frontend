import React from 'react';

const RequestCard = ({ photo, name, age, gender, onAccept, onReject }) => {
    return (
      <div className="flex items-center bg-white shadow-md p-4 rounded-lg space-x-4 w-96">
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">
            {age} years old, {gender}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onAccept}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    );
  };

  export default RequestCard;