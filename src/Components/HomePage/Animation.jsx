import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Function to add Blob Animation
const BlobAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        style={{ zIndex: -1 }}
      >
        <defs>
          <clipPath id="blob">
            <path
              d="M1235.3,564.2C1040.1,665.2,844.4,736.9,653.2,696.6C462,656.3,280.1,504.5,137.6,392.1C-4.9,279.8-37.2,110.4,96.1,22.3C229.3-65.8,419.5,19.2,598.2,114.5C776.9,209.7,974.1,317.4,1137.4,417.2C1300.7,517.1,1444.2,588.7,1235.3,564.2Z"
              fill="url(#gradient1)"
            />
          </clipPath>
        </defs>
        <linearGradient id="gradient1" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#e01212" />
          <stop offset="100%" stopColor="#8f1b1b" />
        </linearGradient>
        <g clipPath="url(#blob)">
          <rect width="1440" height="800" fill="#edeeee"></rect>
        </g>
      </svg>
    </div>
  );
};

const Animation = () => {
  const navigate = useNavigate();

  const gotoPatientLogin = () => {
    navigate("/patientlogin");
  };

  // Add animation on page load
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationActive(false);
    }, 1500); // Turn off animation after 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-custom-maroon0 to-custom-maroon py-16 px-8 min-h-screen overflow-hidden">
      {/* Blob Animation */}
      <BlobAnimation />
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 text-white">
        {/* Left Section (Content) */}
        <div className="flex flex-col justify-center space-y-6">
          <h1
            className={`text-4xl font-extrabold tracking-tight leading-tight md:text-5xl text-center md:text-left ${
              animationActive ? 'animate__animated animate__fadeIn' : ''
            }`}
          >
            PulseCare: Revolutionizing Healthcare with Online Consultations
          </h1>
          <p className="text-lg md:text-xl text-center md:text-left">
            Get healthcare services at your fingertips. Connect with experienced doctors, get instant prescriptions, and track your health progress—all from the comfort of your home.
          </p>

          <ul className="space-y-4 text-lg">
            <li>📅 Book online appointments easily</li>
            <li>💬 Consult with certified doctors anytime</li>
            <li>📄 Access reports and prescriptions instantly</li>
            <li>📈 Track your health journey and progress</li>
          </ul>

          <div className="flex justify-center md:justify-start">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="text-white bg-custom-maroon hover:bg-custom-maroon2 rounded-full shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl"
              onClick={gotoPatientLogin}
            >
              Book Your Consultation Now
            </Button>
          </div>
        </div>

        {/* Right Section (Image with Blob Border) */}
        <div className="flex justify-center items-center relative overflow-hidden">
          {/* Irregular Blob Border */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-custom-maroon0 to-custom-maroon rounded-xl blob-animate">
            <img
              src="https://www.medibuddy.in/assets/images/talk-to-doc.png"
              alt="PulseCare Consultation"
              className="w-full h-full object-cover rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl relative z-10"
            />
          </div>
        </div>
      </div>

 
     
    </div>
  );
};

export default Animation;
