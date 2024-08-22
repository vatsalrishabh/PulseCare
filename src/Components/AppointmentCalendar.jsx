import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import DatePicker from 'react-datepicker'; // Ensure you have installed react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

const AppointmentCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [contactMethod, setContactMethod] = useState('email');
  const [contactInfo, setContactInfo] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
    setContactInfo(''); // Clear contact info when changing method
  };

  const handleContactInfoChange = (event) => {
    setContactInfo(event.target.value);
  };

  // Generate 30-minute intervals for the full day
  const timeIntervals = [];
  for (let i = 0; i < 24 * 2; i++) {
    const time = new Date();
    time.setHours(Math.floor(i / 2));
    time.setMinutes(i % 2 === 0 ? 0 : 30);
    timeIntervals.push(time);
  }

  return (
    <div className='p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg'>
      <div className="Calendar_DatePicker flex space-x-6 mb-6">
        <div className="Calendar flex-1">
          <h2 className="text-xl font-semibold mb-2">Select Date</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="rounded-lg shadow-md border border-gray-300"
          />
        </div>
        <div className="DatePicker flex-1">
          <h2 className="text-xl font-semibold mb-2">Select Time</h2>
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="rounded-lg shadow-md border border-gray-300 p-2 w-full"
            includeTimes={timeIntervals} // Limit the selection to 30-minute intervals
          />
        </div>
      </div>
      
      <div className="summary mb-6">
        <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
        <p>You are going to book an appointment for {date.toDateString()} at {selectedTime ? selectedTime.toLocaleTimeString() : 'not selected yet'}</p>
        <p>You will be charged INR 300 for this.</p>
        <p>Please provide your contact information to confirm the order:</p>
        <div className="contact-method mb-4">
          <label className="block text-gray-700 mb-2">Preferred Contact Method:</label>
          <select
            value={contactMethod}
            onChange={handleContactMethodChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        {contactMethod === 'email' ? (
          <div className="email-input">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={contactInfo}
              onChange={handleContactInfoChange}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        ) : (
          <div className="mobile-input">
            <label className="block text-gray-700 mb-2">Mobile:</label>
            <input
              type="tel"
              value={contactInfo}
              onChange={handleContactInfoChange}
              placeholder="Enter your mobile number"
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
