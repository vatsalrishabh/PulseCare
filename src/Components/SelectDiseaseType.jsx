import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Search, ArrowForward } from '@mui/icons-material';
import { Button, Typography, Paper } from '@mui/material';
import SchedulePage from './SchedulePage';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';
import { BaseUrl } from './BaseUrl'; // Import your BaseUrl

const diseaseTypes = [
  { label: 'General/Not Aware!' },
  { label: 'Diabetes' },
  { label: 'Hypertension' },
  { label: 'Asthma' },
  { label: 'Cancer' },
  { label: 'Heart Disease' },
  { label: 'COVID-19' },
];

const SelectDiseaseType = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]); // State to hold doctors
  const [showDates, setShowDates] = useState(false);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(userDetails);
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/doctors/getAllDoctors`);
        const doctorsWithId = response.data.map(doctor => ({
          name: doctor.name,
          id: doctor.email.split('@')[0], // Extract ID from email before '@'
        }));
        setDoctorsList(doctorsWithId);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
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
          <BreadCrumb first="Patient Dashboard" second="Appointment Booking" firstLink="/pdash" secondLink="/selectDis" />
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
