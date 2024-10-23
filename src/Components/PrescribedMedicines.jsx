import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, Box } from '@mui/material';
import { FaPills, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const PrescribedMedicines = ({ patientEmail }) => { // Accept patientEmail as a prop
  const [prescriptions, setPrescriptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/patients/PatientOldPrescription`, { patientEmail }); // POST request with patientEmail
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
setTimeout(()=>{
  fetchPrescriptions();
},2000)

  }, [patientEmail]); // Fetch prescriptions when patientEmail changes

  const handleOpen = (prescription) => {
    setSelectedPrescription(prescription);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPrescription(null);
  };

  // Create a unique set of medicines
  const getUniqueMedicines = (medicines) => {
    const uniqueMedicines = [];
    const seen = new Set();
    medicines.forEach(med => {
      if (!seen.has(med.id)) {
        seen.add(med.id);
        uniqueMedicines.push(med);
      }
    });
    return uniqueMedicines;
  };

  // Filter out duplicate prescriptions by bookingId
  const uniquePrescriptions = prescriptions.filter((prescription, index, self) =>
    index === self.findIndex((p) => p.bookingId === prescription.bookingId)
  );

  return (
    <Card className="mb-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="flex items-center">
          <FaPills className="mr-2 text-green-600" />
          Prescribed Medicines
        </Typography>

        {uniquePrescriptions.map((prescription) => (
          <div key={prescription._id} className="mb-4"> {/* Use a unique key for each prescription */}
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
                {getUniqueMedicines(prescription.medicines).map((med) => ( // Use the function to get unique medicines
                  <TableRow key={med.id}> {/* Ensure each medicine has a unique key */}
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
                  {getUniqueMedicines(selectedPrescription.medicines).map((med) => ( // Use the function to get unique medicines
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
