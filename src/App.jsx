import React, { useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import Loader from "./Components/Loader";
import AboutUs from "./Components/AboutUs";
import BookAnAppointment from "./Components/BookAnAppointment";
import DoctorLogin from "./Components/DoctorLogin";
import PatientLogin from "./Components/PatientLogin";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ContactUs from "./Components/ContactUs";
import ChatBotButton from "./Components/ChatBotButton";
import PageNotFound from "./Components/PageNotFound";
import DoctorDashboard from "./Components/DoctorDashboard";
import PatientDashboard from "./Components/PatientDashboard";
import PatientForgotPass from "./Components/PatientForgotPass";
import PatientNavbar from "./Components/PatientNavbar";
import SchedulePage from "./Components/SchedulePage";
import CancellationRefundPolicies from "./Components/Razorpay/CancellationRefunPolicies";
import PrivacyPolicy from "./Components/Razorpay/PrivacyPolicy";
import ShippingDelivery from "./Components/Razorpay/ShippingDelivery";
import TermsConditions from "./Components/Razorpay/TermsConditions";
import PaymentPage from "./Components/PaymentPage";
import Prescription from "./Components/PDF/Prescription";
import Payment from "./Components/Payment";
import { LoginContext } from './context/LoginContext';
import PatientNotLoggedIn from "./Components/PatientNotLoggedIn";
import VideoCall from "./Components/VideoCall";
import "./App.css";
import PaymentSuccess from "./Components/PaymentSuccess";
import SelectDiseaseType from "./Components/SelectDiseaseType";
import UpcomingApp from "./Components/UpcomingApp";
import PatientHistory from "./Components/PatientHistory";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedInDoctor, setLoggedInDoctor] = useState({});
  

useEffect(() => {
  const loadUserDetails = () => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(userDetails);
    }
  };

  // Load user details immediately
  loadUserDetails();

  // Set a timeout to re-render (update user details) after 2 seconds
  const timeoutId = setTimeout(() => {
    loadUserDetails(); // Call the function again to fetch user details
  }, 2000); // 2000 milliseconds = 2 seconds

  // Cleanup the timeout on component unmount
  return () => clearTimeout(timeoutId);
}, []);



  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Loader />,
      errorElement: <PageNotFound />,
    },
    {
      path: "/home",
      element: (
        <>
          <Navbar />
          <Home />
          <ChatBotButton />
          <Footer />
        </>
      ),
    },
    {
      path: "/pres",
      element: <Prescription />,
    },
    {
      path: "/patientlogin",
      element: (
        <>
          <Navbar />
          <PatientLogin />
          <ChatBotButton />
          <Footer />
        </>
      ),
    },
    {
      path: "/patientforgotPass",
      element: (
        <>
          <Navbar />
          <PatientForgotPass />
          <ChatBotButton />
          <Footer />
        </>
      ),
    },
    {
      path: "/doctorlogin",
      element: loggedInDoctor.isloggedIn ? <DoctorDashboard /> : (
        <>
          <Navbar />
          <DoctorLogin />
          <Footer />
        </>
      ),
    },
    {
      path: "/aboutus",
      element: (
        <>
          <Navbar />
          <AboutUs />
          <ChatBotButton />
          <Footer />
        </>
      ),
    },
    {
      path: "/contactus",
      element: (
        <>
          <Navbar />
          <ContactUs />
          <ChatBotButton />
          <Footer />
        </>
      ),
    },
    {
      path: "/pdash",
      element: loggedInUser.isloggedIn ? (
        <>
      <PatientNavbar/>
          <PatientDashboard />
          <ChatBotButton />
          <Footer />
        </>
      ) : <PatientNotLoggedIn />,
    },
    {
      path: "/selectDis",
      element: loggedInUser.isloggedIn ? (
        <>
      <PatientNavbar/>
     <SelectDiseaseType/>
          <ChatBotButton />
          <Footer />
        </>
      ) : <PatientNotLoggedIn />,
    },
    {
      path: "/history",
      element: loggedInUser.isloggedIn ? (
        <>
      <PatientNavbar/>
     <PatientHistory/>
          <ChatBotButton />
          <Footer />
        </>
      ) : <PatientNotLoggedIn />,
    },
    {
      path: "/appointments",
      element: loggedInUser.isloggedIn ? (
        <>
      <PatientNavbar/>
   <UpcomingApp/>
          <ChatBotButton />
          <Footer />
        </>
      ) : <PatientNotLoggedIn />,
    },

   
    {
      path: "/payment",
      element: loggedInUser.isloggedIn ? <Payment /> : <PatientNotLoggedIn />,
    },
    {
      path: "/payment-success",
      element: loggedInUser.isloggedIn ? <PaymentSuccess/> : <PatientNotLoggedIn />,
    },
    {
      path: "/bookappointment",
      element: (
        <>
          <Navbar />
          <BookAnAppointment />
          <ChatBotButton />
          <Footer />
        </>
      ),
    },
    {
      path: "/schedulepage",
      element: loggedInUser.isloggedIn ? <SchedulePage /> : <PatientNotLoggedIn />,
    },
    {
      path: "/cancel",
      element: (
        <>
          <Navbar />
          <CancellationRefundPolicies />
          <Footer />
        </>
      ),
    },
    {
      path: "/privacy",
      element: (
        <>
          <Navbar />
          <PrivacyPolicy />
          <Footer />
        </>
      ),
    },
    {
      path: "/shipping",
      element: (
        <>
          <Navbar />
          <ShippingDelivery />
          <Footer />
        </>
      ),
    },
    {
      path: "/terms",
      element: (
        <>
          <Navbar />
          <TermsConditions />
          <Footer />
        </>
      ),
    },
     {
      path: "/videocall",
      element: (
        <>
        <VideoCall/>
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <Navbar />
          <PageNotFound />
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
