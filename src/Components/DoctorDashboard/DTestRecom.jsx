import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { FaFlask } from 'react-icons/fa';
import { BaseUrl } from '../BaseUrl';

const DTestRecom = (props) => {
  const [testsRecommended, setTestsRecommended] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTest, setNewTest] = useState({ name: '', date: '' });
  const patientId = props.patientId; // Hardcoded patient ID
  const bookingId = props.bookingId; // Hardcoded booking ID

  // Fetch recommended tests from the API
  const fetchRecommendedTests = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/patients/viewRecommendedTest`, {
        params: {
          patientId: patientId,
          bookingId: bookingId,
        },
      });

      console.log('API Response:', response.data); // Log API response for debugging

      // Ensure the response is an array
      if (Array.isArray(response.data)) {
        setTestsRecommended(response.data);
      } else {
        console.error('Invalid data format received:', response.data);
        setTestsRecommended([]); // Default to an empty array if data is invalid
      }
    } catch (error) {
      console.error('Error fetching recommended tests:', error);
      setTestsRecommended([]); // Default to an empty array on error
    }
  };

  // Handle adding a new test
  const handleAddTest = async () => {
    try {
      await axios.post(`${BaseUrl}/api/patients/recommendTest`, {
        patientId: patientId,
        bookingId: bookingId,
        test: newTest,
      });
      setNewTest({ name: '', date: '' }); // Reset new test form
      setOpenDialog(false); // Close dialog
      fetchRecommendedTests(); // Refresh recommended tests
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  // Handle deleting a test
  const handleDeleteTest = async (testId) => {
    try {
      await axios.delete(`${BaseUrl}/api/patients/deleteTest`, {
        headers: { 'Content-Type': 'application/json' },
        data: { bookingId, testId },
      });
      fetchRecommendedTests(); // Refresh recommended tests after deletion
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };
  

  // Fetch tests on component mount
  useEffect(() => {
    fetchRecommendedTests();
  }, []);

  return (
    <Card className="mb-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="flex items-center">
          <FaFlask className="mr-2 text-orange-600" />
          Tests Recommended by Doctor
        </Typography>
        {testsRecommended.length > 0 ? (
          testsRecommended.map((testGroup, index) => (
            <div key={`${testGroup._id}-${index}`} className="mb-4">
              <Typography variant="subtitle1" className="font-bold">
                {testGroup.date}
              </Typography>
              {testGroup.name ? (
                <List>
                  <ListItem key={testGroup._id} className="flex justify-between items-center">
                    <ListItemText primary={testGroup.name} />
                    <div>
                      <Button variant="outlined" color="primary" className="ml-2">
                        Edit Test
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="ml-2"
                        onClick={() => handleDeleteTest(testGroup._id)}
                      >
                        Delete Test
                      </Button>
                    </div>
                  </ListItem>
                </List>
              ) : (
                <Typography variant="body2">No tests available for this date.</Typography>
              )}
            </div>
          ))
        ) : (
          <Typography variant="subtitle1">No tests recommended.</Typography>
        )}
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Add New Test
        </Button>
      </CardContent>

      {/* Dialog for adding a new test */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Test</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Test Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newTest.name}
            onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newTest.date}
            onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTest} color="primary">
            Add Test
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DTestRecom;
