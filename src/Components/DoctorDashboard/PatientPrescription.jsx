import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Modal, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { FaFileUpload, FaPills, FaCalendarCheck, FaClipboardList, FaTimes, FaDownload, FaFlask } from 'react-icons/fa';
import { BreadCrumb } from './BreadCrumb';

const prescriptions = [
  { date: '2024-10-01', medicines: [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3 times a day', prescriptionFile: 'prescription1.pdf' },
    { id: 2, name: 'Ibuprofen', dosage: '200mg', frequency: 'as needed', prescriptionFile: 'prescription2.pdf' },
  ]},
  { date: '2024-09-15', medicines: [
    { id: 3, name: 'Paracetamol', dosage: '650mg', frequency: 'twice a day', prescriptionFile: 'prescription3.pdf' },
  ]}
];

const documents = [
  { id: 1, name: 'Blood Test Results.pdf', status: 'accepted' },
  { id: 2, name: 'X-Ray Report.png', status: 'rejected' },
];

const testsRecommended = [
  { date: '2024-10-01', tests: [
    { id: 1, name: 'Blood Sugar Test' },
    { id: 2, name: 'Lipid Profile' },
  ]},
  { date: '2024-09-15', tests: [
    { id: 3, name: 'Complete Blood Count' },
  ]}
];

const PatientPrescription = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocFile, setNewDocFile] = useState(null);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const handleUploadDocument = () => {
    console.log('Uploading:', newDocName, newDocFile);
    setNewDocName('');
    setNewDocFile(null);
    handleModalClose();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
        <BreadCrumb first="Doctor Dashboard" second="Upcoming Appointments" firstLink="/doctorlogin" secondLink="/Dappointments" />
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Patient History</Typography>

      {/* Uploaded Documents Section */}
      <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="flex items-center">
            <FaFileUpload className="mr-2 text-blue-600" />
            Uploaded Documents
            <Button variant="outlined" color="primary" onClick={handleModalOpen} className="ml-4">Upload New Document</Button>
          </Typography>
          <List>
            {documents.map(doc => (
              <ListItem key={doc.id} className="flex justify-between items-center">
                <ListItemText primary={doc.name} />
                {doc.status === 'rejected' && <FaTimes className="text-red-600 ml-2" />}
                <Button variant="outlined" color="primary" className="ml-2">View</Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Date-wise Prescriptions Section */}
      <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="flex items-center">
            <FaPills className="mr-2 text-green-600" />
            Prescribed Medicines
          </Typography>
          {prescriptions.map(prescription => (
            <div key={prescription.date} className="mb-4">
              <Typography variant="subtitle1" className="font-bold">{prescription.date}</Typography>
              <List>
                {prescription.medicines.map(med => (
                  <ListItem key={med.id} className="flex justify-between items-center">
                    <ListItemText primary={`${med.name} - ${med.dosage} (${med.frequency})`} />
                    <Button variant="outlined" color="primary" className="ml-2">
                      <FaDownload className="mr-1" /> Download Prescription
                    </Button>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tests Recommended by Doctor Section */}
      <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="flex items-center">
            <FaFlask className="mr-2 text-orange-600" />
            Tests Recommended by Doctor
          </Typography>
          {testsRecommended.map(testGroup => (
            <div key={testGroup.date} className="mb-4">
              <Typography variant="subtitle1" className="font-bold">{testGroup.date}</Typography>
              <List>
                {testGroup.tests.map(test => (
                  <ListItem key={test.id} className="flex justify-between items-center">
                    <ListItemText primary={test.name} />
                    <Button variant="outlined" color="primary" className="ml-2">Schedule Test</Button>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </CardContent>
      </Card>

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
          <Button variant="contained" color="primary" onClick={handleDrawerOpen}>View Details</Button>
        </CardContent>
      </Card>

      {/* Modal for Uploading Documents */}
      <Modal open={openModal} onClose={handleModalClose}>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <Typography variant="h6" className="mb-4">Upload New Document</Typography>
            <input
              type="text"
              placeholder="Document Name"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <input
              type="file"
              onChange={(e) => setNewDocFile(e.target.files[0])}
              className="mb-4"
            />
            <Button variant="contained" color="primary" onClick={handleUploadDocument}>Upload</Button>
            <Button variant="outlined" onClick={handleModalClose} className="mt-2">Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Drawer for Viewing Progress Details */}
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
        <div className="p-4 w-80">
          <Typography variant="h6" className="mb-4">Progress Details</Typography>
          <Typography className="text-gray-600">You have made significant progress on your treatment plan.</Typography>
          <Typography className="text-gray-600">Consultation on: September 15, 2024</Typography>
          <Typography className="text-gray-600">Recommendations: Continue medication as prescribed.</Typography>
          <Button variant="contained" color="secondary" onClick={handleDrawerClose} className="mt-4">Close</Button>
        </div>
      </Drawer>
    </div>
  );
};

export default PatientPrescription;
