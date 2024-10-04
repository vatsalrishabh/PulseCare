import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import 'tailwindcss/tailwind.css';

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-maroon to-custom-green-dark">
      <div className="bg-white shadow-lg rounded-lg p-8 m-4 max-w-lg w-full animate__animated animate__fadeIn">
        <Typography variant="h4" className="text-center mb-4 text-custom-maroon">
          Contact Us
        </Typography>
        
        <form className="space-y-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            className="bg-custom-maroon hover:bg-custom-maroon2 text-white fullWidth transition duration-300"
            type="submit"
          >
            Send Message
          </Button>
        </form>

        <div className="mt-8 flex justify-center space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <GitHub fontSize="large" className="text-gray-700 hover:text-custom-maroon transition duration-300" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedIn fontSize="large" className="text-gray-700 hover:text-custom-maroon transition duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
