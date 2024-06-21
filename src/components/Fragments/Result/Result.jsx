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

const ResultFragment = () => {
  const [resultData, setResultData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/result`,
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-[90%] m-10 mx-auto">
        <div className="flex justify-center mb-5">
          <h1 className="text-2xl font-bold">Hasil Ujian</h1>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Nama</Table.HeadCell>
              <Table.HeadCell>Nomor Pendaftaran</Table.HeadCell>
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
