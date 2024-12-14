import React from 'react';

const RequestCard = ({
  photoUrl,
  fullName,
  experienceLevel,
  lookingFor,
  skills,
  onAccept,
  onReject,
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden p-6 my-4">
      <div className="flex">
        {/* Left - Photo Section */}
        <div className='flex flex-col justify-center'>
        <div className="w-40 h-40 border border-gray-400 rounded-lg overflow-hidden mr-4">
          <img
            src={photoUrl}
            alt={fullName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex space-x-2 mt-2 ml-2">
              <button
                onClick={onAccept}
                className="bg-green-500 text-white text-sm py-1 px-3 rounded shadow hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={onReject}
                className="bg-red-500 text-white text-sm py-1 px-3 rounded shadow hover:bg-red-600"
              >
                Reject
              </button>
            </div>
        </div>
        

        {/* Right - Details Section */}
        <div className="flex-grow flex flex-col justify-between">
          {/* Top - Name & Experience */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">{fullName}</h2>
            <p className="text-sm text-gray-600 font-medium mt-1">
              Experience Level: <span className="text-indigo-600">{experienceLevel}</span>
            </p>
          </div>

          {/* Middle - Skills */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Skills:</h3>
            <ul className="text-sm mt-2 flex flex-wrap items-center">
              {skills.map((skill, index) => (
                <span key={index} className='bg-blue-500 text-white px-2 py-1 m-1 rounded-lg'>{skill}</span>
              ))}
            </ul>
          </div>

          {/* Bottom - Looking For & Buttons */}
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Looking For:</h3>
              <p className="text-sm text-gray-600 mt-1 font-bold">{lookingFor}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
