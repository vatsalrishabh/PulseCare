import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { BaseUrl } from '../BaseUrl';

const DoctorDiagnosis = (props) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');

  const sendDiagnosis = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/patients/sendDiagnosis`, {
        patientId: props.patientId,
        bookingId: props.bookingId,
        diagnosis,
        notes
      });

      if (response.status === 200) {
        alert('Diagnosis submitted successfully');
        setDiagnosis('');
        setNotes('');
      }
    } catch (error) {
      console.error("Failed to send diagnosis:", error);
      alert('Error submitting diagnosis');
    }
  };

  return (
    <Box className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-8">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        Doctor's Diagnosis
      </Typography>
      
      <TextField
        label="Diagnosis"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        className="mb-4"
      />

      <TextField
        label="Additional Notes"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mb-4"
      />

      <Button
        onClick={sendDiagnosis}
        variant="contained"
        color="primary"
        fullWidth
      >
        Submit Diagnosis
      </Button>
    </Box>
  );
};

export default DoctorDiagnosis;
