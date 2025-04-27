import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [user, setUser] = useState({ name: "", email: "", _id: "" });
  const [message, setMessage] = useState("");

  // Fetch user details on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", { withCredentials: true })
      .then((res) => {
        console.log("User Data:", res.data);
        if (res.data.isAuthenticated && res.data.role === "podcaster") {
          setUser({ name: res.data.name, email: res.data.email, _id: res.data._id });
        } else {
          setMessage("Unauthorized access.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setMessage("Failed to load user details.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user._id) {
      setMessage("User ID is required for updating the profile.");
      return;
    }

    try {
      // Send only modified fields
      const updateData = {};
      if (user.name) updateData.name = user.name;
      if (user.email) updateData.email = user.email;

      await axios.put(`http://localhost:5000/api/users/${user._id}`, updateData, { withCredentials: true });

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Podcaster Settings</h2>

      {message && <p className={`mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Name</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />

        <label className="block mb-2">Email</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />

        <button type="submit" className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Settings;


