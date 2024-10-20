import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
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
} from "@mui/material";
import { BaseUrl } from "./BaseUrl";
import { BreadCrumb } from "./DoctorDashboard/BreadCrumb";

const EditPatientProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ongoingConditions, setOngoingConditions] = useState([
    { currentDiagnoses: "", duration: "", symptoms: "" },
  ]);
  const [currentMedications, setCurrentMedications] = useState({
    regular: "",
    overTheCounter: "",
    supplements: "",
  });
  const [medicalHistory, setMedicalHistory] = useState({
    chronicConditions: "",
    pastIllnesses: "",
    hospitalizations: "",
  });
  const [surgicalHistory, setSurgicalHistory] = useState({
    surgeries: "",
    complications: "",
  });
  const [allergies, setAllergies] = useState({
    medications: "",
    food: "",
    environmental: "",
  });
  const [immunization, setImmunization] = useState({
    vaccines: "",
    lastTetanusBooster: "",
  });
  const [lifestyle, setLifestyle] = useState({
    smokingStatus: "",
    alcoholConsumption: "",
    exerciseHabits: "",
    diet: "",
  });
  const [familyHistory, setFamilyHistory] = useState({
    parents: "",
    siblings: "",
    grandparents: "",
    geneticDisorders: "",
  });

  // Load user details from local storage
  useEffect(() => {
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem("userDetails");
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setEmail(userDetails.email || "");
      }
    };
    loadUserDetails();
  }, []);

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (email) {
        try {
          const response = await axios.get(
            `${BaseUrl}/api/patients/getPatientHistory/${email}`
          );
          const patientData = response.data;

          // Set state with fetched data
          setOngoingConditions(
            patientData.ongoingConditions || [
              { currentDiagnoses: "", duration: "", symptoms: "" },
            ]
          );
          setCurrentMedications(
            patientData.currentMedications || {
              regular: "",
              overTheCounter: "",
              supplements: "",
            }
          );
          setMedicalHistory(
            patientData.medicalHistory || {
              chronicConditions: "",
              pastIllnesses: "",
              hospitalizations: "",
            }
          );
          setSurgicalHistory(
            patientData.surgicalHistory || { surgeries: "", complications: "" }
          );
          setAllergies(
            patientData.allergies || {
              medications: "",
              food: "",
              environmental: "",
            }
          );
          setImmunization(
            patientData.immunization || { vaccines: "", lastTetanusBooster: "" }
          );
          setLifestyle(
            patientData.lifestyle || {
              smokingStatus: "",
              alcoholConsumption: "",
              exerciseHabits: "",
              diet: "",
            }
          );
          setFamilyHistory(
            patientData.familyHistory || {
              parents: "",
              siblings: "",
              grandparents: "",
              geneticDisorders: "",
            }
          );
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      }
    };
    fetchPatientData();
  }, [email]);

  const addConditionRow = () => {
    setOngoingConditions([
      ...ongoingConditions,
      { currentDiagnoses: "", duration: "", symptoms: "" },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("ongoingConditions")) {
      const index = parseInt(name.split(".")[1]);
      const field = name.split(".")[2];
      const updatedConditions = [...ongoingConditions];
      updatedConditions[index][field] = value;
      setOngoingConditions(updatedConditions);
    } else {
      const [fieldName, subField] = name.split(".");
      if (subField) {
        switch (fieldName) {
          case "currentMedications":
            setCurrentMedications((prev) => ({ ...prev, [subField]: value }));
            break;
          case "medicalHistory":
            setMedicalHistory((prev) => ({ ...prev, [subField]: value }));
            break;
          case "surgicalHistory":
            setSurgicalHistory((prev) => ({ ...prev, [subField]: value }));
            break;
          case "allergies":
            setAllergies((prev) => ({ ...prev, [subField]: value }));
            break;
          case "immunization":
            setImmunization((prev) => ({ ...prev, [subField]: value }));
            break;
          case "lifestyle":
            setLifestyle((prev) => ({ ...prev, [subField]: value }));
            break;
          case "familyHistory":
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
      const response = await axios.post(
        `${BaseUrl}/api/patients/postHistory`,
        patientData
      );
      console.log("Patient history updated successfully:", response.data);

      setTimeout(() => {
        navigate("/patientprofile");
      }, 2000);
    } catch (error) {
      console.error(
        "Error updating patient history:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <BreadCrumb
        first="Patient Dashboard"
        second="Patient Profile"
        firstLink="/pdash"
        secondLink="/patientprofile"
      />
      <Typography variant="h4" gutterBottom>
        Edit Patient History
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly // Make the input read-only
          disabled // Make the input disabled
          sx={{
            bgcolor: "#f5f5f5", // Light gray background to indicate it's highlighted
            "& .MuiInputBase-input": {
              cursor: "not-allowed", // Change cursor to indicate it's not editable
            },
          }}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Ongoing Conditions
      </Typography>
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
                    <Select
                      name={`ongoingConditions.${index}.duration`}
                      value={condition.duration}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="1 month">1 Month</MenuItem>
                      <MenuItem value="3 months">3 Months</MenuItem>
                      <MenuItem value="6 months">6 Months</MenuItem>
                      {/* Generate an array from 1 to 80 years */}
                      {Array.from(
                        { length: 80 },
                        (_, idx) => `${idx + 1} year${idx + 1 > 1 ? "s" : ""}`
                      ).map((duration, idx) => (
                        <MenuItem key={idx} value={duration}>
                          {duration}
                        </MenuItem>
                      ))}
                    </Select>
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

      <Typography variant="h6" gutterBottom>
        Current Medications
      </Typography>
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

      <Typography variant="h6" gutterBottom>
        Medical History
      </Typography>
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

      <Typography variant="h6" gutterBottom>
        Surgical History
      </Typography>
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

      <Typography variant="h6" gutterBottom>
        Allergies
      </Typography>
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

      <Typography variant="h6" gutterBottom>
        Immunization
      </Typography>
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
        <InputLabel id="lastTetanusBooster-label">
          Last Tetanus Booster
        </InputLabel>
        <Select
          labelId="lastTetanusBooster-label"
          id="lastTetanusBooster"
          name="immunization.lastTetanusBooster"
          value={immunization.lastTetanusBooster}
          onChange={handleInputChange}
        >
          <MenuItem value="Less than 5">Less than 5</MenuItem>
          <MenuItem value="5 to 10">5 to 10</MenuItem>
          <MenuItem value="More than 10">More than 10</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Lifestyle
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="smokingStatus-label">Smoking Status</InputLabel>
        <Select
          labelId="smokingStatus-label"
          id="smokingStatus"
          name="lifestyle.smokingStatus"
          value={lifestyle.smokingStatus}
          onChange={handleInputChange}
        >
          <MenuItem value="Current">Current</MenuItem>

          <MenuItem value="Former">Former </MenuItem>

          <MenuItem value="Never">Never</MenuItem>
          <MenuItem value="Passive Exposure">Passive Exposure</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="alcoholConsumption-label">
          Alcohol Consumption
        </InputLabel>
        <Select
          labelId="alcoholConsumption-label"
          id="alcoholConsumption"
          name="lifestyle.alcoholConsumption"
          value={lifestyle.alcoholConsumption}
          onChange={handleInputChange}
        >
          <MenuItem value="Occasional">Occasional</MenuItem>
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Never">Never</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="exerciseHabits-label">Exercise Habits</InputLabel>
        <Select
          labelId="exerciseHabits-label"
          id="exerciseHabits"
          name="lifestyle.exerciseHabits"
          value={lifestyle.exerciseHabits}
          onChange={handleInputChange}
        >
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly once">Weekly once</MenuItem>
          <MenuItem value="Twice">Twice</MenuItem>
          <MenuItem value="Thrice">Thrice</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Occasional">Occasional</MenuItem>
          <MenuItem value="Never">Never</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="diet-label">Diet</InputLabel>
        <Select
          labelId="diet-label"
          id="diet"
          name="lifestyle.diet"
          value={lifestyle.diet}
          onChange={handleInputChange}
        >
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
          <MenuItem value="Vegan">Vegan</MenuItem>
          <MenuItem value="Pescatarian">Pescatarian</MenuItem>
          <MenuItem value="Keto">Keto</MenuItem>
          <MenuItem value="Paleo">Paleo</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Family History
      </Typography>
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

      <Button type="submit" variant="contained" color="primary">
        Update Patient History
      </Button>
    </form>
  );
};

export default EditPatientProfile;
