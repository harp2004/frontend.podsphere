import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom"; // <-- Import this

const Users = () => {
  const [users, setUsers] = useState([]);
  const [podcasters, setPodcasters] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [podcastCounts, setPodcastCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const { currentRole } = useOutletContext(); // <-- Access role from context

  useEffect(() => {
    fetchUsers();
    fetchPodcastCounts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      const allUsers = res.data;

      setUsers(allUsers.filter(user => user.role === "user"));
      setPodcasters(allUsers.filter(user => user.role === "podcaster"));
      setAdmins(allUsers.filter(user => user.role === "admin"));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPodcastCounts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/podcast-count");
      const counts = res.data.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});
      setPodcastCounts(counts);
    } catch (error) {
      console.error("Error fetching podcast counts:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted successfully!");
      fetchUsers();
      fetchPodcastCounts();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Manage Users, Podcasters & Admins</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* USERS */}
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <table className="w-full border-collapse border mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">{user.name || "N/A"}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PODCASTERS */}
          <h3 className="text-xl font-semibold mb-2">Podcasters</h3>
          <table className="w-full border-collapse border mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Podcasts Uploaded</th>
                <th className="border p-2">Plan</th>
                <th className="border p-2">Ends On</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {podcasters.map(podcaster => (
                <tr key={podcaster._id} className="text-center">
                  <td className="border p-2">{podcaster.name || "N/A"}</td>
                  <td className="border p-2">{podcaster.email}</td>
                  <td className="border p-2">{podcastCounts[podcaster._id] || 0}</td>
                  <td className="border p-2">{podcaster.subscription?.plan || "N/A"}</td>
                  <td className="border p-2">
                    {podcaster.subscription?.endDate
                      ? new Date(podcaster.subscription.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border p-2">
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(podcaster._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ADMINS */}
          <h3 className="text-xl font-semibold mb-2">Admins</h3>
          <table className="w-full border-collapse border mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                {currentRole === "superadmin" && <th className="border p-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin._id} className="text-center">
                  <td className="border p-2">{admin.name}</td>
                  <td className="border p-2">{admin.email}</td>
                  {currentRole === "superadmin" && (
                    <td className="border p-2">
                      <button 
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(admin._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Users;
