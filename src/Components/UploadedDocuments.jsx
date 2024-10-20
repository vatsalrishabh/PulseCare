import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Modal, Select, MenuItem, TextField } from '@mui/material';
import { FaFileUpload, FaTimes, FaCheck } from 'react-icons/fa';
import axios from 'axios'; 
import { BaseUrl } from './BaseUrl';
import SnackBarAlert from './SnackBarAlert';
import ViewUploadedDoc from './ViewUploadedDoc';

const UploadedDocuments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocFile, setNewDocFile] = useState(null);
  const [newDocType, setNewDocType] = useState('');
  const [customDocType, setCustomDocType] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [patientId, setPatientId] = useState(''); // Add this line to define patientId state
  const [alert, setAlert] = useState({ message: "", status: "99" });

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleUploadDocument = async () => {
    const formData = new FormData();
    
    formData.append('bookingId', bookingId);
    formData.append('documentType', newDocType === 'Other' ? customDocType : newDocType);
    formData.append('patientId', patientId); // Now this line has a defined patientId
    formData.append('file', newDocFile);
  
    try {
      const response = await axios.post(`${BaseUrl}/api/patients/patientFileUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('File uploaded successfully:', response.data);
      setAlert({ message: 'File uploaded successfully!', status: "200" });
      
      setNewDocName('');
      setNewDocFile(null);
      setNewDocType('');
      setCustomDocType('');
      setBookingId('');
      setPatientId(''); // Reset patientId after upload
      handleModalClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      setAlert({ message: 'Failed to upload file. Please try again.', status: '400' });
    }
  };

  // Other component code...

  return (
    <>
      <SnackBarAlert message={alert.message} statusCode={alert.status} />
      
      <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="flex items-center">
            <FaFileUpload className="mr-2 text-blue-600" />
            Uploaded Documents
            <Button variant="outlined" color="primary" onClick={handleModalOpen} className="ml-4">Upload New Document</Button>
          </Typography>
          {/* Render documents... */}
        </CardContent>
      </Card>

      {/* Modal for uploading a new document */}
      <Modal open={openModal} onClose={handleModalClose}>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <Typography variant="h6" className="mb-4">Upload New Document</Typography>
            <TextField
              label="Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Patient ID" // Add this field to set patientId
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Document Name"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              fullWidth
              className="mb-4"
            />
            <Select
              label="Document Type"
              value={newDocType}
              onChange={(e) => setNewDocType(e.target.value)}
              fullWidth
              className="mb-4"
            >
              <MenuItem value="Blood Test">Blood Test</MenuItem>
              <MenuItem value="X-Ray">X-Ray</MenuItem>
              <MenuItem value="MRI Scan">MRI Scan</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {newDocType === 'Other' && (
              <TextField
                label="Specify Document Type"
                value={customDocType}
                onChange={(e) => setCustomDocType(e.target.value)}
                fullWidth
                className="mb-4"
              />
            )}
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

      <ViewUploadedDoc/>
    </>
  );
};

export default UploadedDocuments;
