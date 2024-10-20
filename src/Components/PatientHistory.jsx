import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Drawer } from '@mui/material';
import { FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import UploadedDocuments from './UploadedDocuments';
import PrescribedMedicines from './PrescribedMedicines';
import TestsRecommended from './TestsRecommended';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';

const PatientHistory = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <BreadCrumb first="Patient Dashboard" second="Patient History" firstLink="/pdash" secondLink="/history" />
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Patient History</Typography>

<div>
   {/* Next Checkup Date Section */}
   <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="flex items-center">
            <FaCalendarCheck className="mr-2 text-yellow-600" />
            Next Checkup Date
          </Typography>
          <Typography className="text-gray-600">October 30, 2024</Typography>
        </CardContent>
      </Card>

      {/* Progress Section */}
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
              {/* Add more detailed progress info here */}
              <Button variant="outlined" onClick={handleDrawerClose}>Close</Button>
            </div>
          </Drawer>
        </CardContent>
      </Card>
</div>

      {/* Uploaded Documents Component */}
      <UploadedDocuments />

      {/* Prescribed Medicines Component */}
      <PrescribedMedicines />

      {/* Tests Recommended Component */}
      <TestsRecommended />

     
    </div>
  );
};

export default PatientHistory;
