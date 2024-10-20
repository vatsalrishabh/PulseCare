import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { BaseUrl } from './BaseUrl';
import './Payment.css'; // Create a CSS file for additional styles

const Payment = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { bookingId, name, email, contact, disease, doctor, date, time } = props;

  const payNow = async () => {
    try {
      // Call the create-order API
      const response = await axios.post(`${BaseUrl}/api/razorpay/create-order`, {
        amount: 300,
        currency: 'INR',
        receipt: bookingId,
        notes: {
          name: name,
          email: email,
          contact: contact,
          disease: disease,
          doctor: doctor,
        },
      });
  
      const order = response.data;
  
      // Open Razorpay Checkout
      const options = { 
        key: 'rzp_test_l0gnUnaG8U4VmM',
        amount: order.amount,
        currency: order.currency,
        name: 'PulseCare',
        description: 'Live Transaction',
        order_id: order.id,
        callback_url: `${BaseUrl}/api/razorpay/payment-success`, // Your success URL
        prefill: {
          name: name,
          email: email,
          contact: contact,
        },
        theme: {
          color: '#F37254',
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(`${BaseUrl}/api/razorpay/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
  
            if (verificationResponse.data.status === 'ok') {
              // Store booking data in localStorage dynamically
              localStorage.setItem('paymentData', JSON.stringify({
                patientId: bookingId,  // Assuming bookingId is the patient ID
                name: name,
                appointmentDate: date,  // Use the date prop
                appointmentTime: time,   // Use the time prop
                doctorName: doctor,      // Use the doctor prop
                diseaseType: disease,    // Use the disease prop
                amount: order.amount/100,     // Use the dynamic amount from the order
                bookingId: bookingId,    // Use the bookingId prop
              }));
              
              window.location.href = '/payment-success'; // Redirect on success
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Error verifying payment');
          }
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
      setModalIsOpen(false); // Close modal after payment is initiated
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    }
  };
  

  return (
    <div className="payment-container">
      <Typography variant="h4" gutterBottom>
        Razorpay Payment Gateway Integration
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
        Checkout
      </Button>

      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="checkout-modal-title"
        aria-describedby="checkout-modal-description"
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
            margin: 'auto',
            mt: '20%',
          }}
        >
          <Typography id="checkout-modal-title" variant="h6" component="h2" gutterBottom>
            Checkout Details
          </Typography>
          <Typography variant="body1"><strong>BookingId:</strong> {bookingId}</Typography>
          <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
          <Typography variant="body1"><strong>Contact:</strong> {contact}</Typography>
          <Typography variant="body1"><strong>Disease:</strong> {disease}</Typography>
          <Typography variant="body1"><strong>Doctor:</strong> {doctor}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {date}</Typography>
          <Typography variant="body1"><strong>Time:</strong> {time}</Typography>
          <Typography variant="body1"><strong>Amount:</strong> ₹300</Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={payNow}
            fullWidth
            sx={{ mt: 2 }}
          >
            Pay and Book the Slot
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Payment;
