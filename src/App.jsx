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
import ChatBotButton from './Components/ChatBotButton';

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
               <Navbar/>
              <PatientLogin />
              <Footer/>
            </>
            } />


          <Route 
          path="/doctorlogin"
           element={
           <>
              <Navbar/>
              <DoctorLogin />
              <Footer/>
           </>
           } />

          <Route
          path="/aboutus"
          element={
            <>
               <Navbar/>
             <AboutUs />
             <Footer/>
            </>
          }
           />

          <Route
           path="/contactus"
            element={
            <>
               <Navbar/>
             <ContactUs />
             <Footer/>
            </>
           } />


          <Route 
          path="/bookappointment"
           element={
           <>
              <Navbar/>
           <BookAnAppointment />
           <Footer/>
           </>
           } />



          {/* <Route path="/pharmacy" element={<Pharmacy />} /> */}


        </Routes>
        <ChatBotButton/>
    </BrowserRouter>
    </div>
  );
}

export default App;
