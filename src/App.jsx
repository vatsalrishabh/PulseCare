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
import PageNotFound from './Components/PageNotFound';
import DoctorDashboard from './Components/DoctorDashboard';
import PatientDashboard from './Components/PatientDashboard';
import PatientNavbar from './Components/PatientNavbar';
import PatientForgotPass from './Components/PatientForgotPass';
import SchedulePage from './Components/SchedulePage';
import CancellationRefundPolicies from './Components/Razorpay/CancellationRefunPolicies';
import PrivacyPolicy from './Components/Razorpay/PrivacyPolicy';
import ShippingDelivery from './Components/Razorpay/ShippingDelivery';
import TermsConditions from './Components/Razorpay/TermsConditions';
import PaymentPage from './Components/PaymentPage';
import Prescription from './Components/PDF/Prescription';
import { LoginContextProvider } from './context/LoginContext';
// import VideoCall from './Components/VideoCall';

function App() {
const [doctorIsLogged,setDoctorLogin]=useState(false);
// sessionStorage.setItem('doctorId','Nishant Kumar','loggedIn',true);
// const vatsal = sessionStorage.getItem('doctorId');
// console.log(vatsal);

  return (
    <div className='h-full'>
      <LoginContextProvider>
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
           <ChatBotButton/>
           <PaymentPage/>
           <Footer/>
          </>
        } />




           <Route
              path="/pres"
              element={
                <>
                  
                  <Prescription />
                
                </>
              }
            />



         
       
          <Route
           path="/patientlogin"
            element={
            <>
               <Navbar/>
              <PatientLogin />
              <ChatBotButton/>
              <Footer/>
            </>
            } />
  <Route
           path="/patientforgotPass"
            element={
            <>
               <Navbar/>
              <PatientForgotPass />
              <ChatBotButton/>
              <Footer/>
            </>
            } />


          <Route 
          path="/doctorlogin"
           element={
           <>
             
            {doctorIsLogged ? <DoctorDashboard/>:<> <Navbar/><DoctorLogin />  <Footer/></>} 
             
           </>
           } />

          <Route
          path="/aboutus"
          element={
            <>
               <Navbar/>
             <AboutUs />
             <ChatBotButton/>
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
             <ChatBotButton/>
             <Footer/>
            </>
           } />



          <Route
           path="/videocall"
          element={
            <>
                   {/* <VideoCall/> */}
            </>
          }
          />
           <Route 
          path="/pdash"
           element={
           <>
           <PatientNavbar/>
           <PatientDashboard/>
           <ChatBotButton/>
           <Footer/>
           </>
           } />

          <Route 
          path="/bookappointment"
           element={
           <>
              <Navbar/>
           <BookAnAppointment />
           <ChatBotButton/>
           <Footer/>
           </>
           } />

<Route 
          path="/schedulepage"
           element={
           <>
              <SchedulePage/>
           </>
           } />

<Route 
          path="/cancel"
           element={
           <>
           <Navbar/>
            <CancellationRefundPolicies/>
            <Footer/>
           </>
           } />



           <Route 
          path="/privacy"
           element={
           <>
           <Navbar/>
            <PrivacyPolicy/>
            <Footer/>
           </>
           } />


              
<Route 
          path="/shipping"
           element={
           <>
           <Navbar/>
            <ShippingDelivery/>
            <Footer/>
           </>
           } />


              
<Route 
          path="/terms"
           element={
           <>
           <Navbar/>
            <TermsConditions/>
            <Footer/>
           </>
           } />




           <Route
            path="*"
           element={
            <>
            <Navbar/>
            <PageNotFound/>
            <Footer/>
            </>
           }
           />



          {/* <Route path="/pharmacy" element={<Pharmacy />} /> */}


        </Routes>
       
    </BrowserRouter>
    </LoginContextProvider>
    </div>
  );
}

export default App;
