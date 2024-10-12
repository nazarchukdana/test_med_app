import React, { useEffect } from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_page from './Components/Landing_Page/Landing_Page';

function App() {
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>
          <Landing_Page/>
          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
