import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavPage = () => {
  const location = useLocation(); // Get the current route
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen w-80 bg-black text-white fixed top-0 left-0 flex flex-col p-6">
      {/* Logo */}
      <h1 className="text-4xl font-extrabold  text-pink-600 mb-8">FILMSPHERE</h1>

      {/* Navigation Links */}
      <nav className="space-y-30 mt-20 font-semibold items-center">
        {[
          { name: "Home", path: "/" },
          { name: "Discover", path: "/discover" },
          { name: "Favorites", path: "/favorites" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-2 px-25 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-pink-600 text-white"
                : "hover:bg-gray-800 w-full"
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