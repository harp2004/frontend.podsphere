import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", { withCredentials: true })
      .then((res) => {
        if (!res.data.isAuthenticated) {
          navigate("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [navigate]);

  const userLinks = [
    { path: "/user-dashboard", label: "Dashboard" },
    { path: "/user-dashboard/favorites", label: "Favourites" },
    { path: "/user-dashboard/reviews", label: "My Reviews" },
    { path: "/user-dashboard/settings", label: "Settings" },
    { path: "/user-dashboard/upgrade", label: "Upgrade" },
  ];

  const podcasterLinks = [
    { path: "/user-dashboard/manage-podcasts", label: "Manage Podcasts" },
    { path: "/user-dashboard/analytics", label: "Podcast Insights" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100 pt-20">
      {/* Top Mobile Navbar */}
      {/* <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-yellow-900 text-white flex justify-between items-center p-4 shadow-md"> */}
      <div className="lg:hidden fixed inset-x-0 top-18 z-0 bg-yellow-900 text-white flex justify-end gap-3 items-center p-4 shadow-md">

        <h2 className="text-lg font-bold left-20">
          {user ? `${user.role === "podcaster" ? "Podcaster" : "User"} ${user.name}'s Panel` : "Loading..."}
        </h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-20 left-0 h-79  w-64 bg-yellow-900 text-white p-3 z-20
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex lg:flex-col
        `}
      >
        <h2 className="text-2xl font-bold mb-6 hidden lg:block">
          {user ? `${user.role === "podcaster" ? "Podcaster" : "User"} ${user.name}'s Panel` : "Loading..."}
        </h2>

        <ul className="space-y-4">
          {userLinks.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block p-3 rounded transition ${
                    isActive ? "bg-yellow-600" : "hover:bg-yellow-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {user?.role === "podcaster" && (
            <>
              <hr className="my-4 border-yellow-700" />
              <p className="text-sm text-yellow-300">Podcaster Tools</p>
              {podcasterLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block p-3 rounded transition ${
                        isActive ? "bg-yellow-600" : "hover:bg-yellow-700"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 pt-24 lg:pt-0">
        {user ? <Outlet context={{ user, setUser }} /> : <p>Loading content...</p>}
      </div>
    </div>
  );
};

export default UserDashboard;
