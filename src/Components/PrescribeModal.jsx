import React, { useState } from 'react';
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

  const [appointments] = useState([
    {
      date: '2023-10-01',
      appointmentNumber: 'A001',
      contactNumber: '123-456-7890',
      medicines: [
        { serialNum: '1', medicine: 'Aspirin', dosage: '500mg', frequency: 'Once daily', duration: '7 days' },
        { serialNum: '2', medicine: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily', duration: '5 days' },
      ],
    },
    {
      date: '2023-09-15',
      appointmentNumber: 'A002',
      contactNumber: '987-654-3210',
      medicines: [
        { serialNum: '1', medicine: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', duration: '10 days' },
      ],
    },
  ]);

  const handlePrescriptionTypeChange = (event) => {
    setPrescriptionType(event.target.value);
  };

  const handlePrint = (appointmentNumber) => {
    console.log('Printing receipt for:', appointmentNumber);
  };

  const handleEmail = (appointmentNumber) => {
    console.log('Sending email for:', appointmentNumber);
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
          <Typography variant="h4" component="h2">
            Prescribe Medicine
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
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
          <div>
            {appointments.map((appointment, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    {appointment.date} - {appointment.appointmentNumber} - {appointment.contactNumber}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Serial No.</TableCell>
                          <TableCell>Medicine</TableCell>
                          <TableCell>Dosage</TableCell>
                          <TableCell>Frequency</TableCell>
                          <TableCell>Duration</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointment.medicines.map((med, medIndex) => (
                          <TableRow key={medIndex}>
                            <TableCell>{med.serialNum}</TableCell>
                            <TableCell>{med.medicine}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                            <TableCell>{med.duration}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<PrintIcon />}
                      onClick={() => handlePrint(appointment.appointmentNumber)}
                    >
                      Print
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EmailIcon />}
                      onClick={() => handleEmail(appointment.appointmentNumber)}
                    >
                      Send to Email
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}

        {prescriptionType === 'new' && (
          <div>
            <Typography variant="h6" component="h3" gutterBottom>
              New Prescription
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Booking ID</InputLabel>
              <input
                type="text"
                onChange={(e) => setNewPrescription({ ...newPrescription, bookingId: e.target.value })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Date</InputLabel>
              <input
                type="date"
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
