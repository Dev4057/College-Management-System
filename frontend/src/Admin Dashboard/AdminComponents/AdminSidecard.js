import React from "react";

const Sidecard = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0F2027] to-[#2C5364] p-6 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    ><h1 className="text-red-500 font-bold">Tailwind Test</h1>

      {/* Close Button (Left Arrow) */}
      <button 
        onClick={toggleSidebar}  // This now properly closes the sidebar
        className="absolute top-5 right-5 text-white text-2xl focus:outline-none"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li className="hover:text-gray-300 cursor-pointer">
          <i className="fa-solid fa-chart-line mr-2"></i> Overview
        </li>
        <li className="hover:text-gray-300 cursor-pointer">
          <i className="fa-solid fa-user-graduate mr-2"></i> Students
        </li>
        <li className="hover:text-gray-300 cursor-pointer">
          <i className="fa-solid fa-calendar-check mr-2"></i> Attendance
        </li>
        <li className="hover:text-gray-300 cursor-pointer">
          <i className="fa-solid fa-file-invoice-dollar mr-2"></i> Fees
        </li>
      </ul>
    </div>
  );
};

export default Sidecard;