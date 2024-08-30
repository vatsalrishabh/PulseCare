import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">Privacy Policy</h1>
      </header>
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg leading-relaxed">
          Last updated on August 31, 2024
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          Your privacy is important to us. We are committed to protecting your personal information and ensuring that your experience on our website is safe and secure.
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          Please review our privacy practices to understand how we collect, use, and protect your information.
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
