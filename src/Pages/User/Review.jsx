import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";

const Review = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        const [reviewRes, commentRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${user._id}/reviews`),
          axios.get(`http://localhost:5000/api/users/${user._id}/comments`)
        ]);

        const reviews = reviewRes.data;
        const comments = commentRes.data;

        const dataMap = new Map();

        reviews.forEach(review => {
          if (!review.podcastId) return;
          const podcastId = review.podcastId.toString();

          dataMap.set(podcastId, {
            podcastId,
            podcastTitle: review.podcastTitle,
            logoPath: review.logoPath,
            rating: review.rating,
            reviewComment: review.comment,
            comments: [],
            categoryId: review.categoryId?.toString(), // ✅ Include categoryId
          });
        });

        comments.forEach(comment => {
          if (!comment.podcastId) return;
          const podcastId = comment.podcastId.toString();

          if (dataMap.has(podcastId)) {
            dataMap.get(podcastId).comments.push({
              comment: comment.comment,
              timestamp: comment.timestamp
            });
          } else {
            dataMap.set(podcastId, {
              podcastId,
              podcastTitle: comment.podcastTitle,
              logoPath: comment.logoPath,
              rating: null,
              reviewComment: null,
              comments: [{
                comment: comment.comment,
                timestamp: comment.timestamp
              }],
              categoryId: comment.categoryId?.toString() // ✅ Include categoryId
            });
          }
        });

        setMergedData([...dataMap.values()]);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [user]);

  const renderStars = (count) => (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < count ? "gold" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Activity</h2>

      {mergedData.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven’t reviewed or commented on any podcasts yet.</p>
      ) : (
        <ul className="space-y-6">
          {mergedData.map((item, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex gap-5 items-start"
            >
              {item.logoPath && (
                <img
                  src={`http://localhost:5000/${item.logoPath}`}
                  alt="Podcast Logo"
                  className="w-24 h-24 object-cover rounded-xl border shadow-sm"
                />
              )}
              <div className="flex-1 space-y-3">
                <h4 className="text-2xl font-semibold text-gray-900">{item.podcastTitle}</h4>

                {item.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Your Rating:</span>
                    {renderStars(item.rating)}
                  </div>
                )}

                {item.reviewComment && (
                  <p className="text-gray-700 italic border-l-4 border-yellow-400 pl-4">
                    "{item.reviewComment}"
                  </p>
                )}

                {item.comments?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Your Comments:</p>
                    <div className="space-y-2">
                      {item.comments.map((c, i) => (
                        <div key={i} className="bg-gray-100 p-3 rounded-lg">
                          <p className="text-gray-800">{c.comment}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(c.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (item.categoryId) {
                      console.log("Navigating to category ID:", item.categoryId);
                      navigate(`/category/${item.categoryId}`);
                    } else {
                      console.warn("Category ID is undefined for this podcast");
                    }
                  }}
                  className="mt-3 inline-block px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition"
                >
                  View Podcast
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;