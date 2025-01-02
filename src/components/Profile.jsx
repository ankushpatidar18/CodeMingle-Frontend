import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "../utils/slices/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.user); 
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    age: user?.age || "",
    photoUrl: user?.photoUrl || "",
    about: user?.about || "",
    skills: user?.skills || [],
    experienceLevel: user?.experienceLevel || "", 
    githubProfile: user?.githubProfile || "", 
    leetCodeProfile: user?.leetCodeProfile || "", 
    lookingFor: user?.lookingFor || "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
     
      setFormData({
        ...formData,
        skills: [...formData.skills, e.target.value.trim()],
      });
      e.target.value = ""; 
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToDelete),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      
      const response = await axios.post(
        "http://localhost:8080/profile/edit",
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      dispatch(updateUser(response.data.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      
      
      toast.error(
        err.response?.data?.message || 
        err.message || 
        "Error updating profile!"
      );
    }
  };
  return (
    <div className="flex flex-wrap">
      {/* Left Section */}
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill)}
                      className="ml-2 text-sm text-red-300 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); 
                    handleAddSkill(e);
                  }
                }}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Experience Level</label>
              <input
                type="text"
                name="experienceLevel"
                value={formData.experienceLevel} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">GitHub</label>
              <input
                type="url"
                name="githubProfile"
                value={formData.githubProfile} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">LeetCode Profile</label>
              <input
                type="url"
                name="leetCodeProfile"
                value={formData.leetCodeProfile} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Looking For</label>
              <input
                type="text"
                name="lookingFor"
                value={formData.lookingFor} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl} 
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
        <div className="w-48 h-48 rounded-full overflow-hidden border border-gray-300">
          {formData.photoUrl ? (
            <img
              src={formData.photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
        <p className="mt-4 text-gray-700">Update your profile photo in settings.</p>
      </div>
    </div>
  );
};

export default Profile;
