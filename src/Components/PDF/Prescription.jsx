import React, { useState } from "react";
import logo from "../../assets/Puslecarelogo/PulseCare.png"; // Replace with the actual path to your logo image
import signature from '../../assets/Puslecarelogo/signature.jpg' // Replace with the actual path to your signature image
import jsPDF from "jspdf";

const Prescription = () => {
  const [patientDetails, setPatientDetails] = useState({
    patientId: "",
    name: "",
    mobile: "",
    sex: "",
    address: "",
    email: "",
    diagnosis: "",
    treatmentGiven: "",
  });

  const [medicines, setMedicines] = useState([
    {
      medicine: "",
      days: "",
      morning: false,
      afternoon: false,
      night: false,
      notes: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleMedicineChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedMedicines = [...medicines];
    updatedMedicines[index][name] = type === "checkbox" ? checked : value;
    setMedicines(updatedMedicines);
  };

  const addMedicineRow = () => {
    setMedicines([
      ...medicines,
      { medicine: "", days: "", morning: false, afternoon: false, night: false, notes: "" },
    ]);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add the logo
    doc.addImage(logo, "PNG", 10, 10, 30, 15);

    // Add Clinic Name and Details
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 153); // Dark Blue
    doc.text("PulseCare Clinic", 50, 15);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black
    doc.text("Email: pulsecare39@gmail.com", 50, 20);
    doc.text(
      "Address: 723 1st Street, SW, Rochester, Minnesota, America 55902",
      50,
      25
    );
    doc.text(
      " Address: BF-3 Phase One Lake View Apartment, Chikkabanwara, Bengaluru, Karnataka, 560090",
      50,
      30
    );

    // Add a Line Break
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 153); // Dark Blue
    doc.line(10, 35, 200, 35); // Draw line

    // First Row: Patient Details and Diagnosis
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 153); // Dark Blue
    doc.text("Patient Details", 10, 50);
    doc.text("Diagnosis/Tests", 110, 50);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black

    // Patient Details
    doc.text(`Patient ID: ${patientDetails.patientId}`, 10, 60);
    doc.text(`Name: ${patientDetails.name}`, 10, 70);
    doc.text(`Mobile: ${patientDetails.mobile}`, 10, 80);
    doc.text(`Sex: ${patientDetails.sex}`, 10, 90);
    doc.text(`Address: ${patientDetails.address}`, 10, 100);
    doc.text(`Email: ${patientDetails.email}`, 10, 110);

    // Diagnosis
    doc.text(patientDetails.diagnosis, 110, 60, { maxWidth: 85 });

    // Add a Line Break
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 153); // Dark Blue
    doc.line(10, 130, 200, 130); // Draw line

    // Second Row: Medicines Table
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 153); // Dark Blue
    doc.text("Medicines", 10, 140);

    // Table headers
    doc.setFontSize(10);
    doc.text("S.No", 10, 150);
    doc.text("Medicine", 25, 150);
    doc.text("Days", 75, 150);
    doc.text("Morning", 95, 150);
    doc.text("Afternoon", 115, 150);
    doc.text("Night", 145, 150);
    doc.text("Doctor Notes", 165, 150);

    // Table contents
    medicines.forEach((med, index) => {
      const yPosition = 160 + index * 10;
      doc.text(`${index + 1}`, 10, yPosition);
      doc.text(med.medicine, 25, yPosition);
      doc.text(med.days, 75, yPosition);
      doc.text(med.morning ? "Yes" : "No", 95, yPosition);
      doc.text(med.afternoon ? "Yes" : "No", 115, yPosition);
      doc.text(med.night ? "Yes" : "No", 145, yPosition);
      doc.text(med.notes, 165, yPosition);
    });

    // Add signature
    doc.addImage(signature, "JPEG", 150, 240, 40, 20); // Position (150, 240), size (40, 20)

    // Footer Section with Contact Info
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 153); // Dark Blue
    doc.line(10, 290, 200, 290); // Footer line
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(
      "Thank you for choosing PulseCare Clinic. Contact us at: pulsecare39@gmail.com",
      10,
      295
    );

    // Get current date and time
    const currentDate = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Generate dynamic filename: patientId + formatted date and time
    const filename = `${patientDetails.patientId} ${month} ${day} ${year} ${formattedHours}:${formattedMinutes} ${ampm}.pdf`;

    // Save the PDF with the dynamic filename
    doc.save(filename);
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg p-8 mt-10 border border-blue-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800 underline">
        Prescription Form
      </h2>

      {/* Form Container */}
      <div className="space-y-6">
        {/* Patient Details Input Fields */}
        {[
          { label: "Patient ID", name: "patientId", type: "text" },
          { label: "Name", name: "name", type: "text" },
          { label: "Mobile", name: "mobile", type: "text" },
          { label: "Sex", name: "sex", type: "text" },
          { label: "Address", name: "address", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Diagnosis/Tests", name: "diagnosis", type: "text" },
          { label: "Treatment Given", name: "treatmentGiven", type: "text" },
        ].map((input) => (
          <div key={input.name}>
            <label className="block text-blue-700 font-semibold mb-2">
              {input.label}
            </label>
            <input
              type={input.type}
              name={input.name}
              placeholder={input.label}
              value={patientDetails[input.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Medicines Table */}
        <div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Medicines</h3>
          {medicines.map((med, index) => (
            <div key={index} className="grid grid-cols-7 gap-2 mb-4">
              <input
                type="text"
                name="medicine"
                placeholder="Medicine"
                value={med.medicine}
                onChange={(e) => handleMedicineChange(index, e)}
                className="col-span-2 px-4 py-2 border border-blue-300 rounded-md"
              />
              <input
                type="number"
                name="days"
                placeholder="Days"
                value={med.days}
                onChange={(e) => handleMedicineChange(index, e)}
                className="px-4 py-2 border border-blue-300 rounded-md"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="morning"
                  checked={med.morning}
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="mr-2"
                />
                Morning
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="afternoon"
                  checked={med.afternoon}
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="mr-2"
                />
                Afternoon
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="night"
                  checked={med.night}
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="mr-2"
                />
                Night
              </label>
              <input
                type="text"
                name="notes"
                placeholder="Doctor Notes"
                value={med.notes}
                onChange={(e) => handleMedicineChange(index, e)}
                className="col-span-2 px-4 py-2 border border-blue-300 rounded-md"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMedicineRow}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Medicine
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={generatePDF}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
