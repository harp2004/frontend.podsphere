

// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>
// WE ARE NOT USING THIS IN OUR SITE ----------------------------------------------------------------------------->>>>>



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const [totalPodcasts, setTotalPodcasts] = useState(0);
  const [recentPodcasts, setRecentPodcasts] = useState([]);
  const navigate = useNavigate();

  const podcasterId = localStorage.getItem("userId");

  useEffect(() => {
    if (!podcasterId) return;

    axios
      .get(`http://localhost:5000/api/podcasts/user?creatorId=${podcasterId}`)
      .then((res) => {
        setTotalPodcasts(res.data.length);
        setRecentPodcasts(res.data.slice(0, 5));
      })
      .catch((error) =>
        console.error("Error fetching podcaster podcasts:", error.response?.data || error.message)
      );
  }, [podcasterId]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-yellow-900 mb-6">Podcaster Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Podcasts Uploaded</h3>
          <p className="text-2xl font-bold">{totalPodcasts}</p>
        </div>
        <div className="bg-yellow-900 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Recent Uploads</h3>
          <p className="text-2xl font-bold">{recentPodcasts.length}</p>
        </div>
      </div>

      {/* Recent Podcasts */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Recent Podcasts</h3>
        {recentPodcasts.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Uploaded On</th>
              </tr>
            </thead>
            <tbody>
              {recentPodcasts.map((podcast) => (
                <tr key={podcast._id} className="text-center">
                  <td className="border p-2">{podcast.title}</td>
                  <td className="border p-2">{podcast.categoryId?.name || "N/A"}</td>
                  <td className="border p-2">
                    {new Date(podcast.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No recent uploads</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-yellow-900 text-white px-4 py-2 rounded shadow-md"
          onClick={() => navigate("/podcaster-dashboard/manage-podcasts")}
        >
          Manage Podcast
        </button>
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded shadow-md"
          onClick={() => navigate("/PodcastUpload")}
        >
          Upload Podcast
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
