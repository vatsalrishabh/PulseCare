import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// import PaymentPage from "./Components/PaymentPage";
import Prescription from "./Components/PDF/Prescription";
import Payment from "./Components/Payment";
import PatientNotLoggedIn from "./Components/PatientNotLoggedIn";
import VideoCall from "./Components/VideoCall";
import "./App.css";
import PaymentSuccess from "./Components/PaymentSuccess";
import SelectDiseaseType from "./Components/SelectDiseaseType";
import UpcomingApp from "./Components/UpcomingApp";
import PatientHistory from "./Components/PatientHistory";
import DoctorNavbar from "./Components/DoctorDashboard/DoctorNavbar";
import AllPatientProfile from "./Components/DoctorDashboard/AllPatientProfile";
import PatientProfile from "./Components/PatientProfile";
import ManageAppointments from "./Components/DoctorDashboard/ManageAppointments";
import PrescribeMedicine from "./Components/PrescribeMedicine";
import EditPatientProfile from "./Components/EditPatientProfile";
import DEditPProfile from "./Components/DoctorDashboard/DEditPProfile";
import DPProfile from "./Components/DoctorDashboard/DPProfile";
import DUpcoming from "./Components/DoctorDashboard/DUpcoming";
import PatientPrescription from "./Components/DoctorDashboard/PatientPrescription";
import FinalReport from "./Components/DoctorDashboard/FinalReport";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedInDoctor, setLoggedInDoctor] = useState({});

  useEffect(() => {

// load user details from local storage immediately
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setLoggedInUser(userDetails);
      }
    };
    loadUserDetails();
// loaduserdeails immediatellly

// load docotors details immdediately
const loadDoctorDetails = () => {
  const storedDoctorDetails = localStorage.getItem('doctorDetails');
  if (storedDoctorDetails) {
    const doctorDetails = JSON.parse(storedDoctorDetails);
    setLoggedInDoctor(doctorDetails);
  }
};
loadDoctorDetails();
// load docotors details immdediately




    // Set a timeout to re-render (update user details) every 2 seconds
    const intervalId = setInterval(() => {
      loadUserDetails(); // Call the function to fetch user details
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/home" element={
            <>
              <Navbar />
              <Home />
              <ChatBotButton />
              <Footer />
            </>
          } />
          <Route path="/pres" element={<Prescription />} />
          <Route path="/patientlogin" element={
            <>
              <Navbar />
              <PatientLogin />
              <ChatBotButton />
              <Footer />
            </>
          } />
          <Route path="/patientforgotPass" element={
            <>
              <Navbar />
              <PatientForgotPass />
              <ChatBotButton />
              <Footer />
            </>
          } />


{/* all the dcotors routes below */}
          <Route path="/doctorlogin" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <DoctorDashboard /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />

           <Route path="/allpatientprofile" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <AllPatientProfile /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />


<Route path="/PatientPres" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <PatientPrescription /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />



<Route path="/DpatientprofileEdit/:patientEmail" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <DEditPProfile /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />


<Route path="/Dpatientprofile/:patientEmail" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <DPProfile /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />







<Route path="/manageAppoint" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <ManageAppointments /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />


<Route path="/Dappointments" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <DUpcoming /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />


<Route path="/prescriptions" element={loggedInDoctor.isLoggedIn ?
          <>
          <DoctorNavbar/>
          <PrescribeMedicine /> 
          <Footer/>
          </>
           : (
            <>
              <Navbar />
              <DoctorLogin />
              <Footer />
            </>
          )} />






          <Route path="/aboutus" element={
            <>
              <Navbar />
              <AboutUs />
              <ChatBotButton />
              <Footer />
            </>
          } />
          <Route path="/contactus" element={
            <>
              <Navbar />
              <ContactUs />
              <ChatBotButton />
              <Footer />
            </>
          } />

          <Route path="/pdash" element={loggedInUser.isloggedIn ? (
            <>
              <PatientNavbar />
              <PatientDashboard />
              <ChatBotButton />
              <Footer />
            </>
          ) : <PatientNotLoggedIn />} />

           <Route path="/patientprofile" element={loggedInUser.isloggedIn ? (
            <>
              <PatientNavbar />
              <PatientProfile />
              <ChatBotButton />
              <Footer />
            </>
          ) : <PatientNotLoggedIn />} />

<Route path="/editpatientprofile" element={loggedInUser.isloggedIn ? (
            <>
              <PatientNavbar />
              <EditPatientProfile />
              <ChatBotButton />
              <Footer />
            </>
          ) : <PatientNotLoggedIn />} />


          <Route path="/selectDis" element={loggedInUser.isloggedIn ? (
            <>
              <PatientNavbar />
              <SelectDiseaseType />
              <ChatBotButton />
              <Footer />
            </>
          ) : <PatientNotLoggedIn />} />
          <Route path="/history" element={loggedInUser.isloggedIn ? (
            <>
              <PatientNavbar />
              <PatientHistory />
              <ChatBotButton />
              <Footer />
            </>
          ) : <PatientNotLoggedIn />} />
          <Route path="/appointments" element={loggedInUser.isloggedIn ? (
            <>
              <PatientNavbar />
              <UpcomingApp />
              <ChatBotButton />
              <Footer />
            </>
          ) : <PatientNotLoggedIn />} />
           <Route path="/finalreport" element={loggedInUser.isloggedIn ? <FinalReport /> : <PatientNotLoggedIn />} />
          <Route path="/payment" element={loggedInUser.isloggedIn ? <Payment /> : <PatientNotLoggedIn />} />
          <Route path="/payment-success" element={loggedInUser.isloggedIn ? <PaymentSuccess /> : <PatientNotLoggedIn />} />
          <Route path="/bookappointment" element={
            <>
              <Navbar />
              <BookAnAppointment />
              <ChatBotButton />
              <Footer />
            </>
          } />
          <Route path="/schedulepage" element={loggedInUser.isloggedIn ? <SchedulePage /> : <PatientNotLoggedIn />} />
          <Route path="/cancel" element={
            <>
              <Navbar />
              <CancellationRefundPolicies />
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Navbar />
              <PrivacyPolicy />
              <Footer />
            </>
          } />
          <Route path="/shipping" element={
            <>
              <Navbar />
              <ShippingDelivery />
              <Footer />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Navbar />
              <TermsConditions />
              <Footer />
            </>
          } />
          <Route path="/videocall" element={<VideoCall />} />
          <Route path="*" element={
            <>
              <Navbar />
              <PageNotFound />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
