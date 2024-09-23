import React, { useState, useContext } from "react";
// import Chatbot from 'react-chatbot-kit'
import "react-chatbot-kit/build/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Loader from "./Components/Loader";
import AboutUs from "./Components/AboutUs";
import BookAnAppointment from "./Components/BookAnAppointment";
import DoctorLogin from "./Components/DoctorLogin";
import PatientLogin from "./Components/PatientLogin";
import Pharmacy from "./Components/Pharmacy";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ContactUs from "./Components/ContactUs";
import ChatBotButton from "./Components/ChatBotButton";
import PageNotFound from "./Components/PageNotFound";
import DoctorDashboard from "./Components/DoctorDashboard";
import PatientDashboard from "./Components/PatientDashboard";
import PatientNavbar from "./Components/PatientNavbar";
import PatientForgotPass from "./Components/PatientForgotPass";
import SchedulePage from "./Components/SchedulePage";
import CancellationRefundPolicies from "./Components/Razorpay/CancellationRefunPolicies";
import PrivacyPolicy from "./Components/Razorpay/PrivacyPolicy";
import ShippingDelivery from "./Components/Razorpay/ShippingDelivery";
import TermsConditions from "./Components/Razorpay/TermsConditions";
import PaymentPage from "./Components/PaymentPage";
import Prescription from "./Components/PDF/Prescription";

import Payment from "./Components/Payment";
import {LoginContext} from './context/LoginContext'
import PatientNotLoggedIn from "./Components/PatientNotLoggedIn";
// import VideoCall from './Components/VideoCall';

function App() {
  const {loggedInUser, setLoggedInUser } = useContext(LoginContext);  // set logged in true to see protected routes


  return (
    <div className="h-full">
  
        <BrowserRouter>
          <Routes>
            {/* This is page loader  */}
            <Route path="/" element={<Loader />} />
            {/* This is page Loader */}

            <Route
              path="/home"
              element={
                <>
                  <Navbar />
                  <Home />
                  <ChatBotButton />
                  <PaymentPage />
                  <Footer />
                </>
              }
            />

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
                  <Navbar />
                  <PatientLogin />
                  <ChatBotButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/patientforgotPass"
              element={
                <>
                  <Navbar />
                  <PatientForgotPass />
                  <ChatBotButton />
                  <Footer />
                </>
              }
            />

            <Route
              path="/doctorlogin"
              element={
                <>
                  {loggedInUser.isloggedIn ? (
                    <DoctorDashboard />
                  ) : (
                    <>
                      {" "}
                      <Navbar />
                      <DoctorLogin /> <Footer />
                    </>
                  )}
                </>
              }
            />

            <Route
              path="/aboutus"
              element={
                <>
                  <Navbar />
                  <AboutUs />
                  <ChatBotButton />
                  <Footer />
                </>
              }
            />

            <Route
              path="/contactus"
              element={
                <>
                  <Navbar />
                  <ContactUs />
                  <ChatBotButton />
                  <Footer />
                </>
              }
            />

            <Route path="/videocall" element={<>{/* <VideoCall/> */}</>} />

            {/* Protected Routes using context api logged in or not details */}
            <Route
              path="/pdash"
              element={
                loggedInUser.isloggedIn ? (
                  <>
                    <PatientNavbar />
                    <PatientDashboard />
                    <ChatBotButton />
                    <Footer />
                  </>
                ) : (
                  <>
                  <PatientNotLoggedIn/>
                  </>
                )
              }
            />
            {/* Protected Routes using context api logged in or not details */}

            {/* Protected Routes using context api logged in or not details */}
            <Route
              path="/payment"
              element={
                loggedInUser.isloggedIn ? (
                  <>
                    <Payment />
                  </>
                ) : (
                  <>
                     <PatientNotLoggedIn/>
                  </>
                )
              }
            />
            {/* Protected Routes using context api logged in or not details */}

            <Route
              path="/bookappointment"
              element={
                <>
                  <Navbar />
                  <BookAnAppointment />
                  <ChatBotButton />
                  <Footer />
                </>
              }
            />

            <Route
              path="/schedulepage"
              element={
                loggedInUser.isloggedIn ? (
                  <>
                  <SchedulePage />
                </>
                ) : (
                  <>
                  <PatientNotLoggedIn/>
                  </>
                )
              }
            />

            <Route
              path="/cancel"
              element={
                <>
                  <Navbar />
                  <CancellationRefundPolicies />
                  <Footer />
                </>
              }
            />

            <Route
              path="/privacy"
              element={
                <>
                  <Navbar />
                  <PrivacyPolicy />
                  <Footer />
                </>
              }
            />

            <Route
              path="/shipping"
              element={
                <>
                  <Navbar />
                  <ShippingDelivery />
                  <Footer />
                </>
              }
            />

            <Route
              path="/terms"
              element={
                <>
                  <Navbar />
                  <TermsConditions />
                  <Footer />
                </>
              }
            />

            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <PageNotFound />
                  <Footer />
                </>
              }
            />

            {/* <Route path="/pharmacy" element={<Pharmacy />} /> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
