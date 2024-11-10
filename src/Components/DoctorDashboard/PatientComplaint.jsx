import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { TextField, Button, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const PatientComplaint = (props) => {
  const [complaint, setComplaint] = useState('');
  const [editing, setEditing] = useState(false);
  const [previousComplaint, setPreviousComplaint] = useState('');

  useEffect(() => {
    // Fetch existing complaint if any
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getPatientComplaint`, {
          params: { patientId: props.patientId, bookingId: props.bookingId }
        });
        
        if (response.data && response.data.Complaint) {
          setPreviousComplaint(response.data.Complaint);
          setComplaint(response.data.Complaint);
        }
      } catch (error) {
        console.error("Failed to fetch complaint:", error);
      }
    };

    fetchComplaint();
  }, [props.patientId, props.bookingId]);

  const sendComplaint = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/patients/patientComplaint`, {
        patientId: props.patientId,
        bookingId: props.bookingId,
        complaint: complaint
      });

      if (response.status === 200) {
        alert('Complaint submitted successfully');
        setPreviousComplaint(complaint);
        setEditing(false);
      }
    } catch (error) {
      console.error("Failed to send complaint:", error);
      alert('Error submitting complaint');
    }
  };

  return (
    <Box className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto mt-8">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        Patient Complaint
      </Typography>
      
      {previousComplaint && !editing ? (
        <Box className="bg-gray-100 p-4 rounded-lg mb-4 relative">
          <Typography variant="body1" className="text-gray-600">
            {previousComplaint}
          </Typography>
          <IconButton
            className="absolute top-2 right-2"
            onClick={() => setEditing(true)}
          >
            <EditIcon color="primary" />
          </IconButton>
        </Box>
      ) : (
        <TextField
          label="Enter patient's complaint"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          className="mb-4"
        />
      )}

      <Button
        onClick={sendComplaint}
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        fullWidth
        className="mt-2"
      >
        {editing ? 'Update Complaint' : 'Submit Complaint'}
      </Button>
    </Box>
  );
};

export default PatientComplaint;
