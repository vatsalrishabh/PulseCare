import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { BaseUrl } from '../BaseUrl';

const DoctorDiagnosis = (props) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    // Fetch existing diagnoses when the component mounts
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getDiagnosis`, {
          params: { patientId: props.patientId, bookingId: props.bookingId }
        });
        setDiagnoses(response.data);
      } catch (error) {
        console.error("Failed to fetch diagnosis:", error);
      }
    };

    fetchDiagnoses();
  }, [props.patientId, props.bookingId]);

  const sendDiagnosis = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/patients/sendDiagnosis`, {
        patientId: props.patientId,
        bookingId: props.bookingId,
        diagnosis
      });

      if (response.status === 200) {
        alert('Diagnosis submitted successfully');
        setDiagnoses([...diagnoses, { Diagnosis: diagnosis }]); // Append new diagnosis to list
        setDiagnosis('');
      }
    } catch (error) {
      console.error("Failed to send diagnosis:", error);
      alert('Error submitting diagnosis');
    }
  };

  return (
    <Box className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto mt-8">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        Doctor's Diagnosis
      </Typography>

      <List className="bg-gray-100 p-4 rounded-lg mb-4">
        {diagnoses.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.Diagnosis} className="text-gray-600" />
          </ListItem>
        ))}
      </List>

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
