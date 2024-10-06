import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 0,
  p: 4,
  overflowY: 'auto',
};

const PrescribeModal = ({ open, onClose, data }) => {
  const [prescriptionType, setPrescriptionType] = useState('');
  const [newPrescription, setNewPrescription] = useState({
    bookingId: '',
    date: '',
    medicines: [{ medicine: '', dosage: '', frequency: '', duration: '' }],
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (data) {
      setNewPrescription({
        bookingId: data.bookingId || '',
        date: data.date || '',
        medicines: [{ medicine: '', dosage: '', frequency: '', duration: '' }],
      });
      setAppointments(data.appointments || []);
    }
  }, [data]);


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
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Prescribe Medicine</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mb={2}>
          <Typography variant="h6">Patient Information</Typography>
          <Typography><strong>Name:</strong> {data?.patientName}</Typography>
          <Typography><strong>Email:</strong> {data?.patientEmail}</Typography>
          <Typography><strong>Contact:</strong> {data?.patientContact}</Typography>
          <Typography><strong>Booking Status:</strong> {data?.status}</Typography>
          <Typography><strong>Booking ID:</strong> {data?.bookingId}</Typography>
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

        {prescriptionType === 'old' && (
          appointments.length > 0 ? (
            appointments.map((appointment, index) => (
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
          ) : (
            <Typography>No previous prescriptions found.</Typography>
          )
        )}

        {prescriptionType === 'new' && (
          <div>
            <Typography variant="h6" component="h3" gutterBottom>New Prescription</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Booking ID</InputLabel>
              <input
                type="text"
                value={newPrescription.bookingId}
                onChange={(e) => setNewPrescription({ ...newPrescription, bookingId: e.target.value })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Date</InputLabel>
              <input
                type="date"
                value={newPrescription.date}
                onChange={(e) => setNewPrescription({ ...newPrescription, date: e.target.value })}
              />
            </FormControl>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Medicine</TableCell>
                    <TableCell>Dosage</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>
                      <IconButton onClick={handleAddMedicine}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newPrescription.medicines.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <input
                          type="text"
                          value={med.medicine}
                          onChange={(e) => handleNewMedicineChange(index, 'medicine', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => handleNewMedicineChange(index, 'dosage', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) => handleNewMedicineChange(index, 'frequency', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          value={med.duration}
                          onChange={(e) => handleNewMedicineChange(index, 'duration', e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Send Prescription
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PrescribeModal;
