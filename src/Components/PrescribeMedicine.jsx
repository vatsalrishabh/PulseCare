import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Snackbar,
  TextField,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { BaseUrl } from '../Components/BaseUrl'; // Adjust the import according to your structure
import DPresMedecine from './DPresMedecine';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';

const PrescribeMedicine = () => {
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const statusQuery = statusFilter ? `?status=${statusFilter}` : '';
        const response = await axios.get(`${BaseUrl}/api/patients/getAllBookings${statusQuery}`);
        console.log('Fetched booking data:', response.data);

        if (typeof response.data === 'object' && response.data !== null) {
          const bookingsArray = Object.values(response.data);
          setBookingData(bookingsArray);
          setFilteredData(bookingsArray);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [statusFilter]);

  // Update the filtered data based on the search term
  useEffect(() => {
    const result = bookingData.filter(booking => {
      return (
        booking.bookingId.toString().includes(searchTerm) || // Check bookingId
        booking.patientId.toString().includes(searchTerm) || // Check patientId
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) // Check patient name
      );
    });
    setFilteredData(result);
  }, [searchTerm, bookingData]);

  const handleInfoClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Cancelled':
        return 'red';
      default:
        return 'black';
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="p-4">
       <BreadCrumb first="Doctor Dashboard" second="Prescribing Medecines" firstLink="/doctorlogin" secondLink="/prescriptions" />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal} />
          <div className="bg-white rounded-lg shadow-lg z-10 w-11/12 h-11/12 max-w-3xl max-h-[90vh] overflow-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Prescribe Medicine</h2>
              {selectedBooking && (
                <DPresMedecine
                  bookingId={selectedBooking.bookingId}
                  patientId={selectedBooking.patientId}
                  name={selectedBooking.name}
                  email={selectedBooking.email}
                  phone={selectedBooking.mobile}
                />
              )}
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Box */}
      <TextField
        label="Search by Booking ID, Patient ID or Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Patient ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {Array.isArray(filteredData) && filteredData.length > 0 ? (
    filteredData.map((booking) => (
      <TableRow key={booking.bookingId}>
        <TableCell>{booking.bookingId}</TableCell>
        <TableCell>{booking.date}</TableCell>
        <TableCell>{booking.patientId}</TableCell>
        <TableCell style={{ color: getStatusColor(booking.status) }}>
          {booking.status}
        </TableCell>
        <TableCell>
          <IconButton onClick={() => handleInfoClick(booking)}>
            <InfoIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No bookings available
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>

      <Snackbar
        open={!!error}
        message={error}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default PrescribeMedicine;
