import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavPage = () => {
  const location = useLocation(); // Get the current route
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen w-80 bg-black text-white fixed top-0 left-0 flex flex-col p-6">
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
      </nav>
    </div>
  );
};

export default NavPage;