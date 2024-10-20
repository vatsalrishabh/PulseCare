import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { CalendarToday, History, LocalHospital } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';

const DoctorDashboard = () => {
  useEffect
  return (
    <>      <BreadCrumb first="Doctor Dashboard" second="" firstLink="" secondLink="" />
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-graybg p-6">

<h1 className="text-3xl font-bold text-custom-maroon mb-6">Doctor Dashboard</h1>

<Grid container spacing={3}>

{/* Additional Section (e.g., Health Tips) */}
<Grid item xs={12} md={6}>
    <Card className="bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <CardContent>
        <Typography variant="h5" component="div" className="flex items-center">
          <span className="material-icons mr-2 text-custom-maroon0">old medecines</span>
        Patient Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Get the latest health tips and advice from our experts.
        </Typography>
        <Link to="/allpatientprofile" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" className="mt-4" style={{ backgroundColor: '#71a113' }}>
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  </Grid>

  {/* Upcoming Appointments Section */}
  <Grid item xs={12} md={6}>
    <Card className="bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <CardContent>
        <Typography variant="h5" component="div" className="flex items-center">
          <CalendarToday className="mr-2 text-custom-maroon0" />
          Upcoming Appointments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You have 2 upcoming appointments scheduled.
        </Typography>
        <Link to="/Dappointments" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" className="mt-4" style={{ backgroundColor: '#71a113' }}>
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  </Grid>

  {/* Book an Appointment Section */}
  <Grid item xs={12} md={6}>
    <Card className="bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <CardContent>
        <Typography variant="h5" component="div" className="flex items-center">
          <LocalHospital className="mr-2 text-custom-maroon0" />
          Manage Appointments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Schedule your next visit with us.
        </Typography>
        <Link to="/manageAppoint" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" className="mt-4" style={{ backgroundColor: '#71a113' }}>
            Book Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  </Grid>

  {/* Patient History Section */}
  <Grid item xs={12} md={6}>
    <Card className="bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <CardContent>
        <Typography variant="h5" component="div" className="flex items-center">
          <History className="mr-2 text-custom-maroon0" />
         Treatment/Prescriptions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review your past appointments and treatments.
        </Typography>
        <Link to="/prescriptions" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" className="mt-4" style={{ backgroundColor: '#71a113' }}>
            View History
          </Button>
        </Link>
      </CardContent>
    </Card>
  </Grid>


  
</Grid>
</div>
    
    </>

   
  );
};

export default DoctorDashboard;
