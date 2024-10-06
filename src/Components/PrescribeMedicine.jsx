import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
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
  const [prescriptionType, setPrescriptionType] = useState('');
  const [newPrescription, setNewPrescription] = useState({
    bookingId: '',
    date: '',
    medicines: [{ medicine: '', dosage: '', frequency: '', duration: '' }],
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getAllBookings`);
        setBookingData(response.data);
        console.log(response.data);
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

  const handleInfoClick = (slot) => {
    const parentBooking = slot.$__parent; // Adjusted to extract patient info from parent
    setSelectedData({
      ...slot,
      patientName: parentBooking.patientName || "N/A",
      patientEmail: parentBooking.patientEmail || "N/A",
      patientContact: parentBooking.patientContact || "N/A",
      status: slot._doc.status || "N/A",
    });
    setNewPrescription({
      bookingId: slot._doc.bookingId,
      date: '', // Set to today's date or relevant date
      medicines: [{ medicine: '', dosage: '', frequency: '', duration: '' }],
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedData(null);
    setPrescriptionType('');
    setNewPrescription({
      bookingId: '',
      date: '',
      medicines: [{ medicine: '', dosage: '', frequency: '', duration: '' }],
    });
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

  const handlePrescriptionTypeChange = (event) => {
    setPrescriptionType(event.target.value);
  };

  const handleNewMedicineChange = (index, field, value) => {
    const updatedMedicines = [...newPrescription.medicines];
    updatedMedicines[index][field] = value;
    setNewPrescription({ ...newPrescription, medicines: updatedMedicines });
  };

  const handleAddMedicine = () => {
    setNewPrescription({
      ...newPrescription,
      medicines: [...newPrescription.medicines, { medicine: '', dosage: '', frequency: '', duration: '' }],
    });
  };

  const handleSubmit = () => {
    console.log('Submitting new prescription:', newPrescription);
    handleCloseModal();
  };
// console.log(selectedData);
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

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((booking) =>
                booking.slots.map((slot) => (
                  <TableRow key={`${slot._doc.bookingId}-${booking.date}-${slot._doc.time}`}>
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

      {/* Prescription Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'background.paper', boxShadow: 24, borderRadius: 0, p: 4, overflowY: 'auto' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Prescribe Medicine for {selectedData?.patientName} (Booking ID: {selectedData?._doc?.bookingId})</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box mb={2}>
            <Typography variant="h6">Patient Information</Typography>
            <Typography><strong>Name:</strong> {selectedData?.patientName || "N/A"}</Typography>
            <Typography><strong>Email:</strong> {selectedData?.patientEmail || "N/A"}</Typography>
            <Typography><strong>Contact:</strong> {selectedData?.patientContact || "N/A"}</Typography>
            <Typography><strong>Booking Status:</strong> {selectedData?.status || "N/A"}</Typography>
            <Typography><strong>Booking ID:</strong> {selectedData?._doc?.bookingId || "N/A"}</Typography>
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel id="prescription-type-label">Prescription Type</InputLabel>
            <Select
              labelId="prescription-type-label"
              value={prescriptionType}
              onChange={handlePrescriptionTypeChange}
            >
              <MenuItem value="old">Old Prescription</MenuItem>
              <MenuItem value="new">Prescribe Now</MenuItem>
            </Select>
          </FormControl>

          {prescriptionType === 'old' && selectedData?.appointments?.length > 0 ? (
            selectedData.appointments.map((appointment, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{appointment.date} - {appointment.appointmentNumber}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Medicine</TableCell>
                          <TableCell>Dosage</TableCell>
                          <TableCell>Frequency</TableCell>
                          <TableCell>Duration</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointment.medicines.map((med, medIndex) => (
                          <TableRow key={medIndex}>
                            <TableCell>{med.medicine}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                            <TableCell>{med.duration}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))
          ) : null}

          {prescriptionType === 'new' && (
            <>
              {newPrescription.medicines.map((med, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <TextField
                    label="Medicine"
                    variant="outlined"
                    value={med.medicine}
                    onChange={(e) => handleNewMedicineChange(index, 'medicine', e.target.value)}
                    sx={{ flex: 1, marginRight: 1 }}
                  />
                  <TextField
                    label="Dosage"
                    variant="outlined"
                    value={med.dosage}
                    onChange={(e) => handleNewMedicineChange(index, 'dosage', e.target.value)}
                    sx={{ flex: 1, marginRight: 1 }}
                  />
                  <TextField
                    label="Frequency"
                    variant="outlined"
                    value={med.frequency}
                    onChange={(e) => handleNewMedicineChange(index, 'frequency', e.target.value)}
                    sx={{ flex: 1, marginRight: 1 }}
                  />
                  <TextField
                    label="Duration"
                    variant="outlined"
                    value={med.duration}
                    onChange={(e) => handleNewMedicineChange(index, 'duration', e.target.value)}
                    sx={{ flex: 1, marginRight: 1 }}
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMedicine}
                startIcon={<AddIcon />}
              >
                Add Medicine
              </Button>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Submit Prescription
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PrescribeMedicine;
