import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavPage = () => {
    const location = useLocation(); // Get the current route

    return (
        <div className="h-screen w-60 bg-black text-white fixed top-0 left-0 flex flex-col p-6">
            {/* Logo */}
            <h1 className="text-2xl font-bold mt-10 text-purple-500 mb-8">FilmSphere</h1>

            {/* Navigation Links */}
            <nav className="space-y-6 font-semibold">
                <Link 
                    to="/" 
                    className={`block py-2 px-4 rounded-lg transition ${
                        location.pathname === "/" ? "bg-purple-700 text-white" : "hover:bg-gray-800"
                    }`}
                >
                    Home
                </Link>
                <Link 
                    to="/discover" 
                    className={`block py-2 px-4 rounded-lg transition ${
                        location.pathname === "/discover" ? "bg-purple-700 text-white" : "hover:bg-gray-800"
                    }`}
                >
                    Discover
                </Link>
                <Link 
                    to="/movies" 
                    className={`block py-2 px-4 rounded-lg transition ${
                        location.pathname === "/movies" ? "bg-purple-700 text-white" : "hover:bg-gray-800"
                    }`}
                >
                    Movies
                </Link>
                <Link 
                    to="/tv" 
                    className={`block py-2 px-4 rounded-lg transition ${
                        location.pathname === "/tv" ? "bg-purple-700 text-white" : "hover:bg-gray-800"
                    }`}
                >
                    TV
                </Link>
            </nav>
        </div>
    );
};

export default NavPage;
