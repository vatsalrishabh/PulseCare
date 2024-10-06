import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { BaseUrl } from '../BaseUrl';
import { BreadCrumb } from './BreadCrumb';

const DEditPProfile = () => {
  const navigate = useNavigate();
  const { patientEmail } = useParams(); // Extract email from URL

  const [email, setEmail] = useState(patientEmail || ''); // Set email from URL
  const [ongoingConditions, setOngoingConditions] = useState([{ currentDiagnoses: '', duration: '', symptoms: '' }]);
  const [currentMedications, setCurrentMedications] = useState({ regular: '', overTheCounter: '', supplements: '' });
  const [medicalHistory, setMedicalHistory] = useState({ chronicConditions: '', pastIllnesses: '', hospitalizations: '' });
  const [surgicalHistory, setSurgicalHistory] = useState({ surgeries: '', complications: '' });
  const [allergies, setAllergies] = useState({ medications: '', food: '', environmental: '' });
  const [immunization, setImmunization] = useState({ vaccines: '', lastTetanusBooster: '' });
  const [lifestyle, setLifestyle] = useState({ smokingStatus: '', alcoholConsumption: '', exerciseHabits: '', diet: '' });
  const [familyHistory, setFamilyHistory] = useState({ parents: '', siblings: '', grandparents: '', geneticDisorders: '' });

  // Load patient data based on email from URL
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/getPatientHistory/${patientEmail}`);
        const patientData = response.data;

        // Set state with fetched data
        setOngoingConditions(patientData.ongoingConditions || []);
        setCurrentMedications(patientData.currentMedications || {});
        setMedicalHistory(patientData.medicalHistory || {});
        setSurgicalHistory(patientData.surgicalHistory || {});
        setAllergies(patientData.allergies || {});
        setImmunization(patientData.immunization || {});
        setLifestyle(patientData.lifestyle || {});
        setFamilyHistory(patientData.familyHistory || {});
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    if (patientEmail) {
      fetchPatientData(); // Fetch patient data when component mounts
    }
  }, [patientEmail]);

  const addConditionRow = () => {
    setOngoingConditions([...ongoingConditions, { currentDiagnoses: '', duration: '', symptoms: '' }]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('ongoingConditions')) {
      const index = parseInt(name.split('.')[1]);
      const field = name.split('.')[2];
      const updatedConditions = [...ongoingConditions];
      updatedConditions[index][field] = value;
      setOngoingConditions(updatedConditions);
    } else {
      const [fieldName, subField] = name.split('.');
      if (subField) {
        switch (fieldName) {
          case 'currentMedications':
            setCurrentMedications((prev) => ({ ...prev, [subField]: value }));
            break;
          case 'medicalHistory':
            setMedicalHistory((prev) => ({ ...prev, [subField]: value }));
            break;
          case 'surgicalHistory':
            setSurgicalHistory((prev) => ({ ...prev, [subField]: value }));
            break;
          case 'allergies':
            setAllergies((prev) => ({ ...prev, [subField]: value }));
            break;
          case 'immunization':
            setImmunization((prev) => ({ ...prev, [subField]: value }));
            break;
          case 'lifestyle':
            setLifestyle((prev) => ({ ...prev, [subField]: value }));
            break;
          case 'familyHistory':
            setFamilyHistory((prev) => ({ ...prev, [subField]: value }));
            break;
          default:
            break;
        }
      } else {
        setEmail(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      email,
      ongoingConditions,
      currentMedications,
      medicalHistory,
      surgicalHistory,
      allergies,
      immunization,
      lifestyle,
      familyHistory,
    };

    try {
      const response = await axios.post(`${BaseUrl}/api/patients/postHistory`, patientData);
      console.log('Patient history updated successfully:', response.data);

      setTimeout(() => {
        navigate(`/Dpatientprofile/${patientEmail}`);
      }, 2000);
    } catch (error) {
      console.error('Error updating patient history:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <BreadCrumb first="Doctor Dashboard" second="Patient Profile" firstLink="/doctorlogin" secondLink="/allpatientprofile" />
      <Typography variant="h4" gutterBottom>Edit Patient History</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          disabled // Disable input to prevent manual changes
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <Typography variant="h6" gutterBottom>Ongoing Conditions</Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Current Diagnoses</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Symptoms</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ongoingConditions.map((condition, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Input
                      name={`ongoingConditions.${index}.currentDiagnoses`}
                      value={condition.currentDiagnoses}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Input
                      name={`ongoingConditions.${index}.duration`}
                      value={condition.duration}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Input
                      name={`ongoingConditions.${index}.symptoms`}
                      value={condition.symptoms}
                      onChange={handleInputChange}
                      placeholder="Comma-separated symptoms"
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={addConditionRow}>
        Add More Condition
      </Button>

      <Typography variant="h6" gutterBottom>Current Medications</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="regular">Regular</InputLabel>
        <Input 
          id="regular" 
          name="currentMedications.regular" 
          value={currentMedications.regular} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="overTheCounter">Over The Counter</InputLabel>
        <Input 
          id="overTheCounter" 
          name="currentMedications.overTheCounter" 
          value={currentMedications.overTheCounter} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="supplements">Supplements</InputLabel>
        <Input 
          id="supplements" 
          name="currentMedications.supplements" 
          value={currentMedications.supplements} 
          onChange={handleInputChange} 
        />
      </FormControl>

      <Typography variant="h6" gutterBottom>Medical History</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="chronicConditions">Chronic Conditions</InputLabel>
        <Input 
          id="chronicConditions" 
          name="medicalHistory.chronicConditions" 
          value={medicalHistory.chronicConditions} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="pastIllnesses">Past Illnesses</InputLabel>
        <Input 
          id="pastIllnesses" 
          name="medicalHistory.pastIllnesses" 
          value={medicalHistory.pastIllnesses} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="hospitalizations">Hospitalizations</InputLabel>
        <Input 
          id="hospitalizations" 
          name="medicalHistory.hospitalizations" 
          value={medicalHistory.hospitalizations} 
          onChange={handleInputChange} 
        />
      </FormControl>

      <Typography variant="h6" gutterBottom>Surgical History</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="surgeries">Surgeries</InputLabel>
        <Input 
          id="surgeries" 
          name="surgicalHistory.surgeries" 
          value={surgicalHistory.surgeries} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="complications">Complications</InputLabel>
        <Input 
          id="complications" 
          name="surgicalHistory.complications" 
          value={surgicalHistory.complications} 
          onChange={handleInputChange} 
        />
      </FormControl>

      <Typography variant="h6" gutterBottom>Allergies</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="medications">Medications</InputLabel>
        <Input 
          id="medications" 
          name="allergies.medications" 
          value={allergies.medications} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="food">Food</InputLabel>
        <Input 
          id="food" 
          name="allergies.food" 
          value={allergies.food} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="environmental">Environmental</InputLabel>
        <Input 
          id="environmental" 
          name="allergies.environmental" 
          value={allergies.environmental} 
          onChange={handleInputChange} 
        />
      </FormControl>

      <Typography variant="h6" gutterBottom>Immunization</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="vaccines">Vaccines</InputLabel>
        <Input 
          id="vaccines" 
          name="immunization.vaccines" 
          value={immunization.vaccines} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="lastTetanusBooster">Last Tetanus Booster</InputLabel>
        <Input 
          id="lastTetanusBooster" 
          name="immunization.lastTetanusBooster" 
          value={immunization.lastTetanusBooster} 
          onChange={handleInputChange} 
        />
      </FormControl>

      <Typography variant="h6" gutterBottom>Lifestyle</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="smokingStatus">Smoking Status</InputLabel>
        <Input 
          id="smokingStatus" 
          name="lifestyle.smokingStatus" 
          value={lifestyle.smokingStatus} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="alcoholConsumption">Alcohol Consumption</InputLabel>
        <Input 
          id="alcoholConsumption" 
          name="lifestyle.alcoholConsumption" 
          value={lifestyle.alcoholConsumption} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="exerciseHabits">Exercise Habits</InputLabel>
        <Input 
          id="exerciseHabits" 
          name="lifestyle.exerciseHabits" 
          value={lifestyle.exerciseHabits} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="diet">Diet</InputLabel>
        <Input 
          id="diet" 
          name="lifestyle.diet" 
          value={lifestyle.diet} 
          onChange={handleInputChange} 
        />
      </FormControl>

      <Typography variant="h6" gutterBottom>Family History</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="parents">Parents</InputLabel>
        <Input 
          id="parents" 
          name="familyHistory.parents" 
          value={familyHistory.parents} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="siblings">Siblings</InputLabel>
        <Input 
          id="siblings" 
          name="familyHistory.siblings" 
          value={familyHistory.siblings} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="grandparents">Grandparents</InputLabel>
        <Input 
          id="grandparents" 
          name="familyHistory.grandparents" 
          value={familyHistory.grandparents} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="geneticDisorders">Genetic Disorders</InputLabel>
        <Input 
          id="geneticDisorders" 
          name="familyHistory.geneticDisorders" 
          value={familyHistory.geneticDisorders} 
          onChange={handleInputChange} 
        />
      </FormControl>

      <Button variant="contained" type="submit" color="primary" style={{ marginTop: '20px' }}>
        Submit
      </Button>
    </form>
  );
};

export default DEditPProfile;
