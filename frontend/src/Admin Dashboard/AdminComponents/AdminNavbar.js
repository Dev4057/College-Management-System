import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <button onClick={toggleSidebar} className="text-xl">☰</button>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;