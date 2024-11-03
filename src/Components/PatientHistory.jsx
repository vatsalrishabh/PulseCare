import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Drawer } from '@mui/material';
import { FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import UploadedDocuments from './UploadedDocuments';
import PrescribedMedicines from './PrescribedMedicines';
import TestsRecommended from './TestsRecommended';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';
import { BaseUrl } from './BaseUrl';
import axios from 'axios';


const PatientHistory = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [patientId, setPatientId] = useState(null);
  const [bookingId, setBookingId] = useState(null); // Assuming you'll fetch or assign a value to bookingId

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  useEffect(() => {
    // Load user details from local storage
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setLoggedInUser(userDetails);
      }
    };

    loadUserDetails();

    const fetchPatientId = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getPatientId`, {
          params: { email: loggedInUser.email },
        });
        console.log('Fetched Patient ID:', response.data.patientId);
        setPatientId(response.data.patientId); // Store patient ID in state
        setBookingId(response.data.bookingId); // Assuming bookingId is part of the response data
      } catch (error) {
        console.error('Error fetching patient ID:', error);
      }
    };

    if (loggedInUser.email) {
      fetchPatientId(); // Fetch patient ID if email is available
    }
  }, [loggedInUser.email]); // Depend on loggedInUser.email to re-run if it changes

  return (
    <div className="">
      <div className="bg-gray-100 min-h-screen p-6">
      <BreadCrumb first="Patient Dashboard" second="Patient History" firstLink="/pdash" secondLink="/history" />
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Patient History</Typography>

      {/* <div>
      
        <Card className="mb-4 shadow-lg">
          <CardContent>
            <Typography variant="h6" className="flex items-center">
              <FaCalendarCheck className="mr-2 text-yellow-600" />
              Next Checkup Date
            </Typography>
            <Typography className="text-gray-600">October 30, 2024</Typography>
          </CardContent>
        </Card>

   
        <Card className="mb-4 shadow-lg">
          <CardContent>
            <Typography variant="h6" className="flex items-center">
              <FaClipboardList className="mr-2 text-purple-600" />
              Progress
            </Typography>
            <Typography className="text-gray-600">Overall health progress: 80%</Typography>
            <Button variant="contained" color="primary" onClick={handleDrawerOpen} className="mt-4">
              View Detailed Progress
            </Button>
            <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
              <div className="w-80 p-4">
                <Typography variant="h6" className="mb-4">Detailed Progress</Typography>
          
                <Button variant="outlined" onClick={handleDrawerClose}>Close</Button>
              </div>
            </Drawer>
          </CardContent>
        </Card>
      </div> */}

      {/* Uploaded Documents Component */}
      <UploadedDocuments patientEmail={loggedInUser.email} patientId={patientId} bookingId={bookingId} />

      {/* Prescribed Medicines Component */}
      <PrescribedMedicines patientEmail={loggedInUser.email} patientId={patientId} bookingId={bookingId} />

      {/* Tests Recommended Component */}
      <TestsRecommended patientEmail={loggedInUser.email} patientId={patientId} bookingId={bookingId} />
      </div>


    </div>
  );
};

export default PatientHistory;
