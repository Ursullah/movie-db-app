import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavPage from "./components/NavPage";
import DisplayMovie from "./components/DisplayMovie";
import Discover from "./components/Discover";
import MovieDetails from "./components/MovieDetails";

const App = () => {
    return (
        <Router>
            <div className="flex bg-black">
                {/* Sidebar Navigation */}
                <NavPage />

                {/* Main Content Area */}
                <div className="ml-80 p-4 flex-1 ">
                    <Routes>
                        <Route path="/" element={<DisplayMovie />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/movies/:id" element={<MovieDetails />} />
                        <Route path="/tv" element={<h1 className='text-2xl text-white text-center'>Your favorites</h1>} />
                    </Routes>
                 </div>
            </div>
        </Router>
    );
};

export default App;
