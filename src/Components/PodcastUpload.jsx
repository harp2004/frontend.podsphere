import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PodcastUpload = () => {
  const { id } = useParams();
  const location = useLocation();
  const podcastData = location.state?.podcast || null;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    video: null,
    logo: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const creatorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error.response?.data || error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files.length > 0 ? files[0] : null,
    }));
  };

  useEffect(() => {
    if (podcastData) {
      setFormData({
        title: podcastData.title || "",
        description: podcastData.description || "",
        categoryId: podcastData.categoryId?._id || "",
        video: null,
        logo: null,
      });
    } else if (id) {
      const fetchPodcast = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/podcasts/${id}`);
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
            categoryId: res.data.categoryId?._id || "",
            video: null,
            logo: null,
          });
        } catch (error) {
          console.error("❌ Error fetching podcast:", error.response?.data || error.message);
        }
      };
      fetchPodcast();
    }
  }, [id, podcastData]);

  const handleUpload = async () => {
    if (loading) return;
    setLoading(true);

    const isNew = !id;

    if (
      isNew &&
      (!formData.title || !formData.description || !formData.categoryId || !creatorId)
    ) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    
    const uploadData = new FormData();
    if (formData.title) uploadData.append("title", formData.title);
    if (formData.description) uploadData.append("description", formData.description);
    if (formData.categoryId) uploadData.append("categoryId", formData.categoryId);
    uploadData.append("creatorId", creatorId);

    if (formData.video) uploadData.append("video", formData.video);
    if (formData.logo) uploadData.append("logo", formData.logo);

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/podcasts/${id}`, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Podcast updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/podcasts/upload", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Podcast uploaded successfully!");
      }

      navigate("/user-dashboard/manage-podcasts");
    } catch (error) {
      console.error("❌ Upload error:", error.response?.data || error.message);
      alert(`❌ Upload failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 pt-36 bg-gray-100 flex items-center justify-center">
      <div className="relative py-3 sm:max-w-xl w-full mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-8 py-8 bg-white shadow-lg sm:rounded-3xl sm:p-12">
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            {id ? "Edit Podcast" : "Upload Podcast"}
          </h1>

          <div className="space-y-6 text-gray-700">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Podcast Title"
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Podcast Description"
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none"
            />
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full py-2 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none"
            />
            {id && podcastData?.video && (
              <p className="text-sm text-gray-500">Current video: {podcastData.video}</p>
            )}

            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full py-2 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none"
            />
            {id && podcastData?.logo && (
              <p className="text-sm text-gray-500">Current logo: {podcastData.logo}</p>
            )}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md transition"
            >
              {loading ? "Processing..." : id ? "Update Podcast" : "Upload Podcast"}
            </button>

            <button
            onClick={() => navigate(-1)}
            className="mb-4 text-yellow-600 hover:underline font-medium"
          >
            ← Back
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastUpload;
