import React, { useState, useEffect } from "react";
import axios from "axios";

const USettings = () => {
  const [user, setUser] = useState({ name: "", email: "", _id: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", { withCredentials: true })
      .then((res) => {
        console.log("User Data:", res.data);
        if (res.data._id) {
          setUser({
            name: res.data.name || "",
            email: res.data.email || "",
            _id: res.data._id,
          });
        } else {
          console.error("User ID is missing in the response!");
          setMessage("Error: User ID not found. Please login again.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setMessage("Failed to fetch user info.");
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
      setMessage("User ID is missing! Please refresh and try again.");
      return;
    }

    const updateData = {};
    if (user.name) updateData.name = user.name;
    if (user.email) updateData.email = user.email;

    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, updateData, {
        withCredentials: true,
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

      {message && (
        <p
          className={`mb-4 text-center ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter name"
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter email"
        />

        <button
          type="submit"
          className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default USettings;
