import React, { useState, useEffect } from 'react';
// import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Loader from './Components/Loader';
import AboutUs from './Components/AboutUs';
import BookAnAppointment from './Components/BookAnAppointment';
import DoctorLogin from './Components/DoctorLogin';
import PatientLogin from './Components/PatientLogin';
import Pharmacy from './Components/Pharmacy';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ContactUs from './Components/ContactUs';

function App() {



  return (
    <div className='h-full'>
    <BrowserRouter>
        <Routes>

{/* This is page loader  */}
          <Route
           path="/"
          element={
          <Loader />
          } />
{/* This is page Loader */}


          <Route
          path="/home"
          element={
            <>
           <Navbar/>
           <Home />
           <Footer/>
          </>
        } />


         
       
          <Route
           path="/patientlogin"
            element={
            <>
              <PatientLogin />
            </>
            } />


          <Route 
          path="/doctorlogin"
           element={
           <>
              <DoctorLogin />
           </>
           } />

          <Route
          path="/aboutus"
          element={
          <AboutUs />}
           />

          <Route
           path="/contactus"
            element={
            <>
             <ContactUs />
            </>
           } />


          <Route 
          path="/bookappointment"
           element={
           <>
           <BookAnAppointment />
           </>
           } />



          {/* <Route path="/pharmacy" element={<Pharmacy />} /> */}


        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
