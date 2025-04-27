import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Index from "./Pages/Index";
import UserDashboard from "./Pages/User/UserDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import PodcastUpload from "./Components/PodcastUpload";
import CategoryPage from "./Pages/CategoryPage";
import Settings from "./Pages/Podcaster/Settings";
import Footer from "./Components/Footer";
import ManagePodcast from "./Pages/Podcaster/ManagePodcast";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import DbHome from "./Pages/Admin/DbHome";
import Categories from "./Pages/Admin/Categories";
import Users from "./Pages/Admin/Users";
import Podcasts from "./Pages/Admin/Podcasts";
import Review from "./Pages/User/Review";
import Usettings from "./Pages/User/Usettings";
import UdbHome from "./Pages/User/UdbHome";
import Favorites from "./Pages/User/favorites";
import Analytics from "./Pages/Podcaster/Analytics";
import AddAdmin from "./Pages/Admin/AddAdmin";
import Upgrade from "./Pages/User/Upgrade";
import Homevideo from "./Pages/Admin/Homevideo";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Index />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/category/:cid" element={<CategoryPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DbHome />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="homevideo" element={<Homevideo />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="addadmin" element={<AddAdmin/>} />
        </Route>

        <Route path="/user-dashboard" element={<UserDashboard  />}>
          <Route index element={<UdbHome />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="reviews" element={<Review />} />
          <Route path="settings" element={<Usettings />} />
          <Route path="upgrade" element={<Upgrade />} />

          <Route path="manage-podcasts" element={<ManagePodcast />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="podcaster-settings" element={<Settings />} />
        </Route>


        {/* Podcast Upload */}
        <Route path="/PodcastUpload" element={<PodcastUpload />} />
        <Route path="/PodcastUpload/:id" element={<PodcastUpload />} />

        {/* Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
