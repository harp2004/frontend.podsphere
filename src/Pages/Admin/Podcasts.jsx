import { useEffect, useState } from "react";
import axios from "axios";

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    const res = await axios.get("http://localhost:5000/api/podcasts");
    setPodcasts(res.data);
  };

  const deletePodcast = async (id) => {
    if (!window.confirm("Are you sure you want to delete this podcast?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/podcasts/${id}`);
      alert("✅ Podcast deleted successfully!");
      fetchPodcasts();
    } catch (error) {
      console.error("🔥 Error deleting podcast:", error.response?.data || error.message);
      alert("❌ Failed to delete podcast.");
    }
  };

  const handleFullscreen = (videoId) => {
    const videoElement = document.getElementById(videoId);
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
    {podcasts.map((pod) => (
      <div
        key={pod._id}
        className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden transition transform hover:scale-105"
      >
        {/* Video/Image */}
        <div
          className="relative h-44 group"
          onMouseEnter={() => setHovered(pod._id)}
          onMouseLeave={() => setHovered(null)}
        >
          <video
            id={`video-${pod._id}`}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            src={`http://localhost:5000/${pod.videoPath.replace("\\", "/")}`}
            muted
            autoPlay
            loop
          />
          <img
            src={`http://localhost:5000/${pod.logoPath.replace("\\", "/")}`}
            alt={pod.title}
            className="w-full h-full object-cover rounded-t-2xl group-hover:opacity-0 transition-opacity duration-300"
          />
          {hovered === pod._id && (
            <button
              onClick={() => handleFullscreen(pod._id)}
              className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded hover:bg-opacity-80"
            >
              Fullscreen
            </button>
          )}
        </div>
  
        {/* Content */}
        <div className="p-3 text-center">
          <h3 className="text-md font-semibold text-gray-800 mb-1">{pod.title}</h3>
          <p className="text-xs text-gray-500 mb-1">
            Uploaded by: <span className="text-blue-600">{pod.creatorId?.name || 'N/A'} ({pod.creatorId?.email || 'N/A'})</span>
          </p>
          <p className="text-xs text-gray-400 mb-2">Date: {new Date(pod.createdAt).toLocaleDateString()}</p>
          <button
            onClick={() => deletePodcast(pod._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete Podcast
          </button>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Podcasts;
