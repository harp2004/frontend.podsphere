import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PodcasterDashboard = () => {
  const [podcaster, setPodcaster] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const podcasterEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    console.log("Fetching podcaster info...");
    axios
      .get("http://localhost:5000/api/auth", { withCredentials: true })
      .then((res) => {
        console.log("Auth response:", res.data);
        if (!res.data.isAuthenticated || res.data.role !== "podcaster") {
          console.warn("Not authenticated or not a podcaster. Redirecting...");
          navigate("/login");
        } else {
          setPodcaster(res.data);
        }
      })
      .catch((error) => console.error("Error fetching podcaster details:", error));
  }, [navigate]);

  useEffect(() => {
    console.log("Current podcaster state:", podcaster);
  }, [podcaster]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-yellow-900 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-6">
          Podcaster {podcaster ? podcaster.name : "Loading..."}'s Panel
        </h2>
        <ul className="space-y-4">
          <li className={`p-2 rounded ${isActive("/podcaster-dashboard") ? "bg-yellow-600" : "hover:bg-yellow-600"}`}>
            <Link to="/podcaster-dashboard">Dashboard</Link>
          </li>
          <li className={`p-2 rounded ${isActive("/podcaster-dashboard/manage-podcasts") ? "bg-yellow-600" : "hover:bg-yellow-600"}`}>
            <Link to="/podcaster-dashboard/manage-podcasts">Manage Podcasts</Link>
          </li>
          <li className={`p-2 rounded ${isActive("/podcaster-dashboard/analytics") ? "bg-yellow-600" : "hover:bg-yellow-600"}`}>
            <Link to="/podcaster-dashboard/analytics">Analytics</Link>
          </li>
          
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {podcaster ? (
          <>
            {console.log("Sending podcaster to Outlet:", podcaster)}
            <Outlet context={{ user: podcaster }} />
          </>
        ) : (
          <p className="text-gray-600">Loading dashboard...</p>
        )}
      </div>
    </div>
  );
};

export default PodcasterDashboard;
