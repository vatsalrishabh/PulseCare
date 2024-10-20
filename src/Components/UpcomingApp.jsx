import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Tooltip } from '@mui/material';
import { FaCopy, FaLink, FaRegCalendarAlt, FaUserMd } from 'react-icons/fa';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const UpcomingApp = () => {
  const [appointments, setAppointments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setLoggedInUser(userDetails);
      }
    };

    loadUserDetails();
  }, []);

  useEffect(() => {
    if (loggedInUser.email) {
      console.log(loggedInUser.email + ' logged IN User');
      
      const fetchAppointments = async () => {
        try {
          const response = await axios.post(`${BaseUrl}/api/patients/upcomingBookings`, { email: loggedInUser.email });
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchAppointments();
    }
  }, [loggedInUser]);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const getStatusColor = (status) => {
    return status === 'pending' ? 'yellow' : 'green'; // Adjust colors as needed
  };

  const parseBookingIdDate = (bookingId) => {
    const year = `20${bookingId.slice(0, 2)}`;
    const monthMap = {
      'JAN': 'January',
      'FEB': 'February',
      'MAR': 'March',
      'APR': 'April',
      'MAY': 'May',
      'JUN': 'June',
      'JUL': 'July',
      'AUG': 'August',
      'SEP': 'September',
      'OCT': 'October',
      'NOV': 'November',
      'DEC': 'December'
    };
    const month = monthMap[bookingId.slice(2, 5)] || 'Invalid Month';
    const day = bookingId.slice(5, 7);

    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Upcoming Appointments</Typography>
      <BreadCrumb first="Patient Dashboard" second="Appointments" firstLink="/pdash" secondLink="/appointments" />
      {appointments.length === 0 ? (
        <Typography className="text-gray-600">No upcoming appointments.</Typography>
      ) : (
        appointments.map((appointment) => {
          const {
            bookingId,
            createdAt,
            paymentInfo,
            status,
            slotTime,
          } = appointment;

          const patientName = paymentInfo.notes?.name || 'N/A';
          const patientEmail = paymentInfo.notes?.email || 'N/A';
          const patientContact = paymentInfo.notes?.contact || 'N/A';
          const doctor = paymentInfo.notes?.doctor || 'Doctor Not Assigned';
          const googleMeet = paymentInfo.googleMeet || 'Na'; 

          const date = parseBookingIdDate(bookingId);

          return (
            <Card key={bookingId} className="mb-4 shadow-lg transition-transform transform hover:scale-105">
              <CardContent>
                <Typography variant="h6" className="flex items-center">
                  <FaUserMd className="mr-2 text-blue-600" />
                  {doctor}
                </Typography>
                <Typography className="text-gray-600">
                  <FaRegCalendarAlt className="inline mr-1" />
                  Date: {date} <br />
                  Time: {slotTime || 'N/A'}
                </Typography>
                <Typography className="text-gray-600">
                  Booking ID: {bookingId}
                </Typography>
                <Typography className="text-gray-600">
                  Patient Name: {patientName}
                </Typography>
                <Typography className="text-gray-600">
                  Patient Email: {patientEmail}
                </Typography>
                <Typography className="text-gray-600">
                  Contact: {patientContact}
                </Typography>
                <Typography className="text-gray-600" style={{ color: getStatusColor(status) }}>
                  Status: {status}
                </Typography>
                <Typography className="text-gray-600">
                  <FaLink className="inline mr-1" />
                  {googleMeet && googleMeet !== 'Na' ? (
                    <>
                      Google Meet Link: {googleMeet}
                      <Tooltip title="Copy Link" arrow>
                        <Button
                          className="ml-2 text-blue-500"
                          onClick={() => handleCopyLink(googleMeet)}
                          size="small"
                        >
                          <FaCopy />
                        </Button>
                      </Tooltip>
                      <Button
                        variant="contained"
                        color="primary"
                        className="ml-2"
                        onClick={() => window.open(googleMeet, '_blank')}
                      >
                        Open
                      </Button>
                    </>
                  ) : (
                    <span>No link available.</span>
                  )}
                </Typography>
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-start">
                  {googleMeet === 'Na' ? (
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      className="rounded-md px-4 py-2"
                      onClick={() => handleRequestLink(doctor)}
                    >
                      Request Link
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default UpcomingApp;
