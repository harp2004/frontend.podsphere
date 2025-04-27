import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get(`http://localhost:5000/api/users/${userId}/favorites`);
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching liked podcasts:", err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Your Liked Podcasts</h2>
      
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t liked any podcasts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favorites.map((pod) => (
            <div
              key={pod._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <img
                src={`http://localhost:5000/${pod.logoPath.replace("\\", "/")}`}
                alt={pod.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{pod.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">By: {pod.creatorName || pod.Name}</p>
                </div>

                {pod.categoryId && (
                  <button
                    className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg shadow w-full transition-all"
                    onClick={() => navigate(`/category/${pod.categoryId._id || pod.categoryId}`)}
                  >
                    View Podcast
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
