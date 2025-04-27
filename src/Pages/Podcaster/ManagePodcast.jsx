import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManagePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const creatorId = localStorage.getItem("userId");

  useEffect(() => {
    if (!creatorId) {
      alert("User not logged in. Please log in first.");
      navigate("/login");
      return;
    }

    const fetchPodcasts = async () => {
      try {
       
        const res = await axios.get(`http://localhost:5000/api/podcasts/byUser/${creatorId}`);

        setPodcasts(res.data);
      } catch (error) {
        console.error("❌ Error fetching podcaster podcasts:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [creatorId, navigate]);

  const deletePodcast = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this podcast?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/podcasts/${id}`);
      setPodcasts((prev) => prev.filter((podcast) => podcast._id !== id));
    } catch (error) {
      console.error("❌ Error deleting podcast:", error.response?.data || error.message);
      alert("Failed to delete podcast.");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold">Manage Podcasts</h2>
        <button
          className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-800 transition"
          onClick={() => navigate("/PodcastUpload")}
        >
          Upload Podcast
        </button>
      </div>

      {/* Podcast Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full">Loading podcasts...</p>
        ) : podcasts.length > 0 ? (
          podcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 relative group"
            >
              <img
                src={podcast.logoPath ? `http://localhost:5000/${podcast.logoPath}` : "/placeholder.jpg"}
                alt="Podcast Logo"
                className="w-20 h-20 object-cover rounded-full mx-auto"
              />
              <h3 className="text-lg font-bold mt-3 text-center">{podcast.title}</h3>
              <p className="text-sm text-gray-600 text-center line-clamp-2">{podcast.description}</p>
              <p className="text-xs text-gray-500 text-center mt-1">
                Category: {podcast.categoryId?.name || "Uncategorized"}
              </p>

              <div className="mt-4 space-y-2">
                <button
                  className="bg-yellow-600 text-white px-3 py-1 rounded w-full hover:bg-yellow-700"
                  onClick={() => deletePodcast(podcast._id)}
                >
                  Delete
                </button>
                <button
                  className="text-yellow-800 underline w-full"
                  onClick={() =>
                    navigate(`/PodcastUpload/${podcast._id}`, {
                      state: { podcast },
                    })
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full mt-10">
            <p className="text-gray-500">You haven't uploaded any podcasts yet.</p>
            <button
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
              onClick={() => navigate("/PodcastUpload")}
            >
              Upload Podcast
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePodcasts;
