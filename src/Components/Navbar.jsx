import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PulseCare from '../assets/Puslecarelogo/PulseCare.png';

const Navbar = () => {
  const [displayDropdown, setDropdown] = useState(false); // Using boolean for dropdown state

  const handleDropDown = () => {
    setDropdown(!displayDropdown); // Toggle dropdown state
  };

  return (
    <div className='Navbar'>
      <nav className="bg-custom-maroon border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <Link to="/" className="flex items-center lg:w-1/3 ">
            <img src={PulseCare} className="h-14" alt="PulseCare Logo" />
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleDropDown}
            aria-controls="navbar-default"
            aria-expanded={displayDropdown ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              displayDropdown ? "block" : "hidden"
            } lg:w-2/3 w-full lg:block md:hidden`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-custom-maroon md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <Link
                  to="/home"
                  className="block py-2 px-3 font-bold text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                  onClick={handleDropDown} // Close dropdown when link clicked
                >
                  Home
                </Link>
              </li>
              
              <li>
                <Link
                  to="/patientlogin"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleDropDown}
                >
                  Patient Login
                </Link>
              </li>
              <li>
                <Link
                  to="/doctorlogin"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleDropDown}
                >
                  Doctor Login
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleDropDown}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleDropDown}
                >
                  Contact Us
                </Link>
              </li>

              <li className='bg-red-700 lg:p-2'>
                <Link
                  to="/bookappointment"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleDropDown}
                >
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
