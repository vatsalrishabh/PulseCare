import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { FaFlask } from 'react-icons/fa';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const TestsRecommended = (props) => {
  const [testsRecommended, setTestsRecommended] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});


  useEffect(()=>{
    console.log(props.patientId+"test recom");
   console.log(props.bookingId+"test recom");
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setLoggedInUser(userDetails);
      }
    };
    loadUserDetails();
  },[])
  // Fetch recommended tests from API
  const fetchRecommendedTests = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/patients/viewRecommendedTest`, {
        params: {
          patientId: props.patientId,
          bookingId: props.bookingId,
        },
      });
      console.log('API Response:', response.data); // Log API response for debugging
      setTestsRecommended(response.data);
    } catch (error) {
      console.error('Error fetching recommended tests:', error);
    }
  };

  useEffect(() => {
    fetchRecommendedTests();
  }, []); // Empty dependency array to run only once on mount

  return (
    <Card className="mb-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="flex items-center">
          <FaFlask className="mr-2 text-orange-600" />
          Tests Recommended by Doctor
        </Typography>
        {testsRecommended.map(testGroup => (
          <div key={testGroup.date} className="mb-4">
            <Typography variant="subtitle1" className="font-bold">{testGroup.date}</Typography>
            <List>
              {testGroup.tests.map(test => (
                <ListItem key={test.id} className="flex justify-between items-center">
                  <ListItemText primary={test.name} />
                  <Button variant="outlined" color="primary" className="ml-2">Schedule Test</Button>
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
