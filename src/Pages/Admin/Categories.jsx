import { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", cid: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.cid) {
      alert("⚠️ Both fields are required!");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        // Update existing category
        await axios.put(`http://localhost:5000/api/categories/${editId}`, formData);
        alert("✅ Category updated successfully!");
      } else {
        // Add new category
        await axios.post("http://localhost:5000/api/categories", formData);
        alert("✅ Category added successfully!");
      }

      fetchCategories(); // Refresh the list
      setFormData({ name: "", cid: "" }); // Reset form
      setEditId(null);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("❌ Operation failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Edit Click
  const handleEdit = (category) => {
    setEditId(category._id);
    setFormData({ name: category.name, cid: category.cid });
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("🗑 Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      alert("✅ Category deleted!");
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("❌ Delete error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* ✅ Form for Adding & Updating */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          type="number"
          name="cid"
          placeholder="Category ID"
          value={formData.cid}
          onChange={handleChange}
          className="border p-2 w-34"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 flex-1"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {loading ? "Saving..." : editId ? "Update" : "Add"}
        </button>
      </form>

      {/* ✅ Categories List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id} className="text-center">
                <td className="border p-2">{category.cid}</td>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 text-white px-3 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border p-2 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
