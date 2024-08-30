import React from 'react';

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">Shipping and Delivery</h1>
        <p className="text-sm text-gray-600">Last updated on August 31, 2024</p>
      </header>
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg leading-relaxed">
          Shipping is not applicable for business.
        </p>
      </main>
    </div>
  );
};

export default ShippingDelivery;
