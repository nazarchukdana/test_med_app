import React, { useEffect } from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Log_In from './Components/Log_In/Log_In';
import InstantConsultation from './Components/Instant_Consultation/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';

function App() {
    const location = useLocation();
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <Navbar/>
          {/* Display the Navbar component */}
          {/*(location.pathname !== "/signup" && location.pathname !== "/login") && <Navbar />*/}
          {/* Set up the Routes for different pages */}
          <Routes>
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Log_In />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/find-doctor" element={<FindDoctorSearch/>}/>
            {/* Define individual Route components for different pages */}
          </Routes>
        
    </div>
  );
}
function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;
