import React from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { FaFlask } from 'react-icons/fa';

const testsRecommended = [
  { date: '2024-10-01', tests: [
    { id: 1, name: 'Blood Sugar Test' },
    { id: 2, name: 'Lipid Profile' },
  ]},
  { date: '2024-09-15', tests: [
    { id: 3, name: 'Complete Blood Count' },
  ]}
];

const TestsRecommended = () => {
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
