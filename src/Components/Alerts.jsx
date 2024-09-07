import React, { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";
import { CSSTransition } from "react-transition-group";
import './Alerts.css'; // Custom CSS for animations

// Success Icon
export function SuccessIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Error Icon
export function ErrorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm.53 6.72a.75.75 0 00-1.06 0l-2.25 2.25a.75.75 0 001.06 1.06l.72-.72v4.69a.75.75 0 001.5 0v-4.69l.72.72a.75.75 0 001.06-1.06l-2.25-2.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Failed Icon
export function FailedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm10.28-3.22a.75.75 0 00-1.06 0L8.97 11.28a.75.75 0 101.06 1.06l1.22-1.22 1.22 1.22a.75.75 0 101.06-1.06l-1.22-1.22 1.22-1.22a.75.75 0 000-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Generic Alert Component with Animation
export const AnimatedAlert = ({ message, icon: Icon, colorClass, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Automatically close the alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Alert disappears after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <CSSTransition
      in={visible}
      timeout={500}
      classNames="fade-alert"
      unmountOnExit
    >
      <div className={`absolute center-mid-right ${colorClass} p-4 rounded-md shadow-lg`}>
        <Alert icon={<Icon />} className="flex items-center space-x-3">
          {message}
          <button
            className="ml-auto pl-3 text-white hover:text-gray-700"
            onClick={() => {
              setVisible(false);
              onClose && onClose();
            }}
          >
            ✖
          </button>
        </Alert>
      </div>
    </CSSTransition>
  );
};

// Success Alert
export const SuccessAlert = (props) => (
  <AnimatedAlert
    message={props.message}
    icon={SuccessIcon}
    colorClass="bg-green-200 text-green-600"
    onClose={props.onClose}
  />
);

// Error Alert
export const ErrorAlert = (props) => (
  <AnimatedAlert
    message={props.message}
    icon={ErrorIcon}
    colorClass="bg-red-200 text-red-600"
    onClose={props.onClose}
  />
);

// Failed Alert
export const FailedAlert = (props) => (
  <AnimatedAlert
    message={props.message}
    icon={FailedIcon}
    colorClass="bg-orange-200 text-orange-600"
    onClose={props.onClose}
  />
);
