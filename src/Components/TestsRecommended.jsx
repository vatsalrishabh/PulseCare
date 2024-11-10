import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { FaFlask } from 'react-icons/fa';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const TestsRecommended = ({ patientId, bookingId }) => {
  const [testsRecommended, setTestsRecommended] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  // Load user details from local storage
  useEffect(() => {
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setLoggedInUser(userDetails);
      }
    };
    loadUserDetails();
  }, []);

  // Fetch recommended tests from API
  const fetchRecommendedTests = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/patients/viewRecommendedTest`, {
        params: {
          patientId,
          bookingId,
        },
      });
      setTestsRecommended(response.data);
    } catch (error) {
      console.error('Error fetching recommended tests:', error);
    }
  };

  useEffect(() => {
    fetchRecommendedTests();
  }, [patientId, bookingId]); // Refetch if patientId or bookingId changes

  // Group tests by date for better display
  const testsByDate = testsRecommended.reduce((acc, test) => {
    const date = test.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(test);
    return acc;
  }, {});

  return (
    <Card className="mb-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="flex items-center">
          <FaFlask className="mr-2 text-orange-600" />
          Tests Recommended by Doctor
        </Typography>
        <Typography variant="body2" className="mt-2">
          <strong>Patient ID:</strong> {patientId}
        </Typography>
        <Typography variant="body2" className="mb-4">
          <strong>Booking ID:</strong> {bookingId}
        </Typography>

        {Object.keys(testsByDate).map(date => (
          <div key={date} className="mb-4">
            <Typography variant="subtitle1" className="font-bold">
              Date: {new Date(date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Typography>
            <List>
              {testsByDate[date].map(test => (
                <ListItem key={test._id} className="flex justify-between items-center">
                  <ListItemText primary={test.name} />
                  {/* <Button variant="outlined" color="primary">
                    Schedule Test
                  </Button> */}
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TestsRecommended;
