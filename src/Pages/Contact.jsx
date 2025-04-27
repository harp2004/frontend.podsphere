import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_1ztw98q", // Replace with your EmailJS Service ID
        "template_0iu4cju", // Replace with your EmailJS Template ID
        formData,
        "rXAys2DcdKkcCU80m" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setStatus("Email sent successfully!");
          alert(" Email Sent Succesufully")
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send email. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    
    <div className="bg-gray-100 py-16 px-4  pt-44  flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row p-6 md:p-12 pt">
        {/* Left Side - Text & Illustration */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-yellow-600">Let's Talk About Everything!</h1>
          <p className="text-gray-600 mt-2">
            Hate forms? Send us an email instead at {" "}
            <a href="mailto:contact@podcast.com" className="text-yellow-700 underline">
              contact@podcast.com
            </a>
          </p>
          <img 
            src="image.png" 
            alt="Podcast Contact" 
            className="w-48 mt-6 mx-auto hidden md:block"
          />
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          {status && <p className="text-center text-green-600 font-semibold">{status}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-yellow-600 transition-all duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;







