import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [role, setRole] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", { withCredentials: true })
      .then((res) => {
        setAdmin(res.data);
        setRole(res.data.role);
        if (!res.data.isAuthenticated || (res.data.role !== "admin" && res.data.role !== "superadmin")) {
          navigate("/login");
        }
      })
      .catch((error) => console.error("Error fetching admin details:", error));
  }, [navigate]);

  const isActive = (path) => location.pathname === path;

  const handleRestrictedClick = () => {
    alert("Only super admins can add new admins.");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex  min-h-screen bg-gray-100 pt-20">
      {/* Top Mobile Navbar */}
      <div className="lg:hidden fixed inset-x-0 top-18 z-0 bg-yellow-900 text-white flex justify-end gap-3 items-center p-4 shadow-md">
        <h2 className="text-lg font-bold">
          {role === 'superadmin' ? 'Super Admin' : 'Admin'} {admin ? admin.name : "H..."}'s Panel
        </h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-20 left-0 h-[calc(100vh-4rem)] w-64 bg-yellow-900 text-white p-4 z-20
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex-shrink-0
        `}
      >
        <h2 className="text-2xl font-bold mb-6 hidden lg:block">
          {role === 'superadmin' ? 'Super Admin' : 'Admin'} {admin ? admin.name : "H..."}'s Panel
        </h2>
        <ul className="space-y-4">
          <li className={`p-3 rounded ${isActive("/admin") ? "bg-yellow-600" : "hover:bg-yellow-600 transition"}`}>
            <Link to="/admin" onClick={closeMenu}>Dashboard</Link>
          </li>
          <li className={`p-3 rounded ${isActive("/admin/categories") ? "bg-yellow-600" : "hover:bg-yellow-600 transition"}`}>
            <Link to="/admin/categories" onClick={closeMenu}>Categories</Link>
          </li>
          <li className={`p-3 rounded ${isActive("/admin/users") ? "bg-yellow-600" : "hover:bg-yellow-600 transition"}`}>
            <Link to="/admin/users" onClick={closeMenu}>Manage Users</Link>
          </li>
          <li className={`p-3 rounded ${isActive("/admin/podcasts") ? "bg-yellow-600" : "hover:bg-yellow-600 transition"}`}>
            <Link to="/admin/podcasts" onClick={closeMenu}>Podcasts</Link>
          </li>
          <li className={`p-3 rounded ${isActive("/admin/homevideo") ? "bg-yellow-600" : "hover:bg-yellow-600 transition"}`}>
            <Link to="/admin/homevideo" onClick={closeMenu}>Home Video</Link>
          </li>

          {role === 'superadmin' ? (
            <li className={`p-3 rounded ${isActive("/admin/addadmin") ? "bg-yellow-600" : "hover:bg-yellow-600 transition"}`}>
              <Link to="/admin/addadmin" onClick={closeMenu}>Add Admin</Link>
            </li>
          ) : (
            <li className="p-3 rounded hover:bg-yellow-600 transition cursor-pointer" onClick={() => {
              closeMenu();
              handleRestrictedClick();
            }}>
              Add Admin
            </li>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 mt-16 lg:mt-0">
        <div className="max-w-4xl mx-auto w-full">
          <Outlet context={{ currentRole: role, admin }} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
