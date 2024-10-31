import React, { useState, useEffect } from 'react';
import './ReportsLayout.css'

const ReportsLayout = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const mergeAppointments = (appointments1, appointments2) => {
    const merged = [...appointments1];

    appointments2.forEach(appointment2 => {
      const existing = merged.find(appointment1 => appointment1.doctor.name === appointment2.doctor.name);
      if (existing) {
        // Ensure existing.appointments is an array before spreading
        existing.appointments = existing.appointments || []; // Initialize if undefined
        existing.appointments = [...existing.appointments, ...appointment2.appointments || []]; // Add appointments
      } else {
        // If it doesn't exist, we add the new appointment along with its appointments
        merged.push({
          ...appointment2,
          appointments: appointment2.appointments || [] // Ensure appointments is an array
        });
      }
    });

    return merged;
  };

  const loadConsultationsFromStorage = () => {
    const storedAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
    const storedAppointmentsIC = JSON.parse(localStorage.getItem('allAppointmentsIC')) || [];
    const storedUsername = sessionStorage.getItem('email');

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);

      const userAppointments = storedAppointments.filter(appointment => appointment.user === storedUsername);
      const userAppointmentsIC = storedAppointmentsIC.filter(appointment => appointment.user === storedUsername);

      // Transforming the appointments for display
      const transformedAppointments = userAppointments.map(appointment => ({
        doctor: {
          name: appointment.doctor.name,
          speciality: appointment.doctor.speciality,
        },
        appointments: appointment.appointments || [] // Ensure appointments is an array
      }));

      const transformedAppointmentsIC = userAppointmentsIC.map(appointment => ({
        doctor: {
          name: appointment.doctor.name,
          speciality: appointment.doctor.speciality,
        },
        appointments: appointment.appointments || [] // Ensure appointments is an array
      }));

      const mergedConsultations = mergeAppointments(transformedAppointments, transformedAppointmentsIC);

      console.log("Merged Consultations:", mergedConsultations); // Debugging log
      setConsultations(mergedConsultations);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    loadConsultationsFromStorage();

    const handleStorageChange = () => {
      loadConsultationsFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleViewReport = (consultation) => {
    const reportUrl = `/patient_report.pdf`; // Construct URL based on doctor's name
    window.open(reportUrl, '_blank'); // Open the PDF in a new tab
  };

  const handleDownloadReport = (consultation) => {
    const reportUrl = `/patient_report.pdf`; // Construct URL based on doctor's name
    const link = document.createElement('a');
    link.href = reportUrl; // Set the URL to download
    link.download = `patient_report.pdf`; // Name of the downloaded file
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up the DOM
  };


  return (
    <>
      {!isLoggedIn ? (
        <div>Please log in to view your consultations.</div>
      ) : (
        <div className="report-form-container">
          <h2>Reports</h2>
          <table className="consultation-table">
            <thead>
              <tr>
                <th>Consultation Number</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>View Report</th>
                <th>Download Report</th>
              </tr>
            </thead>
            <tbody>
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan="5">No consultations found.</td>
                </tr>
              ) : (
                consultations.map((consultation, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{consultation.doctor.name}</td>
                    <td>{consultation.doctor.speciality}</td>
                    <td>
                      <button onClick={() => handleViewReport(consultation)} className="report-button">
                        View Report
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDownloadReport(consultation)} className="report-button">
                        Download Report
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ReportsLayout;
