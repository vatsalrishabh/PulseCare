import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';

const PatientProfile = () => {
    const [loggedInUser, setLoggedInUser] = useState({})
  const [patientHistory, setPatientHistory] = useState({
    email:'',
    allergies: { medications: '', food: '', environmental: '' },
    surgicalHistory: { surgeries: '', complications: '' },
    medicalHistory: { chronicConditions: '', pastIllnesses: '', hospitalizations: '' },
    ongoingConditions: { currentDiagnoses: '', duration: '', symptoms: '' },
    currentMedications: { regular: '', overTheCounter: '', supplements: '' },
    familyHistory: { parents: '', siblings: '', grandparents: '', geneticDisorders: '' },
    lifestyle: { smokingStatus: '', alcoholConsumption: '', exerciseHabits: '', diet: '' },
    mentalHealth: { conditions: '', therapies: '', medication: '' },
    immunization: { vaccines: '', lastTetanusBooster: '' },
    screenings: { lastPhysicalExam: '', lastBloodWork: '', cancerScreenings: '' },
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.'); // e.g., 'allergies.medications'
    setPatientHistory((prev) => {
      const newHistory = { ...prev };
      let temp = newHistory;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value; // Set the final value
      return newHistory;
    });
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(userDetails);
      
      // Set the email from loggedInUser to patientHistory
      setPatientHistory((prev) => ({
        ...prev,
        email: userDetails.email, // Update email in patientHistory
      }));
    }
    // Call your loadUserDetails function here if needed
  }, []);

  const handleSubmit = () => {
    axios.post(`${BaseUrl}/api/patients/postHistory`, patientHistory)
      .then(response => {
        console.log('Patient history created:', response.data);
        // Optionally reset the form or display a success message
      })
      .catch(error => {
        console.error('There was an error creating the patient history!', error);
      });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
            <BreadCrumb first="Patient Dashboard" second="Patient Profile" firstLink="/pdash" secondLink="/patientprofile" />
      <Typography variant="h4" gutterBottom>
        Patient Profile
      </Typography>
      {/* Allergies Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Allergies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Medications</TableCell>
                  <TableCell>
                    <TextField
                      name="allergies.medications"
                      value={patientHistory.allergies.medications}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Food</TableCell>
                  <TableCell>
                    <TextField
                      name="allergies.food"
                      value={patientHistory.allergies.food}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Environmental</TableCell>
                  <TableCell>
                    <TextField
                      name="allergies.environmental"
                      value={patientHistory.allergies.environmental}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Surgical History Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Surgical History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Surgeries</TableCell>
                  <TableCell>
                    <TextField
                      name="surgicalHistory.surgeries"
                      value={patientHistory.surgicalHistory.surgeries}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Complications</TableCell>
                  <TableCell>
                    <TextField
                      name="surgicalHistory.complications"
                      value={patientHistory.surgicalHistory.complications}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Medical History Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Medical History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Chronic Conditions</TableCell>
                  <TableCell>
                    <TextField
                      name="medicalHistory.chronicConditions"
                      value={patientHistory.medicalHistory.chronicConditions}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Past Illnesses</TableCell>
                  <TableCell>
                    <TextField
                      name="medicalHistory.pastIllnesses"
                      value={patientHistory.medicalHistory.pastIllnesses}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hospitalizations</TableCell>
                  <TableCell>
                    <TextField
                      name="medicalHistory.hospitalizations"
                      value={patientHistory.medicalHistory.hospitalizations}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Ongoing Conditions Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Ongoing Conditions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Current Diagnoses</TableCell>
                  <TableCell>
                    <TextField
                      name="ongoingConditions.currentDiagnoses"
                      value={patientHistory.ongoingConditions.currentDiagnoses}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Duration</TableCell>
                  <TableCell>
                    <TextField
                      name="ongoingConditions.duration"
                      value={patientHistory.ongoingConditions.duration}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Symptoms</TableCell>
                  <TableCell>
                    <TextField
                      name="ongoingConditions.symptoms"
                      value={patientHistory.ongoingConditions.symptoms}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Current Medications Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Current Medications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Regular Medications</TableCell>
                  <TableCell>
                    <TextField
                      name="currentMedications.regular"
                      value={patientHistory.currentMedications.regular}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Over-the-Counter Medications</TableCell>
                  <TableCell>
                    <TextField
                      name="currentMedications.overTheCounter"
                      value={patientHistory.currentMedications.overTheCounter}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Supplements</TableCell>
                  <TableCell>
                    <TextField
                      name="currentMedications.supplements"
                      value={patientHistory.currentMedications.supplements}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Family History Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Family Medical History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Parents</TableCell>
                  <TableCell>
                    <TextField
                      name="familyHistory.parents"
                      value={patientHistory.familyHistory.parents}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Siblings</TableCell>
                  <TableCell>
                    <TextField
                      name="familyHistory.siblings"
                      value={patientHistory.familyHistory.siblings}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Grandparents</TableCell>
                  <TableCell>
                    <TextField
                      name="familyHistory.grandparents"
                      value={patientHistory.familyHistory.grandparents}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Genetic Disorders</TableCell>
                  <TableCell>
                    <TextField
                      name="familyHistory.geneticDisorders"
                      value={patientHistory.familyHistory.geneticDisorders}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Lifestyle Factors Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Lifestyle Factors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Smoking Status</TableCell>
                  <TableCell>
                    <TextField
                      name="lifestyle.smokingStatus"
                      value={patientHistory.lifestyle.smokingStatus}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Alcohol Consumption</TableCell>
                  <TableCell>
                    <TextField
                      name="lifestyle.alcoholConsumption"
                      value={patientHistory.lifestyle.alcoholConsumption}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Exercise Habits</TableCell>
                  <TableCell>
                    <TextField
                      name="lifestyle.exerciseHabits"
                      value={patientHistory.lifestyle.exerciseHabits}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Diet</TableCell>
                  <TableCell>
                    <TextField
                      name="lifestyle.diet"
                      value={patientHistory.lifestyle.diet}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Mental Health History Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Mental Health History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Mental Health Conditions</TableCell>
                  <TableCell>
                    <TextField
                      name="mentalHealth.conditions"
                      value={patientHistory.mentalHealth.conditions}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Therapies</TableCell>
                  <TableCell>
                    <TextField
                      name="mentalHealth.therapies"
                      value={patientHistory.mentalHealth.therapies}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medication for Mental Health</TableCell>
                  <TableCell>
                    <TextField
                      name="mentalHealth.medication"
                      value={patientHistory.mentalHealth.medication}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Immunization History Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Immunization History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Vaccines Received</TableCell>
                  <TableCell>
                    <TextField
                      name="immunization.vaccines"
                      value={patientHistory.immunization.vaccines}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Tetanus Booster</TableCell>
                  <TableCell>
                    <TextField
                      name="immunization.lastTetanusBooster"
                      value={patientHistory.immunization.lastTetanusBooster}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Preventive Health Screenings Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Preventive Health Screenings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Last Physical Exam</TableCell>
                  <TableCell>
                    <TextField
                      name="screenings.lastPhysicalExam"
                      value={patientHistory.screenings.lastPhysicalExam}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Blood Work</TableCell>
                  <TableCell>
                    <TextField
                      name="screenings.lastBloodWork"
                      value={patientHistory.screenings.lastBloodWork}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cancer Screenings</TableCell>
                  <TableCell>
                    <TextField
                      name="screenings.cancerScreenings"
                      value={patientHistory.screenings.cancerScreenings}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('Edit')}><EditIcon /></Button>
                    <Button onClick={() => console.log('Delete')}><DeleteIcon /></Button>
                    <Button onClick={handleSubmit}><CheckIcon /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Additional Information Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Other Relevant Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            name="additionalInfo"
            value={patientHistory.additionalInfo}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Enter additional information here..."
          />
        </AccordionDetails>
      </Accordion>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Patient History
      </Button>
    </Paper>
  );
};

export default PatientProfile;
