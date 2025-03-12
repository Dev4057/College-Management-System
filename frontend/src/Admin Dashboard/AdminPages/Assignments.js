import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Assignments = () => {
  const students = ["Alice", "Bob", "Charlie", "David"];
  const subjects = ["English", "Science", "Maths"];
  
  const [marks, setMarks] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Calculate Grade
  const calculateGrade = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    if (score >= 50) return "E";
    return "F";
  };

  // Update Marks
  const handleMarksChange = (student, subject, score) => {
    const newMarks = { ...marks, [student]: { ...(marks[student] || {}), [subject]: score } };
    setMarks(newMarks);
  };

  // Save Grades
  const saveGrades = () => {
    localStorage.setItem("grades", JSON.stringify(marks));
    alert("Grades saved successfully!");
  };

  // Get Performance Data for Graph
  const getPerformanceData = (student) => {
    const scores = subjects.map((subject) => marks[student]?.[subject] || 0);
    return {
      labels: subjects,
      datasets: [
        {
          label: "Marks",
          data: scores,
          backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
        },
      ],
    };
  };

  // Provide Subject-wise Feedback
  const getFeedback = (student) => {
    if (!marks[student]) return "No data available.";
    return subjects
      .map((subject) => {
        const score = marks[student][subject] || 0;
        if (score < 50) return `⚠ Needs improvement in ${subject}`;
        if (score < 70) return `✔ Can improve in ${subject}`;
        return `✅ Doing well in ${subject}`;
      })
      .join("\n");
  };

  return (
    <div className="flex flex-wrap p-6">
      {/* Left Side - Table */}
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Assessments & Grades</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student</th>
              {subjects.map((subject) => (
                <th key={subject} className="border p-2">{subject}</th>
              ))}
              <th className="border p-2">Total Average Marks</th>
              <th className="border p-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const totalMarks = subjects.reduce((sum, subject) => sum + (marks[student]?.[subject] || 0), 0);
              const averageMarks = subjects.length > 0 ? totalMarks / subjects.length : 0;
              const finalGrade = calculateGrade(averageMarks);

              return (
                <tr key={student} className="border hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStudent(student)}>
                  <td className="border p-2 font-semibold">{student}</td>
                  {subjects.map((subject) => (
                    <td key={subject} className="border p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student]?.[subject] || ""}
                        onChange={(e) => handleMarksChange(student, subject, parseInt(e.target.value))}
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                  ))}
                  <td className="border p-2 text-center font-medium">{averageMarks.toFixed(2)}</td>
                  <td className="border p-2 font-bold text-center">{finalGrade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={saveGrades} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">Save Grades</button>
        
        {/* Grading System Legend */}
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="text-lg font-semibold">Grading System</h3>
          <p><strong>A:</strong> 90-100 (Excellent)</p>
          <p><strong>B:</strong> 80-89 (Very Good)</p>
          <p><strong>C:</strong> 70-79 (Good)</p>
          <p><strong>D:</strong> 60-69 (Satisfactory)</p>
          <p><strong>E:</strong> 50-59 (Needs Improvement)</p>
          <p><strong>F:</strong> Below 50 (Fail)</p>
        </div>
      </div>

      {/* Right Side - Bar Graph */}
      {selectedStudent && (
        <div className="w-1/3 p-4">
          <h2 className="text-lg font-semibold mb-2">{selectedStudent}'s Performance</h2>
          <div className="h-48"> {/* Adjusted Graph Height */}
            <Bar data={getPerformanceData(selectedStudent)} options={{ 
              responsive: true, 
              maintainAspectRatio: false, 
              plugins: { legend: { display: false } }, 
              scales: { y: { max: 100, min: 0, ticks: { stepSize: 20 } } }
            }} />
          </div>
          <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold">Feedback</h3>
            <p className="text-sm">{getFeedback(selectedStudent)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;