import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import brandlogo from '../../assets/Puslecarelogo/PulseCare.png';
import docsign from '../../assets/Puslecarelogo/signature.jpg';
import {
  Card,
  Typography,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
} from '@mui/material';
import { FaUserMd, FaBriefcaseMedical } from 'react-icons/fa';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';

const Prescription = () => {
  const { bookingId } = useParams(); 
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [patientDetails, setPatientDetails] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [recommendedTests, setRecommendedTests] = useState([]);
  const [patientComplaints, setPatientComplaints] = useState([]);
  const [doctorDiagnoses, setDoctorDiagnoses] = useState([]);

  useEffect(() => {
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        setLoggedInUser(JSON.parse(storedUserDetails));
      }
    };
    loadUserDetails();
  }, []);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/fetchAllPrescriptionDetails`, {
          params: { email: loggedInUser.email, bookingId },
        });
        const data = response.data;
        setDoctorDetails(data.doctorDetails);
        setPatientDetails(data.patientDetails);
        setMedicines(data.medicines);
        setRecommendedTests(data.recommendedTests || []);
        setPatientComplaints(data.patientComplaints || []);
        setDoctorDiagnoses(data.doctorDiagnoses || []);
      } catch (error) {
        console.error("Failed to fetch prescription details", error);
        setError("Failed to load prescription details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser.email) fetchPrescriptionDetails();
  }, [loggedInUser.email, bookingId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : error ? (
        <Snackbar
          open={true}
          message={error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        />
      ) : (
        <>
          {/* Header Section */}
          <Card className="mb-6 p-4 shadow-lg bg-gradient-to-r from-blue-200 to-blue-50 rounded-lg border border-blue-300">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <img src={brandlogo} alt="PulseCare Logo" className="w-32" />
              </Grid>
              <Grid item xs={6} className="text-right">
                <Typography variant="h6" className="flex items-center text-blue-600">
                  <FaUserMd className="mr-2" /> {doctorDetails.doctorName}
                </Typography>
                <Typography variant="body1">License: {doctorDetails.doctorLicense}</Typography>
                <Typography variant="body1">Degree: {doctorDetails.degree}</Typography>
              </Grid>
            </Grid>
          </Card>

          {/* Patient Details Section */}
          <Card className="mb-6 p-4 shadow-lg bg-gradient-to-r from-green-200 to-green-50 rounded-lg border border-green-300">
            <Typography variant="h6" className="mb-4 text-green-700">Patient Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Name:</strong> {patientDetails.name}</Typography>
                <Typography variant="body2"><strong>Phone:</strong> {patientDetails.number}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {patientDetails.email}</Typography>
                <Typography variant="body2"><strong>Address:</strong> {patientDetails.address}</Typography>
                <Typography variant="body2"><strong>Age:</strong> {patientDetails.age}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Sex:</strong> {patientDetails.sex}</Typography>
                <Typography variant="body2"><strong>Weight:</strong> {patientDetails.weight}</Typography>
                <Typography variant="body2"><strong>Blood Pressure:</strong> {patientDetails.bloodPressure}</Typography>
                <Typography variant="body2"><strong>Height:</strong> {patientDetails.height}</Typography>
              </Grid>
            </Grid>
          </Card>

          {/* Patient Complaints Section */}
          <Card className="mb-6 p-4 shadow-lg border border-pink-300 rounded-lg">
            <Typography variant="h6" className="mb-4 text-pink-600">Patient Complaints</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>S.No</strong></TableCell>
                    <TableCell align="center"><strong>Complaint</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patientComplaints.map((complaint, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{complaint.Complaint}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Doctor Diagnoses Section */}
          <Card className="mb-6 p-4 shadow-lg border border-yellow-300 rounded-lg">
            <Typography variant="h6" className="mb-4 text-yellow-600">Doctor's Diagnoses</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>S.No</strong></TableCell>
                    <TableCell align="center"><strong>Diagnosis</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doctorDiagnoses.map((diagnosis, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{diagnosis.Diagnosis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Recommended Tests Section */}
          <Card className="mb-6 p-4 shadow-lg border border-indigo-300 rounded-lg">
            <Typography variant="h6" className="mb-4 text-indigo-600">
              <FaBriefcaseMedical className="mr-2 text-green-500" /> Recommended Tests
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>S.No</strong></TableCell>
                    <TableCell align="center"><strong>Test Name</strong></TableCell>
                    <TableCell align="center"><strong>Date</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recommendedTests.map((test, index) => (
                    <TableRow key={test._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{test.name}</TableCell>
                      <TableCell align="center">{test.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Prescribed Medicines Section */}
          <Card className="mb-6 p-4 shadow-lg border border-teal-300 rounded-lg">
            <Typography variant="h6" className="mb-4 text-teal-600">Prescribed Medicines</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>S.No</strong></TableCell>
                    <TableCell align="center"><strong>Medicine</strong></TableCell>
                    <TableCell align="center"><strong>Dosage</strong></TableCell>
                    <TableCell align="center"><strong>Frequency</strong></TableCell>
                    <TableCell align="center"><strong>Duration</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicines.map((medicine, index) => (
                    <TableRow key={medicine._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{medicine.name}</TableCell>
                      <TableCell align="center">{medicine.dosage}</TableCell>
                      <TableCell align="center">{medicine.frequency}</TableCell>
                      <TableCell align="center">{medicine.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Doctor Signature Section */}
          <Grid container className="mb-6">
            <Grid item xs={12} className="flex justify-end">
              <img src={docsign} alt="Doctor Signature" className="w-20 mt-4" />
            </Grid>
          </Grid>

          {/* Print Button */}
          <Button
            onClick={handlePrint}
            variant="contained"
            color="primary"
            className="mt-6"
            style={{ display: 'block', margin: '0 auto' }}
          >
            Print Prescription
          </Button>
        </>
      )}
    </div>
  );
};

export default Prescription;
