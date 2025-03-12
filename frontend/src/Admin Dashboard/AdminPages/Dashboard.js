import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidecard";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage student and teacher records, attendance, assignments, and announcements.</p>

        {/* Admin Functionality Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* User Authentication Section */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold">User Authentication</h2>
            <p className="text-gray-600">Manage login and user authentication.</p>
            <button 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => navigate("/users")}
            >
              Manage Users
            </button>
          </div>
          
          {/* Attendance Tracking */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold">Attendance Tracking</h2>
            <p className="text-gray-600">Monitor student and teacher attendance.</p>
            <button 
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => navigate("/attendance")}
            >
              View Attendance
            </button>
          </div>
          
          {/* Assignment & Grade Tracking */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold">Assignments & Grades</h2>
            <p className="text-gray-600">Track assignments and grades.</p>
            <button 
              className="mt-2 px-4 py-2 bg-purple-500 text-white rounded"
              onClick={() => navigate("/assignments")}
            >
              Manage Assignments
            </button>
          </div>
          
          {/* Announcements */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <p className="text-gray-600">Post important notices and updates.</p>
            <button 
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={() => navigate("/announcements")}
            >
              Post Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;