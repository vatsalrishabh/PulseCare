import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { CheckCircle, Person, CalendarToday, AccessTime, MedicalServices, Receipt } from '@mui/icons-material';
import pulsecarelogo from '../assets/Puslecarelogo/PulseCare.png'; // Ensure correct path for your logo
import axios from 'axios';
import { BaseUrl } from './BaseUrl'; // Ensure BaseUrl is correctly imported
import SnackBarAlert from './SnackBarAlert'; // Assuming this is your Snackbar component

const PaymentSuccess = () => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [alert, setAlert] = useState({ message: '', status: '99' }); // 99 indicates no alert
  const [emailSent, setEmailSent] = useState(false); // To track if the email has already been sent

  useEffect(() => {
    // Retrieve payment data from localStorage
    const storedData = localStorage.getItem('paymentData');
    if (storedData) {
      setPatientDetails(JSON.parse(storedData));
    }
  }, [alert]);

  useEffect(() => {
    // Send receipt email after data is set, only if email hasn't been sent yet
    const sendMail = async () => {
      if (patientDetails && !emailSent) {
        try {
          const response = await axios.post(`${BaseUrl}/api/patients/sendMailToCx`, patientDetails); // Ensure correct endpoint
          if (response.status === 200) {
            setEmailSent(true); // Mark the email as sent
            setAlert({ message: 'A copy of the receipt has been sent to your email!', status: '200' });
          }
        } catch (error) {
          console.error('Error sending receipt:', error);
          setAlert({ message: 'Failed to send receipt. Please try again later.', status: '500' });
        }
      }
    };

    if (patientDetails) {
      sendMail();
    }
  }, [patientDetails, emailSent]); // Add emailSent to the dependency array to prevent repeated API calls

  const handlePrint = () => {
    window.print();
    setTimeout(() => {
      window.location.href = '/appointments'; // Redirect to appointments after printing
    }, 3000); // Delay to allow print dialog to close before redirect
  };

  // Check if patientDetails is available
  if (!patientDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-custom-graybg p-4">
        <Typography variant="h6">Loading payment details...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-graybg p-4">
      {/* Success Message Card */}
      <Card className="w-full max-w-lg shadow-lg border border-custom-maroon rounded-lg">
        <CardContent className="text-center">
          {/* Logo Section */}
          <div className="mb-4">
            <img src={pulsecarelogo} alt="Pulsecare Logo" className="h-16 mx-auto" />
          </div>

          {/* Success Message */}
          <Typography variant="h4" className="text-custom-maroon font-bold mb-4 flex items-center justify-center">
            <CheckCircle className="mr-2 text-green-500" /> Payment Successful
          </Typography>

          {/* Patient Details Section */}
          {Object.entries(patientDetails).map(([key, value]) => (
            <div key={key} className="mb-2 flex items-center justify-start">
              {/* Display Icon Based on Key */}
              {key === 'patientId' || key === 'doctorName' ? (
                <Person className="mr-2 text-custom-maroon" />
              ) : key === 'appointmentDate' ? (
                <CalendarToday className="mr-2 text-custom-maroon" />
              ) : key === 'appointmentTime' ? (
                <AccessTime className="mr-2 text-custom-maroon" />
              ) : key === 'diseaseType' || key === 'category' ? (
                <MedicalServices className="mr-2 text-custom-maroon" />
              ) : (
                <Receipt className="mr-2 text-custom-maroon" />
              )}

              <Typography variant="body1">
                <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
              </Typography>
            </div>
          ))}

          {/* Print Button */}
          <Button
            variant="contained"
            onClick={handlePrint}
            className="mt-4 w-full no-print" // Add the no-print class here to avoid printing button
            style={{ backgroundColor: '#71a113' }} // Custom green color
          >
            Print Receipt
          </Button>

          {/* Snackbar Alert for Feedback */}
          {alert.status !== '99' && (
            <SnackBarAlert message={alert.message} status={alert.status} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
