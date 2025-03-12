import React, { useState, useEffect } from "react";

const Attendance = () => {
  const students = ["Alice", "Bob", "Charlie", "David"];
  const faculty = ["Prof. Smith", "Dr. Johnson", "Mrs. Brown", "Mr. White"];

  const [view, setView] = useState("Students");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today
  const [attendance, setAttendance] = useState({});
  const [facultyAttendance, setFacultyAttendance] = useState({});

  // Load saved attendance data
  useEffect(() => {
    const savedStudentAttendance = JSON.parse(localStorage.getItem("studentAttendance")) || {};
    const savedFacultyAttendance = JSON.parse(localStorage.getItem("facultyAttendance")) || {};
    setAttendance(savedStudentAttendance);
    setFacultyAttendance(savedFacultyAttendance);
  }, []);

  const handleAttendance = (name, status, type) => {
    const updatedAttendance = type === "Students" ? { ...attendance } : { ...facultyAttendance };

    if (!updatedAttendance[date]) updatedAttendance[date] = {};
    updatedAttendance[date][name] = status;

    if (type === "Students") setAttendance(updatedAttendance);
    else setFacultyAttendance(updatedAttendance);
  };

  const saveAttendance = () => {
    localStorage.setItem("studentAttendance", JSON.stringify(attendance));
    localStorage.setItem("facultyAttendance", JSON.stringify(facultyAttendance));
    alert(`Attendance for ${date} saved successfully!`);
  };

  const getMonthlyAttendance = (name, type) => {
    const data = type === "Students" ? attendance : facultyAttendance;
    let presentDays = 0;
    let totalDays = 0;

    Object.keys(data).forEach((recordDate) => {
      if (recordDate.startsWith(date.slice(0, 7))) { // Check for the same month
        totalDays++;
        if (data[recordDate]?.[name] === "Present") {
          presentDays++;
        }
      }
    });

    return totalDays > 0 ?` ${presentDays} / ${totalDays}` : "N/A";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{view} Attendance</h2>
        <select className="p-2 border rounded" value={view} onChange={(e) => setView(e.target.value)}>
          <option value="Students">Student Attendance</option>
          <option value="Faculty">Faculty Attendance</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="font-bold">Select Date:</label>
        <input type="date" className="p-2 border rounded ml-2" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {(view === "Students" ? students : faculty).map((person) => (
            <tr key={person} className="border hover:bg-gray-50">
              <td className="border p-2 font-semibold">{person}</td>
              <td className="border p-2 text-center">{date}</td>
              <td className="border p-2 text-center font-bold">
                {view === "Students"
                  ? attendance[date]?.[person] || "Not Marked"
                  : facultyAttendance[date]?.[person] || "Not Marked"}
              </td>
              <td className="border p-2 text-center">
                <button onClick={() => handleAttendance(person, "Present", view)} className="px-4 py-1 bg-green-500 text-white rounded mr-2">
                  Present
                </button>
                <button onClick={() => handleAttendance(person, "Absent", view)} className="px-4 py-1 bg-red-500 text-white rounded">
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={saveAttendance} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
        Save Attendance
      </button>

      <h3 className="text-xl font-bold mt-6">Monthly Attendance Summary</h3>
      <table className="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Total Present / Days Marked</th>
          </tr>
        </thead>
        <tbody>
          {(view === "Students" ? students : faculty).map((person) => (
            <tr key={person} className="border hover:bg-gray-50">
              <td className="border p-2 font-semibold">{person}</td>
              <td className="border p-2 text-center">{getMonthlyAttendance(person, view)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;