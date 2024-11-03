import React from 'react';
import { Typography, Button } from '@mui/material';

const Prescription = ({ bookingId, date, medicines, patientInfo, onClose }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div>
      <Typography variant="h6" color="primary" className="font-bold mb-4">
        Prescription Details
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        <strong>Patient Name:</strong> {patientInfo.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Booking ID:</strong> {bookingId}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Date:</strong> {formattedDate}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Age:</strong> {patientInfo.age}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Sex:</strong> {patientInfo.sex}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Mobile:</strong> {patientInfo.mobile}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Email:</strong> {patientInfo.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Address:</strong> {patientInfo.address}
      </Typography>

      <Typography variant="h6" color="textSecondary" className="font-bold mt-4">
        Prescribed Medicines
      </Typography>
      <ul>
        {medicines.map((med) => (
          <li key={med._id}>
            <Typography variant="body1">
              {med.name} - {med.dosage}, {med.frequency}, {med.duration}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography variant="h6" color="textSecondary" className="font-bold mt-4">
        Doctor's Information
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Doctor Name:</strong> Dr. John Doe
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>License Number:</strong> ABC12345
      </Typography>

      <Button variant="contained" color="primary" className="mt-4" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default Prescription;
