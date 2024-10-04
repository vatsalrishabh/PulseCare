import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Breadcrumbs,
  Typography,
  Button,
  Modal,
  Box,
  Paper,
  TextField,
  Grid,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';  // Import styled
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { BreadCrumb } from './BreadCrumb';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const AllPatientProfile = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Example patient data for testing
  const examplePatients = [
    // Sample data
    {
      id: 1,
      name: 'John Doe',
      mobile: '123-456-7890',
      age: 30,
      height: '175 cm',
      weight: '70 kg',
      gender: 'Male',
      address: '123 Main St, Cityville',
      email: 'john@example.com',
      allergies: {
        medications: 'Penicillin',
        food: 'Peanuts',
        environmental: 'Pollen',
      },
      surgicalHistory: {
        surgeries: 'Appendectomy (2018)',
        complications: 'None',
      },
      medicalHistory: {
        chronicConditions: 'Hypertension',
        pastIllnesses: 'None',
        hospitalizations: 'N/A',
      },
      ongoingConditions: {
        currentDiagnoses: 'Anxiety',
        duration: '2 years',
        symptoms: 'Occasional panic attacks',
      },
      currentMedications: {
        regular: 'Lisinopril 10mg',
        overTheCounter: 'Ibuprofen',
        supplements: 'Vitamin D',
      },
      familyHistory: {
        parents: 'Father - Heart disease',
        siblings: 'Sister - Diabetes',
        grandparents: 'N/A',
        geneticDisorders: 'N/A',
      },
      lifestyle: {
        smokingStatus: 'Non-smoker',
        alcoholConsumption: 'Socially',
        exerciseHabits: 'Gym 3 times a week',
        diet: 'Balanced diet',
      },
      mentalHealth: {
        conditions: 'None',
        therapies: 'Counseling',
        medication: 'None',
      },
      immunization: {
        vaccines: 'Flu, COVID-19',
        lastTetanusBooster: '2022-03-01',
      },
      screenings: {
        lastPhysicalExam: '2023-01-10',
        lastBloodWork: '2022-12-01',
        cancerScreenings: 'Mammogram (2021)',
      },
      additionalInfo: 'None',
    },
  ];

  useEffect(() => {
    // Simulate fetching data
    const fetchPatients = async () => {
      setPatients(examplePatients);
      setLoading(false);
    };

    fetchPatients();
  }, []);

  const handleOpen = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mobile.includes(searchTerm)
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mobile', headerName: 'Mobile', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    {
      field: 'checkHistory',
      headerName: 'Check History',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleOpen(params.row)}>
          Check History
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 h-[70vh]">
      <BreadCrumb first="Doctor Dashboard" second="Patient Profile" firstLink="/doctorlogin" secondLink="/allpatientprofile" />

      <h1 className="text-2xl font-bold my-4">Patient Profiles</h1>

      <TextField
        label="Search Patients by Name, Email, or Mobile"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredPatients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" gutterBottom>
            Patient Medical History Summary
          </Typography>
          {selectedPatient && (
            <>
              <Accordion>
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                  <Typography>Personal Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Name: {selectedPatient.name}</Typography>
                  <Typography>Date of Birth: [DOB]</Typography>
                  <Typography>Height: {selectedPatient.height}</Typography>
                  <Typography>Weight: {selectedPatient.weight}</Typography>
                  <Typography>Gender: {selectedPatient.gender}</Typography>
                  <Typography>Contact Information: {selectedPatient.mobile}, {selectedPatient.email}, {selectedPatient.address}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel2-content" id="panel2-header">
                  <Typography>Allergies</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Medications: {selectedPatient.allergies?.medications || 'None'}</Typography>
                  <Typography>Food: {selectedPatient.allergies?.food || 'None'}</Typography>
                  <Typography>Environmental: {selectedPatient.allergies?.environmental || 'None'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel3-content" id="panel3-header">
                  <Typography>Previous Surgical History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Surgeries: {selectedPatient.surgicalHistory?.surgeries || 'None'}</Typography>
                  <Typography>Complications: {selectedPatient.surgicalHistory?.complications || 'None'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel4-content" id="panel4-header">
                  <Typography>Past Medical History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Chronic Conditions: {selectedPatient.medicalHistory?.chronicConditions || 'None'}</Typography>
                  <Typography>Past Illnesses: {selectedPatient.medicalHistory?.pastIllnesses || 'None'}</Typography>
                  <Typography>Hospitalizations: {selectedPatient.medicalHistory?.hospitalizations || 'None'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel5-content" id="panel5-header">
                  <Typography>Ongoing Medical Conditions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Current Diagnoses: {selectedPatient.ongoingConditions?.currentDiagnoses || 'None'}</Typography>
                  <Typography>Duration: {selectedPatient.ongoingConditions?.duration || 'N/A'}</Typography>
                  <Typography>Symptoms: {selectedPatient.ongoingConditions?.symptoms || 'None'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel6-content" id="panel6-header">
                  <Typography>Current Medications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Regular Medications: {selectedPatient.currentMedications?.regular || 'None'}</Typography>
                  <Typography>Over-the-Counter Medications: {selectedPatient.currentMedications?.overTheCounter || 'None'}</Typography>
                  <Typography>Supplements: {selectedPatient.currentMedications?.supplements || 'None'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel7-content" id="panel7-header">
                  <Typography>Family Medical History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Parents: {selectedPatient.familyHistory?.parents || 'None'}</Typography>
                  <Typography>Siblings: {selectedPatient.familyHistory?.siblings || 'None'}</Typography>
                  <Typography>Grandparents: {selectedPatient.familyHistory?.grandparents || 'None'}</Typography>
                  <Typography>Genetic Disorders: {selectedPatient.familyHistory?.geneticDisorders || 'None'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel8-content" id="panel8-header">
                  <Typography>Lifestyle Factors</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Smoking Status: {selectedPatient.lifestyle?.smokingStatus || 'N/A'}</Typography>
                  <Typography>Alcohol Consumption: {selectedPatient.lifestyle?.alcoholConsumption || 'N/A'}</Typography>
                  <Typography>Exercise Habits: {selectedPatient.lifestyle?.exerciseHabits || 'N/A'}</Typography>
                  <Typography>Diet: {selectedPatient.lifestyle?.diet || 'N/A'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel9-content" id="panel9-header">
                  <Typography>Mental Health History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Mental Health Conditions: {selectedPatient.mentalHealth?.conditions || 'None'}</Typography>
                  <Typography>Therapies: {selectedPatient.mentalHealth?.therapies || 'None'}</Typography>
                  <Typography>Medication for Mental Health: {selectedPatient.mentalHealth?.medication || 'None'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel10-content" id="panel10-header">
                  <Typography>Immunization History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Vaccines Received: {selectedPatient.immunization?.vaccines || 'None'}</Typography>
                  <Typography>Last Tetanus Booster: {selectedPatient.immunization?.lastTetanusBooster || 'N/A'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary aria-controls="panel11-content" id="panel11-header">
                  <Typography>Preventive Health Screenings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Last Physical Exam: {selectedPatient.screenings?.lastPhysicalExam || 'N/A'}</Typography>
                  <Typography>Last Blood Work: {selectedPatient.screenings?.lastBloodWork || 'N/A'}</Typography>
                  <Typography>Cancer Screenings: {selectedPatient.screenings?.cancerScreenings || 'N/A'}</Typography>
                </AccordionDetails>
              </Accordion>

              <Grid item xs={12}>
                <Typography variant="h6">Other Relevant Information</Typography>
                <Typography>{selectedPatient.additionalInfo || 'None'}</Typography>
              </Grid>
            </>
          )}
          <Button onClick={handleClose} color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AllPatientProfile;
