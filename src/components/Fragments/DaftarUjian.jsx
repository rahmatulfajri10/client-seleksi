import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { config } from "../../configs";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const DaftarUjian = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/exam`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Jika pengguna ditemukan, navigasikan ke /dashboard
        if (response) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchExamData();
  }, []);
  const handleClickStart = (kd_soal) => {
    navigate(`/quiz/${kd_soal}`);
  };
  return (
    <>
      <div className=" w-3/4 my-10 mx-auto">
        <div className="flex justify-center mb-5">
          <h1 className="text-2xl font-bold">Daftar Ujian</h1>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Soal</Table.HeadCell>
              <Table.HeadCell>Kode Soal</Table.HeadCell>
              <Table.HeadCell>Waktu Mulai</Table.HeadCell>
              <Table.HeadCell>Waktu Selesai</Table.HeadCell>
              <Table.HeadCell>Durasi Ujian</Table.HeadCell>
              <Table.HeadCell>Mulai Ujian</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array.isArray(data) ? (
                data.map((exam) => (
                  <Table.Row
                    key={exam.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {exam.nama}
                    </Table.Cell>
                    <Table.Cell>{exam.kd_soal}</Table.Cell>
                    <Table.Cell>
                      {format(
                        new Date(exam.start_time),
                        "dd MMMM yyyy, HH:mm "
                      )}{" "}
                      WIB
                    </Table.Cell>
                    <Table.Cell>
                      {format(new Date(exam.end_time), "dd MMMM yyyy, HH:mm")}{" "}
                      WIB
                    </Table.Cell>
                    <Table.Cell>{exam.duration} Menit</Table.Cell>
                    <Table.Cell>
                      <Button
                        type="submit"
                        onClick={() => handleClickStart(exam.kd_soal)}
                      >
                        Mulai
                      </Button>
                    </Table.Cell>
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

export default DaftarUjian;
