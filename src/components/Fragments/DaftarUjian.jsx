import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { config } from "../../configs";
import { format, isWithinInterval } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { parseISO, isBefore } from "date-fns";

const DaftarUjian = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [examDone, setExamDone] = useState({});
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
    const fetchExamDone = async () => {
      try {
        setIsLoading(true);
        if (user) {
          // Lakukan permintaan ke backend untuk memeriksa keberadaan pengguna dengan ID tertentu
          const response = await axios.get(
            `${config.api_host_dev}/api/v1/cms/result/participant/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          // Jika pengguna ditemukan, navigasikan ke /dashboard
          if (response) {
            setExamDone(response.data.data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExamDone();
    fetchExamData();
  }, [user]);
  const handleClickStart = (kd_soal) => {
    navigate(`/quiz/${kd_soal}`);
  };
  const isDisabled = (kode, timeStart, timeEnd) => {
    // Ubah string time menjadi objek Date menggunakan parseISO
    // Ubah string timeStart dan timeEnd menjadi objek Date menggunakan parseISO
    const startTime = parseISO(timeStart);
    const endTime = parseISO(timeEnd);
    // Dapatkan waktu saat ini
    const currentTime = new Date();

    // Cek apakah currentTime berada di antara timeStart dan timeEnd
    const isTimeValid = isWithinInterval(currentTime, {
      start: startTime,
      end: endTime,
    });

    // Cek apakah kode soal sudah dikerjakan dan waktu sudah melebihi waktu saat ini
    return (
      Object.values(examDone)
        .map((obj) => obj.kd_soal)
        .includes(kode) || !isTimeValid
    ); // Membandingkan waktu menggunakan isBefore
  };
  if (isLoading) {
    return <div>Loading...</div>; // Atau spinner loading
  }

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
                data
                  .filter((exam) => exam.active === 1)
                  .map((exam) => (
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
                          disabled={isDisabled(
                            exam.kd_soal,
                            exam.start_time,
                            exam.end_time
                          )} // Perbaikan di sini
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
