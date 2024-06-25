import axios from "axios";
import { config } from "../../../configs";
import {
  Button,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
  Dropdown,
} from "flowbite-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ResultFragment = () => {
  const [resultData, setResultData] = useState({});
  const [examData, setExamData] = useState({});
  const [kodeSoal, setKodeSoal] = useState("");

  const fetchExam = async () => {
    try {
      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/exam`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        setExamData(response.data.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/result/${kodeSoal}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        setResultData(response.data.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const handleSelectChange = (event) => {
    setKodeSoal(event.target.value);
  };
  const downloadFile = () => {
    // Langkah 1: Periksa apakah resultData2 adalah array
    if (!Array.isArray(resultData) || resultData.length === 0) {
      alert("No data to download or data is not in an array format");
      return;
    }

    // Langkah 2: Persiapkan dan konversi data
    const data = resultData.map((result) => ({
      Nama: result.participant.nama,
      "Nomor Pendaftaran": result.participant.no_pendaftaran,
      "Nama Soal": result.kode_answer.nama,
      "Kode Soal": result.kd_soal,
      Nilai: result.score,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    // Langkah 3: Buat file Excel dan konversi ke Blob
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Langkah 4: Buat URL dari Blob
    const url = URL.createObjectURL(blob);

    // Langkah 5: Buat elemen <a> untuk download
    const link = document.createElement("a");
    link.href = url;
    link.download = "ResultData.xlsx"; // Nama file yang di-download

    document.body.appendChild(link); // Tambahkan link ke body (diperlukan untuk Firefox)
    link.click(); // Trigger klik untuk download
    document.body.removeChild(link); // Bersihkan link dari body

    URL.revokeObjectURL(url); // Bersihkan URL Blob
  };
  useEffect(() => {
    fetchExam();
    fetchData();
  }, [kodeSoal]);

  return (
    <>
      <div className="w-[90%] m-10 mx-auto">
        <div className="flex justify-center mb-5">
          <h1 className="text-2xl font-bold">Hasil Ujian</h1>
        </div>
        <div className="justify-end mb-5 ">
          <Label>Pilih Ujian</Label>
          <Select id="exam" required onChange={handleSelectChange}>
            {Array.isArray(examData) &&
              examData.map((exam) => (
                <option key={exam.id} value={exam.kd_soal}>
                  {exam.nama}
                </option>
              ))}
          </Select>
        </div>
        <div className="mb-2">
          <Button onClick={downloadFile}>Export</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Nama</Table.HeadCell>
              <Table.HeadCell>Nomor Pendaftaran</Table.HeadCell>
              <Table.HeadCell>Nama Soal</Table.HeadCell>
              <Table.HeadCell>Kode Soal</Table.HeadCell>
              <Table.HeadCell>Nilai</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array.isArray(resultData) ? (
                resultData.map((result) => (
                  <Table.Row
                    key={result.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{result.participant.nama}</Table.Cell>
                    <Table.Cell>{result.participant.no_pendaftaran}</Table.Cell>
                    <Table.Cell>{result.kode_answer.nama}</Table.Cell>
                    <Table.Cell>{result.kd_soal}</Table.Cell>
                    <Table.Cell>{result.score}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={7} className="text-center">
                    Tidak ada data
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ResultFragment;
