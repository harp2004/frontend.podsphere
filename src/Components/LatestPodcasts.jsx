import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LatestPodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestPodcasts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/podcasts/latest");
        setPodcasts(response.data);
      } catch (error) {
        console.error("Error fetching latest podcasts:", error);
        setError(error.response?.data?.message || "Failed to load podcasts");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPodcasts();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="py-12 bg- text-white z-0">
      <h2 className="text-4xl font-bold text-center mb-8 text-yellow-400">
        Latest Podcasts
      </h2>

      {/* Podcast Cards Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {podcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg transition transform hover:scale-105 border-2 border-yellow-400"
            >
              <img
                src={`http://localhost:5000/${podcast.logoPath}`}
                alt={podcast.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4 text-yellow-300">
                {podcast.title}
              </h3>
              {/* <p className="text-gray-400 mt-2">{podcast.description}</p> */}
              <button
                onClick={() => navigate(`/category/${podcast.categoryId._id || podcast.categoryId}`)}
               className="mt-4 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
                Watch Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
