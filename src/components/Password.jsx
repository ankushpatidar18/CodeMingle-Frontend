import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "../utils/slices/userSlice";
import { useDispatch } from "react-redux";

const Password = () => {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8080/profile/password",
        formData,
        { withCredentials: true }
      );
     
      dispatch(updateUser(response.data.data))
      toast.success(response.data.message || "Password updated successfully!");
      setFormData({ currentPassword: "", newPassword: "" }); // Clear the form
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update password!";
       
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Password;
