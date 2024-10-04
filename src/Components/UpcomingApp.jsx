import React from 'react';
import { Button, Card, CardContent, Typography, Tooltip } from '@mui/material';
import { FaCopy, FaLink, FaRegCalendarAlt, FaUserMd } from 'react-icons/fa';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';

const appointments = [
  {
    id: '12345',
    date: '2024-10-15',
    time: '10:00 AM',
    doctor: 'Dr. Smith',
    googleMeetLink: 'https://meet.google.com/example1',
  },
  {
    id: '67890',
    date: '2024-10-20',
    time: '2:00 PM',
    doctor: 'Dr. Jones',
    googleMeetLink: '', // No link for this appointment
  },
  // Add more appointments as needed
];

const UpcomingApp = () => {
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const handleRequestLink = (doctor) => {
    alert(`Requesting Google Meet link from ${doctor}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Upcoming Appointments</Typography>
      <BreadCrumb first="Doctor Dashboard" second="Upcoming Appointments" firstLink="/doctorlogin" secondLink="/appointments" />
      {appointments.length === 0 ? (
        <Typography className="text-gray-600">No upcoming appointments.</Typography>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id} className="mb-4 shadow-lg transition-transform transform hover:scale-105">
            <CardContent>
              <Typography variant="h6" className="flex items-center">
                <FaUserMd className="mr-2 text-blue-600" />
                {appointment.doctor}
              </Typography>
              <Typography className="text-gray-600">
                <FaRegCalendarAlt className="inline mr-1" />
                Date: {appointment.date} <br />
                Time: {appointment.time}
              </Typography>
              <Typography className="text-gray-600">
                Booking ID: {appointment.id}
              </Typography>
              <Typography className="text-gray-600">
                <FaLink className="inline mr-1" />
                {appointment.googleMeetLink ? (
                  <>
                    Google Meet Link: {appointment.googleMeetLink.split('/')[2]} {/* Show shortened link */}
                    <Tooltip title="Copy Link" arrow>
                      <Button
                        className="ml-2 text-blue-500"
                        onClick={() => handleCopyLink(appointment.googleMeetLink)}
                        size="small"
                      >
                        <FaCopy />
                      </Button>
                    </Tooltip>
                  </>
                ) : (
                  <span>No link available.</span>
                )}
              </Typography>
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-start">
                {appointment.googleMeetLink ? (
                  <>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className="mr-2 mb-2 sm:mb-0 rounded-md px-4 py-2"
                    >
                      Open
                    </Button>
                    <Button 
                      variant="contained" 
                      color="warning" 
                      className="mr-2 mb-2 sm:mb-0 rounded-md px-4 py-2"
                    >
                      Reschedule
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      className="mb-2 sm:mb-0 rounded-md px-4 py-2"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    className="rounded-md px-4 py-2"
                    onClick={() => handleRequestLink(appointment.doctor)}
                  >
                    Request Link
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default UpcomingApp;
