import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, Box } from '@mui/material';
import { FaPills, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const PrescribedMedicines = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/oldPrescription`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleOpen = (prescription) => {
    setSelectedPrescription(prescription);
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
          <FaPills className="mr-2 text-green-600" />
          Prescribed Medicines
        </Typography>

        {prescriptions.map((prescription) => (
          <div key={prescription.bookingId} className="mb-4">
            <Typography variant="subtitle1" className="font-bold">{`Booking ID: ${prescription.bookingId} (Patient ID: ${prescription.patientId})`}</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Medicine</TableCell>
                  <TableCell>Dosage</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescription.medicines.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell>{med.name}</TableCell>
                    <TableCell>{med.dosage}</TableCell>
                    <TableCell>{med.frequency}</TableCell>
                    <TableCell>{med.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button variant="outlined" color="primary" className="mt-2" onClick={() => handleOpen(prescription)}>
              <FaDownload className="mr-1" /> Download Prescription
            </Button>
          </div>
        ))}

        {/* Modal to display prescription details */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box className="bg-white p-4 shadow-md mx-auto mt-20 rounded-lg" style={{ width: 400 }}>
            <Typography id="modal-title" variant="h6" className="font-bold">
              Prescription Download
            </Typography>
            {selectedPrescription && (
              <div>
                <Typography variant="subtitle1" className="mt-2">
                  <strong>Booking ID:</strong> {selectedPrescription.bookingId}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Patient ID:</strong> {selectedPrescription.patientId}
                </Typography>
                <Typography variant="subtitle1" className="mt-2">
                  Download the prescription file:
                </Typography>
                <ul className="mt-2">
                  {selectedPrescription.medicines.map((med) => (
                    <li key={med.id}>
                      <a
                        href={`/path/to/prescriptions/${med.prescriptionFile}`}
                        download
                        className="text-blue-600 underline"
                      >
                        {med.prescriptionFile}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button variant="contained" color="primary" className="mt-4" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default PrescribedMedicines;
