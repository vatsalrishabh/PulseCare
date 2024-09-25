import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Search, ArrowForward } from '@mui/icons-material';
import { Button, Typography, Paper } from '@mui/material';
import SchedulePage from './SchedulePage';

const diseaseTypes = [
  { label: 'Diabetes' },
  { label: 'Hypertension' },
  { label: 'Asthma' },
  { label: 'Cancer' },
  { label: 'Heart Disease' },
  { label: 'COVID-19' },
  { label: 'General/Not Aware!' },
];

const doctorsList = [
  { name: 'Dr. John Doe', id: '12345' },
  { name: 'Dr. Jane Smith', id: '67890' },
  { name: 'Dr. Alice Brown', id: '54321' },
  // Add more doctors as needed
];

const SelectDiseaseType = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDates, setShowDates] = useState(false);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(userDetails);
    }
  }, []);

  const handleNext = () => {
    if (selectedDisease && selectedDoctor) {
      setShowDates(true); // Show SchedulePage if both are selected
    }
  };

  return (
    showDates ? (
      <SchedulePage selectedDisease={selectedDisease} selectedDoctor={selectedDoctor} />
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col items-center justify-center h-screen bg-gradient-to-r from-custom-graybg to-custom-green p-6`}
      >
        <Paper elevation={3} className="p-6 rounded-lg shadow-lg w-full max-w-md">
          <Typography variant="h4" className="text-custom-maroon text-center font-bold mb-4">
            Appointment Booking
          </Typography>
          
          <Typography 
            variant="body1" 
            className="text-custom-gray0 mb-6 text-center p-4" // Added padding
          >
            Hello {loggedInUser ? loggedInUser.name : 'Vatsal'}! Let's book an appointment for you. 
            Please select the category of disease. If you are not aware, please select "General/Not Aware".
          </Typography>

          <Autocomplete
            disablePortal
            options={diseaseTypes}
            className="mb-6"
            onChange={(event, value) => setSelectedDisease(value?.label)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Disease Type"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <Search className="mr-2 text-gray-500" />,
                }}
                fullWidth
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={doctorsList}
            getOptionLabel={(option) => `${option.name} (ID: ${option.id})`}
            className="mb-6"
            onChange={(event, value) => setSelectedDoctor(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Doctor"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <Search className="mr-2 text-gray-500" />,
                }}
                fullWidth
              />
            )}
          />

          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={!selectedDisease || !selectedDoctor} // Disable button if not selected
          >
            Click here to select Dates
          </Button>
        </Paper>
      </motion.div>
    )
  );
};

export default SelectDiseaseType;
