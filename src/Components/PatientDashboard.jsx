import React from "react";
import PCard from "./PCard";

const PatientDashboard = () => {
  return (
    <div className="PatientDashboard p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-3">
          <PCard
            Title="Upcoming Appointments"
            TicketNumber="2243253453"
            DateTime="Aug 27, 2024 btw 10:00am to 2:00pm"
            buttonViewAppointment ="View Appointment"
             buttonMyReports =""
              buttonBookAppointment =""
              button4=""
          />
        </div>
        <div className="p-3">
          <PCard
            Title="My Reports"
            TicketNumber="BH0023"
            DateTime="Uploaded On:- Aug 27, 2024 btw 10:00am to 2:00pm"
            buttonViewAppointment =""
             buttonMyReports ="My Reports"
              buttonBookAppointment =""
              button4=""
          />
        </div>
        <div className="p-3">
          <PCard
            Title="Book Appointments"
            TicketNumber="2243253453"
            DateTime="Aug 27, 2024 btw 10:00am to 2:00pm"
            buttonViewAppointment =""
             buttonMyReports =""
              buttonBookAppointment ="Book Appointment"
              button4=""
          />
        </div>
        <div className="p-3">
          <PCard
            Title="Upcoming Appointments"
            TicketNumber="2243253453"
            DateTime="Aug 27, 2024 btw 10:00am to 2:00pm"
            buttonViewAppointment =""
            buttonMyReports =""
             buttonBookAppointment =""
             button4="Button4"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
