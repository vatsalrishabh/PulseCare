import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackBarAlert = ({ message, statusCode = "111" }) => {
  const [open, setOpen] = useState(false);

  // Use useEffect to manage the Snackbar open state based on statusCode
  useEffect(() => {
    if (statusCode !== "111" && statusCode !== "99") {
      setOpen(true);
    }
  }, [statusCode]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getSeverity = () => {
    if (statusCode >= 200 && statusCode < 300) return 'success';
    if (statusCode >= 300 && statusCode < 400) return 'info';
    if (statusCode >= 400 && statusCode < 500) return 'warning';
    if (statusCode >= 500) return 'error';
    return 'info';
  };

  // Do not render anything if the statusCode is "99"
  if (statusCode === "99") {
    return null;
  }

  return (
    <div>
      {statusCode !== "111" && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={getSeverity()}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

SnackBarAlert.propTypes = {
  message: PropTypes.string.isRequired,
  statusCode: PropTypes.string,
};

export default SnackBarAlert;
