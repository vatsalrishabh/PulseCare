import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseUrl } from "./BaseUrl";

const PatientForgotPass = () => {
  // forgot password form data
  const [emailUpdatePassword, setEmailUpdatePassword] = useState("");
  const [patientPassword, setPassword] = useState("");
  const [patientConPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const [displayOtpInput, setdisplayOtpInput] = useState("hidden");
  const [disableInput, setDisplay] = useState("hidden");
  const [emailReadOnly, setEmailReadOnly] = useState(false);

  // send otp axios functions
  const resetPassword = async (e) => {
    e.preventDefault();

    const payload = {
      emailUpdatePassword: emailUpdatePassword,
    };

    try {
      const response = await axios.post(
        `${BaseUrl}/api/patients/updatePassword`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Otp sent to reset the password");
        setdisplayOtpInput(""); // Display the OTP input
        setDisplay(""); // Make the password fields visible
        setEmailReadOnly(true); // Make the email input readonly
      }
    } catch (error) {
      console.error(
        "An error occurred during sending email for Forgot password:",
        error
      );
    }
  };

  // Verify OTP and change password
  const otpVerifyChangePass = async () => {
    const payload = {
      email: emailUpdatePassword,
      password: patientPassword,
      otp: otp,
    };

    try {
      const response = await axios.post(
        `${BaseUrl}/api/patients/updatePasswordOtp`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response.status==200){
        console.log("updated the password successfully");
      }
    } catch (error) {
      console.error("An error occurred during OTP verification:", error);
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      otpVerifyChangePass();
    }
  }, [otp]);

  return (
    <div className="Forgot Password">
      <form
        className="max-w-sm mx-auto border-2 border-custom-maroon2 bg-white rounded-lg p-5 m-5 w-full"
        onSubmit={resetPassword}
      >
        <div className="mb-5">
          <div className="heading text-center font-bold text-2xl">
            Patient <span className="text-custom-maroon">Forgot Password</span>
          </div>

          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              value={emailUpdatePassword}
              onChange={(e) => setEmailUpdatePassword(e.target.value)}
              type="email"
              id="website-admin"
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email/username"
              readOnly={emailReadOnly}  // Set readOnly based on state
              
            />
          </div>
        </div>

        {/* Password fields */}
        <div className={`${disableInput} relative z-0 w-full mb-5 group`}>
          <input
            type="password"
            value={patientPassword}
            onChange={(e) => setPassword(e.target.value)}
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <div className={`${disableInput} relative z-0 w-full mb-5 group`}>
          <input
            type="password"
            value={patientConPassword}
            onChange={(e) => setConPassword(e.target.value)}
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
     
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>

        <div className={`${displayOtpInput} mb-4`}>
          <label
            htmlFor="Otp"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your OTP
          </label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        
          />
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <div className="flex">
              <p>Click here to goto Login page.</p>
              <Link to="../patientlogin">
                <p className="pl-5 text-blue-500 font-bold underline">
                  Login Page
                </p>
              </Link>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-custom-maroon hover:bg-custom-maroon2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForgotPass;
