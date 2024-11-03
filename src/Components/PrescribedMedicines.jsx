import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FaPills, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const PrescribedMedicines = ({ patientEmail }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/patients/PatientOldPrescription`, { patientEmail });
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
    setTimeout(() => {
      fetchPrescriptions();
    }, 2000);
  }, [patientEmail]);

  const handleOpen = (bookingId) => {
    navigate(`/pres/${bookingId}`);
  };

  const getUniqueMedicines = (medicines) => {
    const uniqueMedicines = [];
    const seen = new Set();
    medicines.forEach((med) => {
      if (!seen.has(med.name)) {
        seen.add(med.name);
        uniqueMedicines.push(med);
      }
    });
    return uniqueMedicines;
  };

  // Group prescriptions by bookingId
  const prescriptionsByBooking = prescriptions.reduce((acc, prescription) => {
    if (!acc[prescription.bookingId]) {
      acc[prescription.bookingId] = { date: prescription.date, medicines: [] };
    }
    acc[prescription.bookingId].medicines.push(...prescription.medicines);
    return acc;
  }, {});

  return (
    <Card className="mb-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="flex items-center">
          <FaPills className="mr-2 text-green-600" />
          Prescribed Medicines
        </Typography>

        {Object.keys(prescriptionsByBooking).map((bookingId) => {
          const { date, medicines } = prescriptionsByBooking[bookingId];
          const formattedDate = new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });

          return (
            <div key={bookingId} className="mb-4">
              <Typography variant="subtitle1" className="font-bold">
                {`Date: ${formattedDate}, Booking ID: ${bookingId}`}
              </Typography>
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
                  {getUniqueMedicines(medicines).map((med) => (
                    <TableRow key={med._id}>
                      <TableCell>{med.name}</TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>{med.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                variant="outlined"
                color="primary"
                className="mt-2"
                onClick={() => handleOpen(bookingId)}
              >
                <FaDownload className="mr-1" /> Download Prescription
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PrescribedMedicines;
