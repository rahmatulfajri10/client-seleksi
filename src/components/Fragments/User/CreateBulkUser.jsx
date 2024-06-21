import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../../configs";
import { FileInput, Label } from "flowbite-react";

const CreateBulkUser = () => {
  const [file, setFile] = useState(null);

  // Handler untuk menangkap file yang diunggah
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const userResponse = await axios.post(
        `${config.api_host_dev}/api/v1/cms/user/bulkinsert-participant`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Users created successfully");
    } catch (error) {
      console.error("There was an error creating the user!", error);
      alert("Gagal membuat user, cobalah dengan mengganti username!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[850px]">
        <h1 className="text-2xl font-bold mb-6">Create Many User</h1>
        <h5 className=" font-bold mb-1">Contoh Format</h5>

        <a
          href="public\contoh-account-participant.csv"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
          download
        >
          Download File
        </a>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div id="fileUpload" className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              id="file"
              onChange={handleFileChange}
              helperText="Mohon sesuaikan format file dan format data yang akan diupload dengan contoh format diatas"
            />
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

export default CreateBulkUser;
