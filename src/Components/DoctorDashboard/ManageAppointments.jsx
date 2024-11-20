import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BaseUrl } from '../BaseUrl';
import { ThreeDots } from 'react-loader-spinner';
import { BreadCrumb } from './BreadCrumb';
import { Schedule } from '@mui/icons-material';

const ManageAppointments = ({ selectedDisease, selectedDoctor }) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('booked'); 
  const [hiddenUSA , setHiddenUSA] = useState(true); 

  const [dates, setDates] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [displayedDates, setDisplayedDates] = useState([]);
  const [minnesotaDates, setMinnesotaDates]  = useState([]);


const gotoMultipleSel= ()=>navigate("/manageMulAppoint");


  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setLoggedInUser(JSON.parse(storedUserDetails));
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (minnesotaDates.length > 0) {
      console.log(minnesotaDates[0], "Minnesota date/time data");
    }
  }, [minnesotaDates]);

  function addMinnesotaDateTime(bookings) {
    bookings.forEach(booking => {
        booking.slots.forEach(slot => {
            // Create a date object from the original date and time
            const [day, month, year] = booking.date.split('-').map(Number);
            const originalDateTime = new Date(year, month - 1, day, ...slot.time.split(':').map(Number));

            // Subtract 10 hours and 30 minutes
            const minnesotaDateTime = new Date(originalDateTime.getTime() - (10 * 60 * 60 * 1000 + 30 * 60 * 1000));
            
            // Set new fields
            slot.minnesotaTime = minnesotaDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            slot.minnesotaDate = minnesotaDateTime.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
        });
    });
    return bookings; // Return modified bookings
}

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/patients/getBookings`);

      // today's date fileter
      function fromTodaySlot(data) {
        // Get today's date in the same format as the data
        const today = new Date();
        const formattedToday = today.toLocaleDateString('en-GB').split('/').reverse().join('-');
      
        // Filter the data to include only dates from today onwards
        const result = data.filter(item => {
          const itemDate = item.date.split('-').reverse().join('-'); // Convert to YYYY-MM-DD for comparison
          return new Date(itemDate) >= new Date(formattedToday);
        });
      
        return result;
      }
      // today's date fileter


      const fetchedDates = fromTodaySlot(response.data);
      setDates(fetchedDates); // to set dates useState
      
      const updatedDates = addMinnesotaDateTime(fetchedDates);  // add minnesota date and date slot..
      setMinnesotaDates(updatedDates);
      console.log(minnesotaDates+"in the fetch block");
      setDisplayedDates(fetchedDates.slice(offset, offset + getDatesToShow()));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const getDatesToShow = () => {
    if (window.innerWidth < 640) return 1; 
    if (window.innerWidth < 1024) return 3; 
    return 5;
  };

  const handleSlotSelect = (slot, date) => {
    setSelectedSlot({ ...slot, date });
    setOpenModal(true);
  };

  const handleBookingConfirm = async () => {
    try {
      await axios.post(`${BaseUrl}/api/patients/postBookingsAdmin`, {
        bookingId: selectedSlot.bookingId,
        date: selectedSlot.date,
        status: selectedStatus,
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
                  return { ...slot, status: selectedStatus };
                }
                return slot;
              }),
            };
          }
          return dateObj;
        })
      );

      setOpenModal(false);
      setSnackbarMessage('Status updated successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating status:', error);
      setSnackbarMessage('Error updating status');
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
      <h1 className="text-3xl font-extrabold text-custom-maroon mb-6 text-center">
        <BreadCrumb first="Doctor Dashboard" second="Manage Appointment" firstLink="/doctorlogin" secondLink="/manageAppoint" />
        Available Dates
        
        <label className="inline-flex items-center cursor-pointer px-2">
  <input type="checkbox"   checked={hiddenUSA} onChange={() => setHiddenUSA(!hiddenUSA)} className="sr-only peer"/>
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{!hiddenUSA?<>Minnesota Slots</>:<>Indian Slots</>}</span>
</label>
      </h1>
      <h1 className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 p-4 flex justify-end">
    
  {/* checkbox to change link */}
  <Button onClick={gotoMultipleSel} color="blue">Multiple Select</Button>
  {/* checkbox to change page  */}
      </h1>
     

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

        <div className="flex space-x-4 overflow-hidden transition-all duration-500">
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
                      ${slot.status === 'not available' ? 'bg-red-400 text-white cursor-not-allowed' : slot.status === 'booked' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-custom-graybg text-custom-maroon2 cursor-pointer'}`}
                      onClick={() => handleSlotSelect(slot, date)}
                      style={{ pointerEvents: slot.status === 'not available' ? 'none' : 'auto' }}
                    >
                    {/* when toggeled for Indian slots display onley these two */}
                      <span className={`${!hiddenUSA?"hidden":""}`}>{slot.time}</span><br />
{/* when toggeled for INdian slots display onley these two */}

                  {/* when toggeled for Minnesota dates display onley these two */}
                      <span className={`${hiddenUSA?"hidden":""}`}>{slot.minnesotaTime}</span><br />
                      <span className={`${hiddenUSA?"hidden":""}`}>{slot.minnesotaDate}</span>
                        {/* when toggeled for Minnesota dates display onley these two */}
                      <span className={`block text-sm ${slot.status === 'requested' ? 'text-green-700' : ''}`}>{slot.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
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
        <div className="p-6 bg-white shadow-lg rounded-md w-80 mx-auto mt-20">
          <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
          <p>Do you want to change the booking status for the selected slot?</p>
          <div className="mt-4">
            <select className="w-full border p-2 rounded" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
              <option value="booked">Booked</option>
              <option value="requested">Requested</option>
              <option value="not available">Not Available</option>
            </select>
          </div>
          <div className="mt-4 flex justify-between">
            <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setOpenModal(false)}>Cancel</button>
            <button className="bg-custom-maroon0 text-white px-4 py-2 rounded" onClick={handleBookingConfirm}>Confirm</button>
          </div>
        </div>
      </Modal>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default ManageAppointments;
