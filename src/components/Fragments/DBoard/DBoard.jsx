import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../../configs";
import { Card } from "flowbite-react";

const DBoard = () => {
  const [countUsers, setCountUsers] = useState(0);
  const [countExams, setCountExams] = useState(0);
  const [countResults, setCountResults] = useState(0);
  const [countParticipants, setCountParticipants] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/user/count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response) {
          setCountUsers(response.data.data);
        }
      } catch (error) {
        console.error("There was an error fetching the roles!", error);
      }
    };
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/exam/count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response) {
          setCountExams(response.data.data);
        }
      } catch (error) {
        console.error("There was an error fetching the roles!", error);
      }
    };
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/result/count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response) {
          setCountResults(response.data.data);
        }
      } catch (error) {
        console.error("There was an error fetching the roles!", error);
      }
    };
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/participant/count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response) {
          setCountParticipants(response.data.data);
        }
      } catch (error) {
        console.error("There was an error fetching the roles!", error);
      }
    };

    fetchUsers();
    fetchExams();
    fetchResults();
    fetchParticipants();
  }, []);

  return (
    <div className="flex justify-center  min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[850px]">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <Card
            href="#"
            className="max-w-60 bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Users
            </h5>
            <h2 className="text-2xl text-end font-normal text-gray-700 dark:text-gray-400">
              {countUsers}
            </h2>
          </Card>
          <Card
            href="#"
            className="max-w-60 bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Participants
            </h5>
            <h2 className="text-2xl text-end font-normal text-gray-700 dark:text-gray-400">
              {countParticipants}
            </h2>
          </Card>
          <Card
            href="#"
            className="max-w-60 bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Exams
            </h5>
            <h2 className="text-2xl text-end font-normal text-gray-700 dark:text-gray-400">
              {countExams}
            </h2>
          </Card>
          <Card
            href="#"
            className="max-w-60 bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Result
            </h5>
            <h2 className="text-2xl text-end font-normal text-gray-700 dark:text-gray-400">
              {countResults}
            </h2>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DBoard;
