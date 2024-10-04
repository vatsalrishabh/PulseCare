import React, { useState } from 'react';
import {
  Breadcrumbs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import PrescribeModal from './PrescribeModal';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';

const PrescribeMedicine = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const bookingData = [
    {
      bookingId: 'B001',
      email: 'patient1@example.com',
      number: '123-456-7890',
      mobile: '9876543210',
      paymentDetails: 'Paid',
    },
    {
      bookingId: 'B002',
      email: 'patient2@example.com',
      number: '234-567-8901',
      mobile: '8765432109',
      paymentDetails: 'Pending',
    },
  ];

  const handleInfoClick = (data) => {
    setSelectedData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedData(null);
  };

  return (
    <div className="p-5">
     <BreadCrumb first="Doctor Dashboard" second="Treatment/Prescription" firstLink="/doctorlogin" secondLink="/prescriptions" />

      <TableContainer component={Paper} elevation={3} className="shadow-lg transition-shadow duration-300">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Booking ID</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Number</TableCell>
              <TableCell className="font-bold">Mobile</TableCell>
              <TableCell className="font-bold">Payment Details</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingData.map((row) => (
              <TableRow key={row.bookingId} className="hover:bg-gray-100 transition-colors duration-200">
                <TableCell>{row.bookingId}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.paymentDetails}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleInfoClick(row)}>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PrescribeModal
        open={openModal}
        onClose={handleCloseModal}
        data={selectedData}
      />
    </div>
  );
};

export default PrescribeMedicine;
