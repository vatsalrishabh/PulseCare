import React from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { CheckCircle, Person, CalendarToday, AccessTime, MedicalServices, Receipt } from '@mui/icons-material';
import pulsecarelogo from '../assets/Puslecarelogo/PulseCare.png'; // Ensure correct path for your logo

const PaymentSuccess = () => {
  const patientDetails = {
    patientId: 'P123456',
    name: 'John Doe',
    appointmentDate: '2023-09-25',
    appointmentTime: '10:00 AM',
    doctorName: 'Dr. Smith',
    diseaseType: 'Consultation',
    category: 'General',
    receiptId: 'REC123456',
    transactionId: 'TRANS123456',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-graybg p-4">
      <Card className="w-full max-w-lg shadow-lg border border-custom-maroon rounded-lg">
        <CardContent className="text-center">
          {/* Logo Section */}
          <div className="mb-4">
            <img src={pulsecarelogo} alt="Pulsecare Logo" className="h-16 mx-auto" />
          </div>

          <Typography variant="h4" className="text-custom-maroon font-bold mb-4 flex items-center justify-center">
            <CheckCircle className="mr-2 text-green-500" /> Payment Successful
          </Typography>

          {/* Patient Details Section */}
          {Object.entries(patientDetails).map(([key, value]) => (
            <div key={key} className="mb-2 flex items-center justify-start">
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
            className="mt-4 w-full"
            style={{ backgroundColor: '#71a113' }} // Custom green color
          >
            Print Receipt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
