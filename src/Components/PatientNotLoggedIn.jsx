import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Warning } from '@mui/icons-material';

const PatientNotLoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/patientlogin');
        }, 2000); // Redirect after 2 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-custom-graybg transition duration-500 ease-in-out">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-700 ease-in-out scale-100 hover:scale-105">
                <Warning className="text-custom-maroon0 text-6xl mb-4 animate-bounce" />
                <h1 className="text-2xl font-bold mb-4 text-custom-maroon">Access Denied!</h1>
                <p className="text-custom-gray0 mb-4">You are not logged in. Redirecting to login page...</p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/patientlogin')}
                    style={{ backgroundColor: '#71a113' }} // Custom green color
                    className="transition-transform duration-300 hover:scale-105"
                >
                    Go to Login Now
                </Button>
            </div>
            <div className="mt-4">
                <div className="animate-pulse">
                    <span className="block text-lg text-custom-maroon2">Stay with us for a moment...</span>
                    <span className="block text-lg text-custom-maroon2">We’ll take you to safety!</span>
                </div>
            </div>
        </div>
    );
};

export default PatientNotLoggedIn;
