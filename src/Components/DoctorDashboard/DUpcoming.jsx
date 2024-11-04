import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Tooltip, TextField } from '@mui/material';
import { FaCopy, FaLink, FaRegCalendarAlt, FaUserMd } from 'react-icons/fa';
import { BreadCrumb } from './BreadCrumb';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';

const DUpcoming = () => {
  const [appointments, setAppointments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [currentLink, setCurrentLink] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false); // State to control link modal visibility

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
      const fetchAppointments = async () => {
        try {
          const response = await axios.post(`${BaseUrl}/api/doctors/getAllBookings`);
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
  };

  const getStatusColor = (status) => {
    return status === 'pending' ? 'yellow' : 'green'; 
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

  const handleOpenLinkModal = (appointment) => {
    setSelectedAppointment(appointment);
    setCurrentLink('');
    setIsLinkModalOpen(true);
  };

  const handleCloseLinkModal = () => {
    setIsLinkModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSubmitLink = async () => {
    const bookingId = selectedAppointment?.bookingId;
    if (currentLink && bookingId) {
      try {
        const response = await axios.post(`${BaseUrl}/api/doctors/postGoogleMeet`, {
          bookingId,
          googlemeetlink: currentLink,
        });
        if (response.status === 200) {
          const updatedAppointments = appointments.map((appointment) =>
            appointment.bookingId === bookingId
              ? { ...appointment, googleMeet: currentLink }
              : appointment
          );
          setAppointments(updatedAppointments);
          handleCloseLinkModal(); // Close the modal after submitting
        }
      } catch (error) {
        console.error('Error uploading Google Meet link:', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Upcoming Appointments</Typography>
      <BreadCrumb first="Doctor Dashboard" second="Appointments" firstLink="/doctorlogin" secondLink="/Dappointments" />
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
          const isCanceled = status !== 'booked';

          return (
            <Card
              key={bookingId}
              className={`mb-4 shadow-lg transition-transform transform hover:scale-105 ${isCanceled ? 'filter grayscale' : ''}`}
            >
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
                <Typography className="text-gray-600">Booking ID: {bookingId}</Typography>
                <Typography className="text-gray-600">Patient Name: {patientName}</Typography>
                <Typography className="text-gray-600">Patient Email: {patientEmail}</Typography>
                <Typography className="text-gray-600">Contact: {patientContact}</Typography>
                <Typography className="text-gray-600" style={{ color: getStatusColor(status) }}>
                  Status: {isCanceled ? "Canceled by Doctor" : status}
                </Typography>
                <Typography className="text-gray-600">
                  <FaLink className="inline mr-1" />
                  {googleMeet && googleMeet !== 'Na' ? (
                    <>
                      Google Meet Link: {googleMeet}
                      <Tooltip title="Copy Link" arrow>
                        <Button className="ml-2 text-blue-500" onClick={() => handleCopyLink(googleMeet)} size="small">
                          <FaCopy />
                        </Button>
                      </Tooltip>
                      <Button variant="contained" color="primary" className="ml-2" onClick={() => window.open(googleMeet, '_blank')}>
                        Open
                      </Button>
                      <Button variant="contained" color="secondary" className="ml-2" onClick={() => handleOpenLinkModal(appointment)}>
                        Edit Link
                      </Button>
                    </>
                  ) : (
                    <span>No link available.</span>
                  )}
                </Typography>
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-start">
                  {googleMeet === 'Na' ? (
                    <Button variant="contained" color="secondary" className="rounded-md px-4 py-2" onClick={() => handleOpenLinkModal(appointment)}>
                      Upload Link
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}

      {/* Tailwind Modal for adding Google Meet link */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Enter Google Meet Link</h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Google Meet Link"
              value={currentLink}
              onChange={(e) => setCurrentLink(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSubmitLink}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={handleCloseLinkModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DUpcoming;
