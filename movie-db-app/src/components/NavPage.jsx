import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { FaUser } from "react-icons/fa"; // Profile icon
// import { BiSearch } from "react-icons/bi"; // Search icon

const NavPage = () => {
  const location = useLocation(); // Get the current route
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen w-60 bg-black text-white fixed top-0 left-0 flex flex-col p-6">
      {/* Logo */}
      <h1 className="text-2xl font-bold mt-20 text-purple-500 mb-8">FilmSphere</h1>

      {/* Navigation Links */}
      <nav className="space-y-20 font-semibold">
        {[
          { name: "Home", path: "/" },
          { name: "Discover", path: "/discover" },
          { name: "Movies", path: "/movies" },
          { name: "TV", path: "/tv" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-2 px-4 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}

        {/* Profile Button */}
        {/* <Link
          to="/profile"
          className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition ${
            location.pathname === "/profile"
              ? "bg-purple-600 text-white"
              : "hover:bg-gray-800"
          }`}
        >
          <FaUser />
          <span>Profile</span>
        </Link> */}
      </nav>

      {/* Search Bar (Top Right) */}
      {/* <div className="absolute top-5 right-5 flex items-center bg-gray-800 rounded-full px-3 py-1">
        <BiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-white pl-2"
        />
      </div> */}
    </div>
  );
};

export default NavPage;