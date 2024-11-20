import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Tooltip, Modal, TextField, Box } from "@mui/material";
import { FaCopy, FaLink, FaRegCalendarAlt, FaUserMd } from "react-icons/fa";
import { BreadCrumb } from "./BreadCrumb";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import SnackBarAlert from "../SnackBarAlert";
import { useNavigate } from "react-router-dom";

const DUpcoming = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loggedInDoctor, setLoggedInDoctor] = useState({});
  const [currentLink, setCurrentLink] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [patientHistory, setPatientHistory] = useState("");
  const [alert, setAlert] = useState({ message: "", status: "99" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const loadDoctorDetails = () => {
      const storedDoctorDetails = localStorage.getItem("doctorDetails");
      if (storedDoctorDetails) {
        const doctorDetails = JSON.parse(storedDoctorDetails);
        setLoggedInDoctor(doctorDetails);
      }
    };
    loadDoctorDetails();
  }, []);

  const fetchAppointments = async (patientId) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/doctors/getAllBookings`, { patientId });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAlert({ message: "Not found", status: "404" });
      setSnackbarOpen(true);
    }
  };

  const onClickSearch = () => {
    if (patientHistory) {
      fetchAppointments(patientHistory);
    } else {
      fetchAppointments(null);
    }
  };

  useEffect(() => {
    if (loggedInDoctor.email) {
      fetchAppointments(null);
    }
  }, [loggedInDoctor]);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setAlert({ message: "Link copied to clipboard!", status: "200" });
    setSnackbarOpen(true);
  };

  const getStatusColor = (status) => (status === "pending" ? "yellow" : "green");

  const parseBookingIdDate = (bookingId) => {
    const year = `20${bookingId.slice(0, 2)}`;
    const monthMap = {
      JAN: "January",
      FEB: "February",
      MAR: "March",
      APR: "April",
      MAY: "May",
      JUN: "June",
      JUL: "July",
      AUG: "August",
      SEP: "September",
      OCT: "October",
      NOV: "November",
      DEC: "December",
    };
    const month = monthMap[bookingId.slice(2, 5)] || "Invalid Month";
    const day = bookingId.slice(5, 7);
    return `${month} ${day}, ${year}`;
  };

  const handleOpenLinkModal = (appointment) => {
    setSelectedAppointment(appointment);
    setCurrentLink("");
    setIsLinkModalOpen(true);
  };

  const handleCloseLinkModal = () => {
    setIsLinkModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSubmitLink = async () => {
    const bookingId = selectedAppointment?.bookingId;
    const patientId = selectedAppointment?.patientId;
    const patientDetails = selectedAppointment?.paymentInfo?.notes || {}; // Get the patient details from the selected appointment
  
    if (currentLink && bookingId && patientId) {
      try {
        const response = await axios.post(`${BaseUrl}/api/doctors/postGoogleMeet`, {
          bookingId,
          googlemeetlink: currentLink,
          patientId,            // Include patientId in the request
          patientName: patientDetails.name || "N/A",  // Include patient details
          patientEmail: patientDetails.email || "N/A",
          patientContact: patientDetails.contact || "N/A",
        });
  
        if (response.status === 200) {
          // Update the appointments with the Google Meet link
          const updatedAppointments = appointments.map((appointment) =>
            appointment.bookingId === bookingId ? { ...appointment, googleMeet: currentLink } : appointment
          );
          setAppointments(updatedAppointments);
          handleCloseLinkModal();
          setAlert({ message: "Google Meet link updated!", status: "200" });
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error uploading Google Meet link:", error);
        setAlert({ message: "Failed to upload link", status: "500" });
        setSnackbarOpen(true);
      }
    }
  };
  

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Typography variant="h4" className="font-semibold text-gray-800 mb-6">
        Upcoming Appointments
      </Typography>
      <BreadCrumb
        first="Doctor Dashboard"
        second="Appointments"
        firstLink="/doctorlogin"
        secondLink="/Dappointments"
      />
      <div className="w-full max-w-sm min-w-[200px] py-2 flex">
        <input
          value={patientHistory}
          onChange={(e) => setPatientHistory(e.target.value)}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search by PatientId..."
        />
        <div className="px-2">
          <button
            onClick={onClickSearch}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Search
          </button>
        </div>
      </div>
      {appointments.length === 0 ? (
        <Typography className="text-gray-600">No upcoming appointments.</Typography>
      ) : (
        appointments.map((appointment) => {
          const { patientId, bookingId, paymentInfo, status, slotTime } = appointment;

          const patientName = paymentInfo.notes?.name || "N/A";
          const patientEmail = paymentInfo.notes?.email || "N/A";
          const patientContact = paymentInfo.notes?.contact || "N/A";
          const doctor = paymentInfo.notes?.doctor || "Doctor Not Assigned";
          const googleMeet = paymentInfo.googleMeet || "Na";

          const date = parseBookingIdDate(bookingId);
          const isCanceled = status !== "booked";

          return (
            <Card
              key={bookingId}
              className={`mb-4 shadow-lg transition-transform transform hover:scale-105 ${isCanceled ? "filter grayscale" : ""}`}
            >
              <CardContent>
                <Typography variant="h6" className="flex items-center">
                  <FaUserMd className="mr-2 text-blue-600" />
                  {doctor}
                </Typography>
                <Typography className="text-gray-600">
                  <FaRegCalendarAlt className="inline mr-1" />
                  Date: {date} <br />
                  Time: {slotTime || "N/A"}
                </Typography>
                <Typography className="text-gray-600">Booking ID: {bookingId}</Typography>
                <Typography className="text-gray-600">Patient ID: {patientId}</Typography>
                <Typography className="text-gray-600">Patient Name: {patientName}</Typography>
                <Typography className="text-gray-600">Patient Email: {patientEmail}</Typography>
                <Typography className="text-gray-600">Contact: {patientContact}</Typography>
                <Typography
                  className="text-gray-600"
                  style={{ color: getStatusColor(status) }}
                >
                  Status: {isCanceled ? "Canceled by Doctor" : status}
                </Typography>
                <Typography className="text-gray-600">
                  <FaLink className="inline mr-1" />
                  {googleMeet && googleMeet !== "Na" ? (
                    <>
                      Google Meet Link: {googleMeet}
                      <Tooltip title="Copy Link" arrow>
                        <Button
                          className="ml-2 text-blue-500"
                          onClick={() => handleCopyLink(googleMeet)}
                        >
                          <FaCopy />
                        </Button>
                      </Tooltip>
                    </>
                  ) : (
                    <span>No Google Meet Link Available</span>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenLinkModal(appointment)}
                    className="ml-2"
                  >
                    Upload Google Meet Link
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`../pres/${bookingId}`)}
                  >
                    Check History
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          );
        })
      )}
  <Modal open={isLinkModalOpen} onClose={handleCloseLinkModal}>
  <Box 
    className="modal-box"
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      bgcolor: 'rgba(255, 255, 255, 0.9)', // semi-transparent white background
      boxShadow: 24,
      borderRadius: '8px',
      p: 4,
      backdropFilter: 'blur(5px)', // Optional: adds a blur effect to the background
    }}
  >
    <Typography variant="h6" className="mb-4">Upload Google Meet Link</Typography>
    <TextField
      label="Google Meet Link"
      variant="outlined"
      fullWidth
      value={currentLink}
      onChange={(e) => setCurrentLink(e.target.value)}
      className="mb-4"
    />
    <Button variant="contained" color="primary" onClick={handleSubmitLink}>
      Submit
    </Button>
  </Box>
</Modal>

      <SnackBarAlert
        message={alert.message}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={alert.status === "200" ? "success" : "error"}
      />
    </div>
  );
};

export default DUpcoming;
