import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');

  const payNow = async () => {
    try {
      // Call the create-order API
      const response = await axios.post('http://localhost:3000/api/razorpay/create-order', {
        amount: amount,
        currency: 'INR',
        receipt: 'receipt#1',
        notes: {}
      });

      const order = response.data;

      // Open Razorpay Checkout
      const options = {
        key: 'rzp_test_RYNvxWHdirjhUp', // Replace with your Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: 'PulseCare',
        description: 'Test Transaction',
        order_id: order.id,
        callback_url: 'http://localhost:3000/api/razorpay/payment-success', // Your success URL
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post('http://localhost:3000/api/razorpay/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResponse.data.status === 'ok') {
              window.location.href = '/payment-success'; // Redirect on success
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Error verifying payment');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    }
  };

  return (
    <div>
      <h1>Razorpay Payment Gateway Integration</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="button" onClick={payNow}>Pay Now</button>
      </form>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
};

export default Payment;
