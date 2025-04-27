import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import LatestPodcasts from '../Components/LatestPodcasts';

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  // Check if the user is authenticated
  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error('Authentication check failed');
      }
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  };

  // Fetch the home video URL
  const fetchHomeVideo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/videos/home-video");
      if (!res.ok) {
        throw new Error('Failed to fetch video');
      }
      const data = await res.json();
      if (data && data.path) {
        setVideoUrl(`http://localhost:5000${data.path}`);
      }
    } catch (error) {
      console.error("Error fetching home video:", error);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchHomeVideo();
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      alert("You are already logged in and accessing the platform!");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
    <div className="pt-16">
      <div>
        {videoUrl ? (
          <video src={videoUrl} width="100%" autoPlay loop muted playsInline />
        ) : (
          <p>Loading video...</p>
        )}
        <h1 className="hm">Welcome to The Podsphere</h1>
        <button id='hbt' onClick={handleClick}>Start For Free</button>
      </div>
      <div className="About">
  <div className="left">
    <img src="habt.jpg" alt="Podmen" />
  </div>
  <div className="right">
    <h1>About Podsphere</h1>
    <p>
      Podsphere is your go-to platform for discovering, streaming, and sharing amazing podcasts from creators around the world. Whether you're a listener or a podcaster, we’ve built a space just for you.
    </p>
    <p>
      Explore podcasts across categories like Technology, Music, Education, Sports, and more. Upload your own episodes, connect with your audience, and grow your voice—all in one place.
    </p>
    <button onClick={() => navigate("/about")}>Learn More</button>
  </div>
</div>

      <section
      className="relative bg-fixed bg-center bg-cover  bg-no-repeat text-white py-32 px-6"
      style={{
        backgroundImage: "url('/herobg.jpg')", // <- your background image path
      }}
    >
      <div className="bg-black/60 backdrop-blur-sm p-10 rounded-xl max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Share Your Thoughts <br /> with the <span className="text-yellow-500">World</span>
        </h1>
        <p className="text-lg text-slate-300 mb-6">
          Upload your podcasts, discover creators, and connect with stories that inspire.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
          onClick={ handleClick} 
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 text-lg rounded-md transition duration-300">
          Start Podcasting
          </button>
        
        </div>
      </div>
    </section>

<LatestPodcasts/>
</div>
    </>
  );
};

export default Index;
