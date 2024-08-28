import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SchedulePage = () => {
  const [dates, setDates] = useState([
    {
      '27-6-2024': [
        { bookingId: '12312214', time: '09:00 - 09:45', status: 'available', bookedby: 'NA', bookedOn: 'NA' },
        { bookingId: '12312215', time: '09:45 - 10:30', status: 'available', bookedby: 'NA', bookedOn: 'NA' },
        // Add other slots similarly
      ]
    },
    {
      '28-6-2024': [
        { bookingId: '12312216', time: '10:30 - 11:15', status: 'available', bookedby: 'NA', bookedOn: 'NA' },
        { bookingId: '12312217', time: '11:15 - 12:00', status: 'available', bookedby: 'NA', bookedOn: 'NA' },
        // Add other slots similarly
      ]
    },
    {
      '29-6-2024': [
        { bookingId: '12312218', time: '08:15 - 09:00', status: 'available', bookedby: 'NA', bookedOn: 'NA' },
        { bookingId: '12312219', time: '09:00 - 09:45', status: 'available', bookedby: 'NA', bookedOn: 'NA' },
        { bookingId: '12312220', time: '09:45 - 10:30', status: 'requested', bookedby: '090999', bookedOn: '31-06-2024' },
        { bookingId: '12312221', time: '10:30 - 11:15', status: 'requested', bookedby: 'NA', bookedOn: 'NA' },
        { bookingId: '12312222', time: '11:15 - 12:00', status: 'booked', bookedby: '9092', bookedOn: '22-04-2023' },
        // Add other slots similarly
      ]
    }
  ]);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-custom-maroon mb-6 text-center">Available Dates</h1>

      <div className="relative flex items-center w-full bg-custom-graybg p-4 rounded-lg overflow-x-auto whitespace-nowrap">
        {dates.map((dateObj, index) => {
          const [date, slots] = Object.entries(dateObj)[0];
          return (
            <div key={index} className="inline-block mb-6 mx-2 p-5 w-80 text-center border-2 border-custom-gray0 rounded-lg shadow-lg bg-white hover:bg-custom-gray0 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-custom-maroon2 mb-4">{date}</h2>
              <ul>
                {slots
                  .filter(slot => slot.status !== 'booked') // Hide booked slots
                  .map((slot, idx) => (
                    <li
                      key={idx}
                      className={`mb-3 p-2 border border-custom-maroon rounded-lg 
                      ${slot.status === 'requested' ? 'bg-green-300 text-green-800' : 'bg-custom-graybg text-custom-maroon2'}
                      hover:bg-cutom-green transition-all duration-300`}
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

      {/* Fixed horizontal scroll buttons */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 p-2 bg-custom-maroon0 rounded-full shadow-lg cursor-pointer z-20">
        <ArrowBackIcon className="text-white" sx={{ fontSize: 45 }} />
      </div>
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 p-2 bg-custom-maroon0 rounded-full shadow-lg cursor-pointer z-20">
        <ArrowForwardIcon className="text-white" sx={{ fontSize: 45 }} />
      </div>
    </>
  );
};

export default SchedulePage;
