import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const Analytics = () => {
  const context = useOutletContext();
  const user = context?.user;
  const userId = user?._id;

  const [podcasts, setPodcasts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("comments");

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/podcasts/byUser/${userId}`)
      .then((res) => setPodcasts(res.data))
      .catch((err) => console.error("❌ Failed to load podcasts:", err));
  }, [userId]);
  
  const handleDeleteComment = async (podcastId, commentId) => {
    if (!userId || !user?.role) {
      console.warn("⛔ Missing user info for delete");
      return;
    }
  
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/podcasts/${podcastId}/comment/${commentId}`,
        {
          data: {
            userId: userId,
            role: user.role,
          },
        }
      );
  
      if (res.data.success) {
        console.log("✅ Comment deleted successfully");
        // Refresh podcast list after deletion
        setPodcasts((prev) =>
          prev.map((pod) =>
            pod._id === podcastId
              ? {
                  ...pod,
                  comments: pod.comments.filter((c) => c._id !== commentId),
                }
              : pod
          )
        );
      }
    } catch (err) {
      console.error("❌ Failed to delete comment:", err);
    }
  };
  
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-white p-6">
      <h2 className="text-4xl font-bold text-yellow-700 text-center mb-10">
        🎧 Podcast Insights
      </h2>

      <div className="flex justify-center mb-8">
        <select
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="px-4 py-2 text-sm font-medium border border-yellow-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        >
          <option value="comments">💬 Comments</option>
          <option value="reviews">⭐ Reviews</option>
          <option value="likes">👍 Likes</option>
        </select>
      </div>

      {podcasts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No podcasts available.
        </p>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {podcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-yellow-800 mb-4">
                {podcast.title}
              </h3>

              {/* Comments */}
              {selectedTab === "comments" && (
                <div className="space-y-4">
                  {podcast.comments?.length ? (
                    podcast.comments.map((c) => (
                      <div
                        key={c._id}
                        className="flex justify-between items-start border-b pb-2"
                      >
                        <div>
                          <p className="text-sm text-gray-700">
                            {c.text || <em className="text-gray-400">No comment text</em>}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            — {c.userName || "Unknown"}
                          </p>
                        </div>
                        <button
                       onClick={() => {
                        if (window.confirm("Are you sure you want to delete this comment?")) {
                          handleDeleteComment(podcast._id, c._id);
                        }
                      }}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Delete
                      </button>

                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
              )}

              {/* Reviews */}
              {selectedTab === "reviews" && (
                <div className="space-y-4">
                  {podcast.reviews?.length ? (
                    podcast.reviews.map((r) => (
                      <div key={r._id} className="border-b pb-2">
                        <p className="text-yellow-600 font-semibold text-lg">
                          ⭐ {r.rating}/5
                        </p>
                        <p className="text-sm text-gray-700">{r.feedback}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          — {r.userName || "Unknown"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              )}

              {/* Likes */}
              {selectedTab === "likes" && (
                <div>
                  <p className="text-yellow-600 font-bold text-lg">
                    👍 {podcast.likes?.length || 0} Likes
                  </p>
                  {podcast.likes?.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                      {podcast.likes.map((like, i) => (
                        <li key={i}>{like.userName || "Unknown"}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analytics;
