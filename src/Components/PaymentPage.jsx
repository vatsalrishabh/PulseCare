// src/PaymentPage.jsx
import React, { useState } from 'react';
import { BaseUrl } from './BaseUrl';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const payNow = async () => {
    try {
      // Ensure amount is in paise
      const amountInPaise = parseInt(amount) * 100;

      // Create order by calling the server endpoint
      const response = await fetch(`${BaseUrl}/razorpay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: 'receipt#1',
          notes: {},
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      if (!order || !order.id) {
        throw new Error('Invalid order response');
      }

      // Razorpay options
      const options = {
        key: 'rzp_test_B8Hd7td9b59ES1', // Replace with your Razorpay key_id
        amount: order.amount, // Amount is in currency subunits (paise)
        currency: order.currency,
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: 'http://localhost:3000/payment-success', // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      // Create a new Razorpay instance and open the checkout
      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description}`);
      });

      rzp.on('payment.success', async (response) => {
        try {
          const verificationResponse = await fetch('/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verificationResponse.ok) {
            throw new Error('Payment verification failed');
          }

          const verificationResult = await verificationResponse.json();
          if (verificationResult.success) {
            window.location.href = '/payment-success';
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          setError(`Payment verification failed: ${error.message}`);
        }
      });

      rzp.open();
    } catch (error) {
      console.error('Payment process error:', error);
      setError(`Payment process failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Razorpay Payment</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        min="1"
      />
      <button onClick={payNow} style={{ marginTop: '10px' }}>
        Pay Now
      </button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  );
};

export default PaymentPage;
