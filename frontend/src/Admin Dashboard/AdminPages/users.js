import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleAddUser = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const role = e.target.role.value;
    const password = e.target.password.value;

    const newUser = { username, role, password };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem("userCredentials", JSON.stringify(updatedUsers));
    alert("User added successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">User Authentication</h2>
      <form onSubmit={handleAddUser} className="flex flex-col space-y-4">
        <input type="text" name="username" placeholder="Username" required className="border p-2 rounded" />
        <select name="role" required className="border p-2 rounded">
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <input type="password" name="password" placeholder="Password" required className="border p-2 rounded" />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">
          Add User
        </button>
      </form>
    </div>
  );
};

export default Users;