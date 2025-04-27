import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const UdbHome = () => {
  const { user, setUser } = useOutletContext();
  const [isUpgraded, setIsUpgraded] = useState(user.role === "podcaster");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleUpgrade = async () => {
    setLoading(true);
    setMessage("");
  
    try {
      const response = await fetch(`/api/users/${user._id}/upgrade`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for session-based auth
      });
  
      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Upgrade failed. Something went wrong.");
      }
  
      // Try parsing the JSON response (in case of success)
      const data = await response.json();
  
      // Handle success
      if (data.message) {
        setUser((prev) => ({ ...prev, role: "podcaster" }));
        setIsUpgraded(true);
        setMessage("You’ve been upgraded to a Podcaster!");
      } else {
        throw new Error("Unexpected response format. Please try again.");
      }
  
    } catch (error) {
      setMessage(error.message || "Upgrade failed due to a network or server error.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="h-screen overflow-hidden bg-yellow-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-yellow-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-600 mb-2 text-center">
          Welcome, {user.name}!
        </h1>
        <p className="text-md sm:text-lg text-gray-600 text-center mb-6">
          ({user.email})
        </p>
        <p className="text-lg text-gray-600 text-center mb-8">
          Here's your personalized space to explore liked podcasts, manage your reviews, and customize your experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-md transition-all">
            <h2 className="text-xl font-bold text-yellow-700">Favorites</h2>
            <p className="text-sm text-gray-600 mt-2">View podcasts you’ve liked.</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-md transition-all">
            <h2 className="text-xl font-bold text-yellow-700">Reviews</h2>
            <p className="text-sm text-gray-600 mt-2">Check your ratings & feedback.</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-md transition-all">
            <h2 className="text-xl font-bold text-yellow-700">Settings</h2>
            <p className="text-sm text-gray-600 mt-2">Update your profile & preferences.</p>
          </div>
        </div>

        {/* Podcaster Panel */}
        {isUpgraded && (
          <>
            <hr className="my-10 border-yellow-300" />
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-700 mb-2">Podcaster Panel</h2>
              <p className="text-gray-600 text-md">
                Manage your uploaded content, analyze engagement, and grow your audience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-yellow-200 p-6 rounded-xl shadow hover:shadow-md transition-all">
                <h2 className="text-xl font-bold text-yellow-800">Manage Podcasts</h2>
                <p className="text-sm text-gray-700 mt-2">View, edit, or delete your uploads.</p>
              </div>
              <div className="bg-yellow-200 p-6 rounded-xl shadow hover:shadow-md transition-all">
                <h2 className="text-xl font-bold text-yellow-800">Insights</h2>
                <p className="text-sm text-gray-700 mt-2">Track likes, reviews & comments.</p>
              </div>
              <div className="bg-yellow-200 p-6 rounded-xl shadow hover:shadow-md transition-all">
                <h2 className="text-xl font-bold text-yellow-800">Podcaster Settings</h2>
                <p className="text-sm text-gray-700 mt-2">Manage your podcaster profile.</p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default UdbHome;
