import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../../configs";
import { FileInput, Label } from "flowbite-react";

const FormUjian = () => {
  const [kode_soal, setKodeSoal] = useState("");
  const [nama_soal, setNamaSoal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [start_date, setStartDate] = useState();
  const [end_date, setEndDate] = useState();
  const [max_score, setMaxScore] = useState("");
  const [pass_score, setPassScore] = useState("");
  const [durasi, setDurasi] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {}, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const startDateUTC = new Date(start_date).toISOString();
    const formattedStartDate = startDateUTC.slice(0, -5) + "Z";
    const endDateUTC = new Date(end_date).toISOString();
    const formattedEndDate = endDateUTC.slice(0, -5) + "Z";

    try {
      const token = localStorage.getItem("token");

      const examResponse = await axios.post(
        `${config.api_host_dev}/api/v1/cms/exam`,
        {
          kode_soal: kode_soal,
          nama: nama_soal,
          description: deskripsi,
          start_datetime: formattedStartDate,
          end_datetime: formattedEndDate,
          max_score: max_score,
          min_pass_score: pass_score,
          duration: durasi,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const examId = examResponse.data.data.kd_soal;

      await axios.post(
        `${config.api_host_dev}/api/v1/cms/soal/${examId}`,
        {
          soal: file,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Exam created successfully");
    } catch (error) {
      console.error("There was an error creating the user!", error);
      alert("Gagal membuat user, cobalah dengan mengganti username!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[850px]">
        <h1 className="text-2xl font-bold mb-6">Tambah Ujian</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">Kode Soal:</label>
            <input
              type="text"
              value={kode_soal}
              onChange={(e) => setKodeSoal(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">Nama Soal:</label>
            <input
              type="text"
              value={nama_soal}
              onChange={(e) => setNamaSoal(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">Deskripsi:</label>
            <input
              type="text"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">
              Tanggal dan Waktu Mulai:
            </label>
            <input
              type="datetime-local"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">
              Tanggal dan Waktu Selesai:
            </label>
            <input
              type="datetime-local"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">
              Skor Maksimal:
            </label>
            <input
              type="number"
              value={max_score}
              onChange={(e) => setMaxScore(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">
              Skor Lulus Minimal:
            </label>
            <input
              type="number"
              value={pass_score}
              onChange={(e) => setPassScore(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-900">
              Durasi (dalam Menit):
            </label>
            <input
              type="number"
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <a
            href="public\contohsoal.csv"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
            download
          >
            Download File
          </a>
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
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormUjian;
