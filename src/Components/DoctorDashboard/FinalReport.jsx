import React from 'react';
import { Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import MedicalLogo from '../../assets/Puslecarelogo/PulseCare.png'; // Update with your logo path
import { Person, CalendarToday, Phone, LocationOn, Description, Notes } from '@mui/icons-material';

const FinalReport = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper className="p-8 max-w-lg bg-white shadow-lg rounded-lg">
        <div className="flex items-center mb-4">
          <img src={MedicalLogo} alt="Medical Logo" className="h-16 mr-4" />
          <Typography variant="h4" className="text-custom-maroon font-bold">
            Doctor's Prescription
          </Typography>
        </div>

        <TableContainer>
          <Table>
            <TableBody>
              {/* Patient Information */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6" className="text-gray-700">Patient Information</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Person className="mr-2" /> Name:</TableCell>
                <TableCell>John Doe</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><CalendarToday className="mr-2" /> Date of Birth:</TableCell>
                <TableCell>01/01/1990</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Phone className="mr-2" /> Contact:</TableCell>
                <TableCell>(123) 456-7890</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Patient ID:</TableCell>
                <TableCell>123456</TableCell>
              </TableRow>

              {/* Physician Information */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6" className="text-gray-700 mt-4">Physician Information</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Person className="mr-2" /> Dr. Jane Smith, MD</TableCell>
                <TableCell><Phone className="mr-2" /> Contact: (098) 765-4321</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><LocationOn className="mr-2" /> Address:</TableCell>
                <TableCell>123 Health St, City, State</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medical License #:</TableCell>
                <TableCell>ABC123456</TableCell>
              </TableRow>

              {/* Diagnosis */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6" className="text-gray-700 mt-4">Diagnosis</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Condition:</TableCell>
                <TableCell>Hypertension</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ICD Code:</TableCell>
                <TableCell>I10</TableCell>
              </TableRow>

              {/* Tests and Examinations */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6" className="text-gray-700 mt-4">Tests and Examinations</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tests Ordered:</TableCell>
                <TableCell>Blood Pressure Monitoring</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rationale:</TableCell>
                <TableCell>To monitor patient’s hypertension</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Instructions:</TableCell>
                <TableCell>Visit the lab on fasting.</TableCell>
              </TableRow>

              {/* Treatment Plan */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6" className="text-gray-700 mt-4">Treatment Plan</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medication:</TableCell>
                <TableCell>Lisinopril, 10 mg, Oral, Once daily</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Duration:</TableCell>
                <TableCell>30 days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Recommendations:</TableCell>
                <TableCell>Low-sodium diet, regular exercise</TableCell>
              </TableRow>

              {/* Patient Instructions */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6" className="text-gray-700 mt-4">Patient Instructions</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Instructions:</TableCell>
                <TableCell>Take medication with food.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monitoring:</TableCell>
                <TableCell>Monitor blood pressure regularly.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Emergency Contact:</TableCell>
                <TableCell>(555) 123-4567</TableCell>
              </TableRow>

              {/* Signature */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography className="flex items-center mt-4">
                    <Notes className="mr-2" /> Doctor's Signature: __________________
                  </Typography>
                  <Typography>Date: [DD/MM/YYYY]</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="primary"
          className="mt-6"
        >
          Print Prescription
        </Button>
      </Paper>
    </div>
  );
};

export default FinalReport;
