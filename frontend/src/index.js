import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Login from "./Login";

// Student Features
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Assignments from "./Pages/Assignment";
import Timetable from "./Pages/Timetable";
import Exam from "./Pages/Exam";
import Fees from "./Pages/Fees";
import Library from "./Pages/Library";
import Announcements from "./Pages/Announcements";

// Faculty Features
import FacultyDashboard from "./Faculty Dashboard/Pages/FacultyDashboard";
import FacultyTimetable from "./Faculty Dashboard/Pages/FacultyTimetable";
import FacultyAttendance from "./Faculty Dashboard/Pages/FacultyAttendance";
import FacultyAnnouncements from "./Faculty Dashboard/Pages/FacultyAnnouncements";
import FacultySidebar from "./Faculty Dashboard/Components/Sidebar";
import FacultyNavbar from "./Faculty Dashboard/Components/Navbar";
import AdminNavbar from"./Admin Dashboard/AdminComponents/AdminNavbar";

// ✅ Function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists
};

// ✅ Function to get user role (student or faculty)
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    return payload.role; // Return role from token
  } catch (err) {
    return null;
  }
};

// ✅ Protected Route Component
const PrivateRoute = ({ element, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }
  
  const userRole = getUserRole();
  if (userRole !== role) {
    return <Navigate to="/" />; // Redirect if role doesn't match
  }
  
  return element; // Allow access if authenticated and role matches
};

const App = () => {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const role = getUserRole();
    if (role) {
      setUserType(role);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ Login Route */}
        <Route path="/" element={<Login />} />

        {/* ✅ Student Routes (Protected) */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} role="student" />} />
        <Route path="/attendance" element={<PrivateRoute element={<Attendance />} role="student" />} />
        <Route path="/assignments" element={<PrivateRoute element={<Assignments />} role="student" />} />
        <Route path="/timetable" element={<PrivateRoute element={<Timetable />} role="student" />} />
        <Route path="/exams" element={<PrivateRoute element={<Exam />} role="student" />} />
        <Route path="/fees" element={<PrivateRoute element={<Fees />} role="student" />} />
        <Route path="/library" element={<PrivateRoute element={<Library />} role="student" />} />
        <Route path="/announcements" element={<PrivateRoute element={<Announcements />} role="student" />} />

        {/* ✅ Faculty Routes (Protected) */}
        <Route path="/faculty-dashboard" element={<PrivateRoute element={<FacultyDashboard />} role="faculty" />} />
        <Route path="/faculty-timetable" element={<PrivateRoute element={<FacultyTimetable />} role="faculty" />} />
        <Route path="/faculty-attendance" element={<PrivateRoute element={<FacultyAttendance />} role="faculty" />} />
        <Route path="/faculty-announcements" element={<PrivateRoute element={<FacultyAnnouncements />} role="faculty" />} />


        
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
