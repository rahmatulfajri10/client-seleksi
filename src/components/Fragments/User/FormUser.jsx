import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../../configs";

const FormUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/role`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response) {
          setRoles(response.data.data);
        }
      } catch (error) {
        console.error("There was an error fetching the roles!", error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if password and confirmPassword are the same
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const userResponse = await axios.post(
        `${config.api_host_dev}/api/v1/cms/user`,
        {
          username,
          password,
          confirmPassword,
          ur_role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userId = userResponse.data.data.id;

      await axios.post(
        `${config.api_host_dev}/api/v1/cms/user/add-role/${userId}`,
        {
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User created successfully");
    } catch (error) {
      console.error("There was an error creating the user!", error);
      alert("Gagal membuat user, cobalah dengan mengganti username!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[850px]">
        <h1 className="text-2xl font-bold mb-6">Create User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              {Array.isArray(roles) &&
                roles.map((role) => (
                  <option key={role.id} value={role.ur_role}>
                    {role.ur_role}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormUser;
