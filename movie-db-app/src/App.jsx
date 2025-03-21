import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayMovie from "./components/DisplayMovie";
import NavPage from "./components/NavPage"; // ✅ Import NavPage

function App() {
  return (
    <Router>
      <div className="flex">
        <NavPage /> {/* ✅ Now using the imported NavPage */}
        </div>


      <div className="ml-60 flex-1 p-6 text-white bg-black min-h-screen">
      <Routes>
        <Route path="/discover" element={<h1 className="text-center mt-10">Discover</h1>} />
        <Route path="/movies" element={<h1 className="text-center mt-10">Movies</h1>} />
        <Route path="/tv" element={<h1 className="text-center mt-10">TV</h1>} />
        <Route path="/profile" element={<h1 className="text-center mt-10">Profile</h1>} />
      </Routes>

      {/* Display Movie Component */}
      <DisplayMovie />
      </div>
    </Router>
  );
}

export default App;