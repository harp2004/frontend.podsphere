import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Heart, MessageCircle, Star } from "lucide-react";

const CategoryPage = () => {
    const { cid } = useParams();
    const [podcasts, setPodcasts] = useState([]);
    const [categoryName, setCategoryName] = useState("Unknown Category");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState("");
    const [commentBoxVisible, setCommentBoxVisible] = useState({});

    useEffect(() => {
        const id = localStorage.getItem("userId");
        const r = localStorage.getItem("role");
        if (id && id !== "null" && id !== "undefined" && id.trim() !== "") {
            setUserId(id);
        }
        if (r && r !== "null" && r !== "undefined" && r.trim() !== "") {
            setRole(r);
        }
    }, []);

    const fetchCategoryDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/categories/${cid}`);
            setCategoryName(res.data.name || "Unknown Category");
        } catch (err) {
            console.error("Error fetching category:", err);
            setCategoryName("Unknown Category");
        }
    };

    const fetchPodcasts = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/podcasts/category/${cid}`);
            setPodcasts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error fetching podcasts:", err);
            setError("Failed to load podcasts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cid) {
            setLoading(true);
            setError(null);
            fetchCategoryDetails();
            fetchPodcasts();
        }
    }, [cid]);

    const handleLike = async (podcastId) => {
        if (!userId) {
            alert("You must be logged in to like a podcast.");
            return;
        }
        console.log("see")
    console.log(userId)
    
        const podcast = podcasts.find((p) => p._id === podcastId);
        const alreadyLiked = podcast?.likes?.some((like) => like.userId?.toString() === userId);
    
        try {
            await axios.post(`http://localhost:5000/api/podcasts/${podcastId}/like`, { userId });
    
            setPodcasts((prev) =>
                prev.map((p) =>
                    p._id === podcastId
                        ? {
                              ...p,
                              likes: alreadyLiked
                                  ? p.likes.filter((l) => l.userId !== userId)
                                  : [...(p.likes || []), { userId }],
                          }
                        : p
                )
            );
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };
    
    const handleReview = async (podcastId, rating) => {
        if (!userId) {
            alert("You must be logged in to rate a podcast.");
            return;
        }
    
        try {
            await axios.post(`http://localhost:5000/api/podcasts/${podcastId}/review`, { userId, rating });
            fetchPodcasts();
        } catch (err) {
            console.error("Error submitting review:", err);
        }
    };
    
    const handleComment = async (e, podcastId) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        if (!comment) return;
    
        if (!userId) {
            alert("You must be logged in to comment on a podcast.");
            return;
        }
    
        try {
            await axios.post(`http://localhost:5000/api/podcasts/${podcastId}/comment`, {
                userId,
                comment,
            });
            e.target.reset();
            fetchPodcasts();
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };
    

    const handleDeleteComment = async (podcastId, commentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/podcasts/${podcastId}/comment/${commentId}`, {
                data: { userId },
            });
            fetchPodcasts();
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };

    const toggleCommentBox = (id) => {
        setCommentBoxVisible((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const getUserRating = (podcast) => {
        const review = podcast.reviews?.find((r) => r.userId?.toString() === userId);
        return review?.rating || 0;
    };

    return (
        <div className="min-h-screen bg-gray-950 p-10 text-white">
            <h2 className="text-4xl font-bold text-center mb-10 border-b-2 border-yellow-400 inline-block">
                {loading ? "Loading..." : `Podcasts in ${categoryName}`}
            </h2>

            {error && <p className="text-center text-red-400">{error}</p>}

            {loading ? (
                <p className="text-center">Loading podcasts...</p>
            ) : podcasts.length === 0 ? (
                <p className="text-center">No podcasts available.</p>
            ) : (
                <div className="space-y-8">
                    {podcasts.map((podcast) => {
                        const uploadDate = new Date(podcast.createdAt).toLocaleDateString();
                        const hasUserLiked = podcast.likes?.some((like) => like.userId?.toString() === userId);
                        const averageRating = podcast.reviews?.length
                            ? (
                                  podcast.reviews.reduce((acc, r) => acc + r.rating, 0) / podcast.reviews.length
                              ).toFixed(1)
                            : "N/A";
                        const userRating = getUserRating(podcast);

                        return (
                            <div
                                key={podcast._id}
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row"
                            >
                                <div className="relative group md:w-1/4">
                                    <img
                                        src={`http://localhost:5000/${podcast.logoPath}`}
                                        alt={podcast.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div
                                        // onClick={() => setSelectedVideo(podcast.videoPath)}
                                        onClick={() => {
                                            if (!userId) {
                                                alert("You must be logged in to play the podcast.");
                                            } else {
                                                setSelectedVideo(podcast.videoPath);
                                            }
                                        }}
                                        
                                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-semibold">{podcast.title}</h3>
                                      
                                        <span className="text-sm text-gray-400">{uploadDate}</span>
                                    </div>

                                    <p className="text-gray-300 mb-4">{podcast.description}</p>

                                    <div className="flex items-center flex-wrap gap-6 text-gray-300">
                                        <button onClick={() => handleLike(podcast._id)} className="flex items-center space-x-1">
                                            <Heart
                                                className={`w-5 h-5 transition ${
                                                    hasUserLiked ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
                                                }`}
                                            />
                                            <span>{podcast.likes?.length || 0}</span>
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => handleReview(podcast._id, star)}
                                                    className={`text-lg ${
                                                        star <= userRating ? "text-yellow-400" : "text-gray-500 hover:text-yellow-300"
                                                    }`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                            <span className="ml-2">{averageRating}</span>
                                        </div>

                                        <button
                                            onClick={() => toggleCommentBox(podcast._id)}
                                            className="flex items-center space-x-1"
                                        >
                                            <MessageCircle className="text-blue-400 w-5 h-5" />
                                            <span>{podcast.comments?.length || 0}</span>
                                        </button>
                                        {podcast.creatorId?.email && (
                                            <span className="text-sm text-gray-400 ml-auto">
                                              Uploded  By: {podcast.creatorId.email}
                                            </span>
                                        )}
                                    </div>

                                    {commentBoxVisible[podcast._id] && userId && (
                                        <form
                                            onSubmit={(e) => handleComment(e, podcast._id)}
                                            className="mt-4 flex space-x-2"
                                        >
                                            <input
                                                name="comment"
                                                placeholder="Write a comment..."
                                                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                            >
                                                Add
                                            </button>
                                        </form>
                                    )}

                                    {commentBoxVisible[podcast._id] && (
                                        <div className="mt-4 space-y-1">
                                            {(podcast.comments || []).map((c, i) => (
                                                <div key={i} className="bg-gray-700 p-2 rounded flex justify-between items-center">
                                                    <div>
                                                        <strong className="text-blue-300">{c.userId?.name || "User"}:</strong>{" "}
                                                        {c.comment || c.text}
                                                    </div>
                                                    {c.userId?._id === userId && (
                                                        <button
                                                            onClick={() => handleDeleteComment(podcast._id, c._id)}
                                                            className="ml-2 text-red-400 hover:text-red-600 text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-4xl p-4">
                        <video
                            src={`http://localhost:5000/${selectedVideo}`}
                            controls
                            autoPlay
                            className="w-full rounded-lg shadow-lg"
                        />
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 text-white text-xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
