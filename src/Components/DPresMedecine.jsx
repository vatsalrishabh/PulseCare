import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Box,
  TextField
} from '@mui/material';
import { FaPills } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'; // Importing a close icon
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import Person4Icon from '@mui/icons-material/Person4';

const DPresMedecine = (props) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // State for the form
  const [formData, setFormData] = useState({
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }]
  });

  // Load existing prescriptions on component mount
  const loadPrescriptions = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/patients/oldPrescription`, { bookingId: props.bookingId });
      if (response.data && response.data.length > 0) {
        setPrescriptions(response.data); // Set loaded prescriptions
      } else {
        // If no prescriptions exist, set default data
        const defaultPrescription = {
          bookingId: props.bookingId,
          patientId: props.patientId,
          medicines: [{ name: 'NA', dosage: 'NA', frequency: 'NA', duration: 'NA' }]
        };
        await axios.post(`${BaseUrl}/api/patients/prescribeMedecine`, defaultPrescription);
        setPrescriptions([defaultPrescription]); // Set default prescription
      }
    } catch (error) {
      console.error('Error loading prescriptions:', error);
    }
  };

  useEffect(() => {
    loadPrescriptions(); // Fetch only once when component mounts
  }, [props.bookingId]);

  // Handle form change
  const handleChange = (index, e) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index][e.target.name] = e.target.value;
    setFormData({ ...formData, medicines: newMedicines });
  };

  // Add more medicine fields
  const addMoreMedicines = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  // Handle form submission for new or updated prescription
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const prescriptionData = {
      patientId: props.patientId,
      bookingId: props.bookingId,
      date: new Date().toISOString(),
      medicines: formData.medicines
    };

    try {
      await axios.post(`${BaseUrl}/api/patients/prescribeMedecine`, prescriptionData);
      setFormData({ medicines: [{ name: '', dosage: '', frequency: '', duration: '' }] });
      alert('Prescription saved successfully.');
      loadPrescriptions(); // Reload prescriptions after saving
    } catch (error) {
      console.error('Error saving prescription:', error);
      alert('Error: ' + error.message);
    }
  };

  // Handle opening the edit modal
  const handleOpen = (prescription) => {
    setSelectedPrescription(prescription);
    setFormData({ medicines: prescription.medicines }); // Load the selected prescription into the form
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPrescription(null);
  };

  return (
    <Card className="mb-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="flex items-center">
          <Person4Icon className="mr-2 text-green-600" />
          Patient Details
        </Typography>
        <Typography variant="body1">
          <strong>Patient ID:</strong> {props.patientId}
        </Typography>
        <Typography variant="body1">
          <strong>Booking ID:</strong> {props.bookingId}
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {props.name}
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> {props.phone}
        </Typography>
        <hr />
        <hr />
        <hr />

        <Typography variant="h6" className="flex items-center mt-4">
          <FaPills className="mr-2 text-green-600" />
          Prescribed Medicines
        </Typography>

        {/* Prescription Table */}
        {prescriptions.map(prescription => (
          <div key={prescription.bookingId} className="mb-4">
            <Typography variant="subtitle1" className="font-bold">{`Booking ID: ${prescription.bookingId} (Patient ID: ${prescription.patientId})`}</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Medicine</TableCell>
                  <TableCell>Dosage</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescription.medicines.map((med, index) => (
                  <TableRow key={index}>
                    <TableCell>{med.name}</TableCell>
                    <TableCell>{med.dosage}</TableCell>
                    <TableCell>{med.frequency}</TableCell>
                    <TableCell>{med.duration}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => handleOpen(prescription)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}

        {/* Modal to Edit Prescription */}
        <Modal open={open} onClose={handleClose}>
          <Box className="bg-white p-4 shadow-md mx-auto mt-20 rounded-lg relative" style={{ width: '90%', height: '90%', overflow: 'auto' }}>
            
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={handleClose}
            >
              <IoClose size={30} />
            </button>

            <Typography variant="h6" className="font-bold">Edit Prescription</Typography>
            <form onSubmit={handleFormSubmit}>
              {formData.medicines.map((med, index) => (
                <div key={index} className="mb-4">
                  <TextField label="Medicine Name" name="name" value={med.name} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
                  <TextField label="Dosage" name="dosage" value={med.dosage} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
                  <TextField label="Frequency" name="frequency" value={med.frequency} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
                  <TextField label="Duration" name="duration" value={med.duration} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
                </div>
              ))}
              <Button variant="outlined" color="primary" onClick={addMoreMedicines}>Add More Medicines</Button>
              <Button type="submit" variant="contained" color="primary" className="mt-4">Update Prescription</Button>
            </form>
          </Box>
        </Modal>

        {/* New Prescription Form */}
        <Typography variant="h6" className="flex items-center mt-4">
          <FaPills className="mr-2 text-green-600" />
          Add New Prescription
        </Typography>
        <form onSubmit={handleFormSubmit}>
          {formData.medicines.map((med, index) => (
            <div key={index} className="mb-4">
              <TextField label="Medicine Name" name="name" value={med.name} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
              <TextField label="Dosage" name="dosage" value={med.dosage} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
              <TextField label="Frequency" name="frequency" value={med.frequency} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
              <TextField label="Duration" name="duration" value={med.duration} onChange={(e) => handleChange(index, e)} fullWidth margin="normal" />
            </div>
          ))}
          <Button variant="outlined" color="primary" onClick={addMoreMedicines}>Add More Medicines</Button>
          <Button type="submit" variant="contained" color="primary" className="mt-4">Save New Prescription</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DPresMedecine;
