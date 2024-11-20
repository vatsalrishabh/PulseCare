import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { TextField, Button, Typography, IconButton, Box, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const PatientComplaint = (props) => {
  const [complaint, setComplaint] = useState('');
  const [editing, setEditing] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch existing complaints if any
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getPatientComplaint`, {
          params: { patientId: props.patientId, bookingId: props.bookingId }
        });

        if (response.data && response.data.data) {
          setComplaints(response.data.data); // Assuming data is the array of complaints
          console.log(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
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
        setComplaints([...complaints, { Complaint: complaint }]); // Add the new complaint to the list
        setComplaint('');
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
        Patient Complaints
      </Typography>
      
      <List className="bg-gray-100 p-4 rounded-lg mb-4">
        {complaints.map((item, index) => (
          <ListItem key={index} className="relative">
            <ListItemText
              primary={item.Complaint || 'No complaint provided'}
              className="text-gray-600"
            />
            <IconButton
              className="absolute top-2 right-2"
              onClick={() => {
                setEditing(true);
                setComplaint(item.Complaint);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {editing ? (
        <TextField
          label="Edit patient's complaint"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          className="mb-4"
        />
      ) : (
        <TextField
          label="Enter new complaint"
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
