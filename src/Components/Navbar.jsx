import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setRole(data.role);
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("userId");
        localStorage.removeItem("role");
      setIsAuthenticated(false);
      setRole(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-yellow-700 font-bold border-b-2 border-black"
      : "text-black hover:text-yellow-700";

  return (
    <nav className="navbar ">
      <div className="navbar-logo">
        <img src="../3.png" alt="Logo" />
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menu */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
        </li>

        {/* Dropdown: Hover on desktop / Click on mobile */}
        <li
          className="dropdown"
          onMouseEnter={() => !menuOpen && setDropdown(true)}
          onMouseLeave={() => !menuOpen && setDropdown(false)}
        >
          <span
            className="dropdown-toggle cursor-pointer"
            onClick={() => menuOpen && setMobileDropdownOpen(!mobileDropdownOpen)}
          >
            Categories
          </span>

          {(dropdown || (menuOpen && mobileDropdownOpen)) && (
            <ul className="dropdown-menu z-10">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat._id}>
                    <NavLink
                      to={`/category/${cat._id}`}
                      className={navLinkStyle}
                      onClick={() => setMenuOpen(false)} // close menu on click
                    >
                      {cat.name}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li>No Categories Available</li>
              )}
            </ul>
          )}
        </li>

        <li>
          <NavLink to="/About" className={navLinkStyle}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/Contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <button id="b1" >
              <li >
              <NavLink
                to={
                  role === "admin" || role === "superadmin"
                    ? "/admin"
                    : "/user-dashboard"
                }
                className={navLinkStyle}
              >
                Dashboard
              </NavLink></li>
            </button>
            <button id="b2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button id="b2">
            <NavLink to="/Login" className={navLinkStyle}>
              Login
            </NavLink>
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
