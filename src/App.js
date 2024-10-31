import React, { useEffect } from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Log_In from './Components/Log_In/Log_In';
import InstantConsultation from './Components/Instant_Consultation/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm'; // Import Notification component
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Display the Navbar component */}
        
        {/* Display the Notification component on every page */}
        <Notification>
          {/* Set up the Routes for different pages */}
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Log_In />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path="/profile-card" element={<ProfileCard/>} />
            <Route path="/reports" element={<ReportsLayout/>} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;