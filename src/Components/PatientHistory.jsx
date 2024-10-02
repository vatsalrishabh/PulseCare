import React from 'react';
import { Button, Card, CardContent, Typography, Modal, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { FaFileUpload, FaPills, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';

const documents = [
  { id: 1, name: 'Blood Test Results.pdf' },
  { id: 2, name: 'X-Ray Report.png' },
];

const medicines = [
  { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3 times a day' },
  { id: 2, name: 'Ibuprofen', dosage: '200mg', frequency: 'as needed' },
];

const PatientHistory = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Patient History</Typography>

      <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="flex items-center">
            <FaFileUpload className="mr-2 text-blue-600" />
            Uploaded Documents
          </Typography>
          <List>
            {documents.map(doc => (
              <ListItem key={doc.id}>
                <ListItemText primary={doc.name} />
                <Button variant="outlined" color="primary" onClick={handleModalOpen}>View</Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="flex items-center">
            <FaPills className="mr-2 text-green-600" />
            Prescribed Medicines
          </Typography>
          <List>
            {medicines.map(med => (
              <ListItem key={med.id}>
                <ListItemText primary={`${med.name} - ${med.dosage} (${med.frequency})`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

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
          <Button variant="contained" color="primary" onClick={handleDrawerOpen}>View Details</Button>
        </CardContent>
      </Card>

      {/* Modal for Viewing Documents */}
      <Modal open={openModal} onClose={handleModalClose}>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <Typography variant="h6" className="mb-4">Document Preview</Typography>
            <Typography className="text-gray-700">Here you can view the document content.</Typography>
            <Button variant="contained" color="secondary" onClick={handleModalClose} className="mt-4">Close</Button>
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

export default PatientHistory;
