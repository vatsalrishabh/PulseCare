import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BaseUrl } from './BaseUrl';
import { ThreeDots } from 'react-loader-spinner';

const SchedulePage = ({ selectedDisease, selectedDoctor }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [dates, setDates] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayedDates, setDisplayedDates] = useState([]);
  const [offset, setOffset] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      console.log(userDetails);
      console.log(loggedInUser.isloggedIn);
      setLoggedInUser(userDetails);
    }
  }, []);


  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const url = `${BaseUrl}/api/patients/getBookings`;
      const response = await axios.get(url);
      setDates(response.data);
      setDisplayedDates(response.data.slice(offset, offset + getDatesToShow()));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const getDatesToShow = () => {
    if (window.innerWidth < 640) return 1; // Mobile: 1 date
    if (window.innerWidth < 1024) return 3; // Medium screens: 3 dates
    return 5; // Large screens: 5 dates
  };

  const handleSlotSelect = (slot, date) => {
    if (slot.status === 'booked') return;
    setSelectedSlot({ ...slot, date });
    setOpenModal(true);
  };

  const handleBookingConfirm = async () => {
    try {
      await axios.post(`${BaseUrl}/api/patients/postBookings`, {
        bookingId: selectedSlot.bookingId,
        date: selectedSlot.date,
        bookedBy: loggedInUser.email,
        bookedOn: new Date().toLocaleDateString(),
      });

      setDates(prevDates => 
        prevDates.map(dateObj => {
          if (dateObj.date === selectedSlot.date) {
            return {
              ...dateObj,
              slots: dateObj.slots.map(slot => {
                if (slot.bookingId === selectedSlot.bookingId) {
                  return { ...slot, status: 'booked' };
                }
                return slot;
              }),
            };
          }
          return dateObj;
        })
      );

      setDisplayedDates(prevDisplayed => 
        prevDisplayed.map(dateObj => {
          if (dateObj.date === selectedSlot.date) {
            return {
              ...dateObj,
              slots: dateObj.slots.map(slot => {
                if (slot.bookingId === selectedSlot.bookingId) {
                  return { ...slot, status: 'booked' };
                }
                return slot;
              }),
            };
          }
          return dateObj;
        })
      );

      setOpenModal(false);
      setSnackbarMessage('Booking successful');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error confirming booking:', error);
      setSnackbarMessage('Error confirming booking');
      setSnackbarOpen(true);
    }
  };

  const loadMoreDates = (direction) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOffset(prevOffset => {
        const newOffset = direction === 'next' ? prevOffset + getDatesToShow() : prevOffset - getDatesToShow();
        setDisplayedDates(dates.slice(newOffset, newOffset + getDatesToShow()));
        return newOffset;
      });
    }, 3000);
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold text-custom-maroon mb-6 text-center">Available Dates</h1>
      <div>
      <h2>Schedule Your Appointment</h2>
      <p>Selected Disease: {selectedDisease}</p>
      <p>Selected Doctor: {selectedDoctor?.name} (ID: {selectedDoctor?.id})</p>
      {/* Add scheduling logic here */}
    </div>

      <div className="relative flex items-center w-full bg-custom-graybg p-4 rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}

        <div className={`flex space-x-4 overflow-hidden transition-all duration-500`}>
          {displayedDates.map((dateObj, index) => {
            const { date, slots } = dateObj;

            if (!Array.isArray(slots)) {
              console.warn(`Slots is not an array for date: ${date}`, slots);
              return null;
            }

            return (
              <div key={index} className="inline-block mb-6 w-80 text-center border-2 border-custom-gray0 rounded-lg shadow-lg bg-white transition-all duration-300">
                <h2 className="text-2xl font-semibold text-custom-maroon2 mb-4">{date}</h2>
                <ul>
                  {slots.map((slot, idx) => (
                    <li
                      key={idx}
                      className={`mb-3 p-2 border border-custom-maroon rounded-lg 
                      ${slot.status === 'booked' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-custom-graybg text-custom-maroon2 cursor-pointer'}`}
                      onClick={() => handleSlotSelect(slot, date)}
                      style={{ pointerEvents: slot.status === 'booked' ? 'none' : 'auto' }}
                    >
                      <span>{slot.time}</span>
                      <span className={`block text-sm ${slot.status === 'requested' ? 'text-green-700' : ''}`}>{slot.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 p-2">
        <button 
          className="bg-custom-maroon0 text-white p-2 rounded-full flex items-center hover:bg-custom-maroon1 transition"
          onClick={() => loadMoreDates('previous')}
          disabled={offset === 0}
        >
          <ArrowBackIcon />
        </button>
      </div>

      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 p-2">
        <button 
          className="bg-custom-maroon0 text-white p-2 rounded-full flex items-center hover:bg-custom-maroon1 transition"
          onClick={() => loadMoreDates('next')}
          disabled={offset + getDatesToShow() >= dates.length}
        >
          <ArrowForwardIcon />
        </button>
      </div>

      {/* Booking Confirmation Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
          <p>Are you sure you want to book the slot at {selectedSlot?.time} on {selectedSlot?.date}?</p>
          <div className="mt-4">
            <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={handleBookingConfirm}>Confirm</button>
            <button className="bg-red-500 text-white p-2 rounded" onClick={() => setOpenModal(false)}>Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Snackbar for alerts */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SchedulePage;
