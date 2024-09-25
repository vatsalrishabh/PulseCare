import React, { useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedInDoctor, setLoggedInDoctor] = useState({});

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      // console.log(userDetails);
      // console.log(loggedInUser.isloggedIn);
      setLoggedInUser(userDetails);
    }
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
      path: "/payment",
      element: loggedInUser.isloggedIn ? <Payment /> : <PatientNotLoggedIn />,
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
