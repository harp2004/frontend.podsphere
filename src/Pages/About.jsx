import React from "react";
import { FaPodcast, FaUserShield, FaComments, FaChartBar } from "react-icons/fa";

const About = () => {
  return (
    <div className="pt-36 px-4 md:px-10">
      {/* About Us Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="girlm.png"
            alt="Girl listening to podcast"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            About Us
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Podsphere is your all-in-one podcasting platform built for creators, listeners, and communities. Explore, create, and share podcasts with ease.
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            From personalized dashboards to interactive feedback tools, Podsphere helps amplify your voice and grow your audience.
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">Podsphere is a modern podcasting platform that bridges the gap between creators and listeners.
             Whether you’re a casual podcaster, an enthusiastic listener, or an admin managing content, Podsphere provides a seamless experience with tailored tools for everyone.</p>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="mt-16 bg-gray-100 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-800 mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 text-center text-base md:text-lg leading-relaxed mb-4">
          Podsphere’s mission is to empower creators by offering a collaborative, inclusive, and easy-to-use platform for podcast creation and discovery.
        </p>
        <p className="text-gray-700 text-center text-base md:text-lg leading-relaxed">
          Our vision is a world where every story is heard, every voice matters, and creativity has no limits.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-16 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="text-yellow-500 text-3xl mb-3">
              <FaPodcast />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload & Manage Podcasts</h3>
            <p className="text-gray-600 text-sm">
              Easily upload and manage audio or video podcasts with categories and tags.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="text-yellow-500 text-3xl mb-3">
              <FaUserShield />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Role-Based Access</h3>
            <p className="text-gray-600 text-sm">
              Super Admins, Admins, Users, and Podcasters each with dedicated privileges.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="text-yellow-500 text-3xl mb-3">
              <FaComments />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Engage with Community</h3>
            <p className="text-gray-600 text-sm">
              Like, comment, and review podcasts. Interact directly with creators.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg  transition">
            <div className="text-yellow-500 text-3xl mb-3">
              <FaChartBar />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Podcasters can view insights, likes, reviews, and user feedback all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
