import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl';
import axios from 'axios';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DEditPProfile from './DEditPProfile';
import DPProfile from './DPProfile';
import { BreadCrumb } from './BreadCrumb';


const AllPatientProfile = () => {
  const [patients, setPatients] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getAllPatients`);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleCheckDetails = (email) => {
    setSelectedEmail(email);
    navigate(`/Dpatientprofile/${email}`);
  };

  return (
    <div className='PatientProfile'>
            <BreadCrumb first="Doctor Dashboard" second="Patient Profile" firstLink="/doctorlogin" secondLink="/allpatientprofile" />
      <Typography variant="h4" gutterBottom>
        All Patient Profiles
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Mobile</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.mobile}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleCheckDetails(patient.email)}>
                    Check Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Render DEditPProfile and DPProfile only if an email is selected */}
      {selectedEmail && (
        <>
          <DEditPProfile email={selectedEmail} />
          <DPProfile email={selectedEmail} />
        </>
      )}
    </div>
  );
};

export default AllPatientProfile;
