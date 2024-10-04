import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import SnackBarAlert from "./SnackBarAlert";
import { BaseUrl } from "./BaseUrl";
import "./PatientForgotPass.css";

const PatientForgotPass = () => {
  const [emailUpdatePassword, setEmailUpdatePassword] = useState("");
  const [patientPassword, setPassword] = useState("");
  const [patientConPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isEmailReadOnly, setEmailReadOnly] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "99" });

  const navigate = useNavigate();

  const showAlert = (message, status, timeout = 5000) => {
    setAlert({ message, status });
    setTimeout(() => setAlert({ message: "", status: "99" }), timeout);
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    const payload = { emailUpdatePassword };
    try {
      const response = await axios.post(
        `${BaseUrl}/api/patients/updatePassword`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setIsOtpVisible(true);
        setEmailReadOnly(true);
        showAlert("Otp sent Successfully!", "200");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        showAlert("User not registered. Please go to the registration page.", "400");
      }
      console.error("Error during password reset:", error);
    }
  };

  const otpVerifyChangePass = async (e) => {
    e.preventDefault();

    if (patientPassword !== patientConPassword) {
      return showAlert("Passwords do not match!", "400");
    }

    const payload = {
      email: emailUpdatePassword,
      password: patientPassword,
      otp,
    };

    try {
      const response = await axios.post(
        `${BaseUrl}/api/patients/updatePasswordOtp`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        showAlert("Password Updated Successfully!", "200", 2000);
        setTimeout(() => navigate("/patientlogin"), 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.status === 400
        ? "Incorrect OTP!"
        : "Something went wrong! Server issue";
      showAlert(errorMessage, "400");
    }
  };

  return (
    <div className="Forgot Password">
      <SnackBarAlert message={alert.message} statusCode={alert.status} />
      <div className="Alert holder w-full flex justify-end align-middle">
        {/* {alert.status === "200" && (
          <div className="alrt w-1/3 p-3">
            <Alert variant="filled" severity="success">
              Your Password has been changed successfully!
            </Alert>
          </div>
        )} */}
      </div>

      <form
        className="max-w-sm mx-auto border-2 border-custom-maroon2 bg-white rounded-lg p-5 m-5 w-full"
        onSubmit={isEmailReadOnly ? otpVerifyChangePass : resetPassword}
      >
        <div className="mb-5">
          <div className="heading text-center font-bold text-2xl">
            Patient <span className="text-custom-maroon">Forgot Password</span>
          </div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            type="email"
            id="email"
            value={emailUpdatePassword}
            onChange={(e) => setEmailUpdatePassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
            placeholder="Enter your email/username"
            readOnly={isEmailReadOnly}
          />
        </div>

        {isOtpVisible && (
          <>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={patientPassword}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={patientConPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                placeholder="Confirm your new password"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">
                Your OTP
              </label>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
              />
            </div>
          </>
        )}

        <div className="flex justify-center align-middle mb-5">
          <button
            type="submit"
            className="w-full text-white bg-custom-maroon hover:bg-custom-maroon2 rounded-lg p-2.5"
          >
            {isEmailReadOnly ? "Verify OTP" : "Send OTP"}
          </button>
        </div>

        {isEmailReadOnly && (
          <div className="flex justify-center align-middle">
            <button
              onClick={resetPassword}
              className="m-1 text-white bg-custom-maroon hover:bg-custom-maroon2 rounded-lg p-2.5"
            >
              Resend
            </button>
          </div>
        )}
      </form>

      <div className="flex items-center justify-center">
        <p>Click here to go to Login page.</p>
        <Link to="../patientlogin" className="pl-5 text-blue-500 font-bold underline">
          Login Page
        </Link>
      </div>
    </div>
  );
};

export default PatientForgotPass;
