import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">About Us</h1>
      </header>
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg leading-relaxed">
          Welcome to our website! We are dedicated to providing you with the best service possible. Our team is committed to ensuring that your experience is smooth and satisfactory.
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          Our mission is to deliver high-quality products and services. If you have any questions or need further information, feel free to reach out to us through our contact page.
        </p>
      </main>
    </div>
  );
};

export default AboutUs;
