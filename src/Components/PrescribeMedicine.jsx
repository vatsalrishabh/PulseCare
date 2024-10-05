import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Autocomplete from '@mui/material/Autocomplete';
import PrescribeModal from './PrescribeModal';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const PrescribeMedicine = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getAllBookings`);
        
        // Log the response data
        console.log('Booking Data:', response.data);

        setBookingData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  useEffect(() => {
    setFilteredData(
      bookingData.filter((booking) =>
        booking.slots.some((slot) => slot._doc.bookingId.includes(searchValue))
      )
    );
  }, [searchValue, bookingData]);

  const handleInfoClick = (data) => {
    setSelectedData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedData(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'green';
      case 'not available':
        return 'red';
      case 'booked':
        return 'grey';
      default:
        return 'black';
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div className="p-5">
      <BreadCrumb
        first="Doctor Dashboard"
        second="Treatment/Prescription"
        firstLink="/doctorlogin"
        secondLink="/prescriptions"
      />

      <Autocomplete
        options={bookingData.flatMap(booking => booking.slots.map(slot => slot._doc.bookingId))}
        onInputChange={(event, newValue) => setSearchValue(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Search by Booking ID" variant="outlined" />
        )}
        style={{ marginBottom: '20px' }}
      />

      <TableContainer component={Paper} elevation={3} className="shadow-lg transition-shadow duration-300">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Booking ID</TableCell>
              <TableCell className="font-bold">Date</TableCell>
              <TableCell className="font-bold">Time</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((booking) =>
                booking.slots.map((slot) => (
                  <TableRow
                    key={`${slot._doc.bookingId}-${booking.date}-${slot._doc.time}`} // Ensuring unique keys
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <TableCell>{slot._doc.bookingId}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{slot._doc.time}</TableCell>
                    <TableCell style={{ color: getStatusColor(slot._doc.status) }}>
                      {slot._doc.status}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleInfoClick(slot)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No bookings available
                </TableCell>
              </TableRow>
            )}
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
