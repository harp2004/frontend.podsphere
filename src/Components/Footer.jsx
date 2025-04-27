import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="ftr" className="bg-gray-100 text-black py-12 ">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-800">Podsphere</h2>
            <p className="mt-3 text-sm text-gray-700">
              Your all-in-one platform for discovering, streaming, and creating
              podcasts. Empowering voices, amplifying stories.
            </p>
            <div className="mt-5 flex space-x-4 text-xl text-gray-500">
              <Link
                to="https://www.facebook.com/login/"
                className="hover:text-blue-600"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="https://x.com/i/flow/login"
                className="hover:text-sky-500"
              >
                <FaTwitter />
              </Link>
              <Link
                to="https://www.instagram.com/accounts/login/?hl=en"
                className="hover:text-pink-500"
              >
                <FaInstagram />
              </Link>
              <Link
                to="https://in.linkedin.com/?mcid=6844056167778418689&src=go-pa&trk=sem-ga_campid.14650114788_asid.151761418307_crid.657403558718_kw.linkedin%20login_d.c_tid.kwd-12704335873_n.g_mt.e_geo.9062198&cid=&gad_source=1&gbraid=0AAAAABKX7wE9PR99ny2DUxwMVZUkbotdW&gclid=CjwKCAjwn6LABhBSEiwAsNJrjpv1-vF9BHx8MEmMve7bw2568Enpq63ZrHz-RaQq__n0Rm3Q9dhGsBoCS_kQAvD_BwE&gclsrc=aw.ds"
                className="hover:text-blue-700"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>
                <Link to="/" className="hover:text-yellow-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category/67f9d38e0e6721904eda831f"
                  className="hover:text-yellow-600 transition"
                >
                  Podcasts
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-600 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Stay Updated
            </h3>
            <p className="mt-3 text-sm text-gray-700">
              Subscribe to our newsletter to receive the latest podcast releases
              and updates.
            </p>
            <form className="mt-5 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-r-md transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
          <p>
            &copy; {new Date().getFullYear()} Podsphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
