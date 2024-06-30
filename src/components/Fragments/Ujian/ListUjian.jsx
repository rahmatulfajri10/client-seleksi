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
  Pagination,
} from "flowbite-react";
import { useEffect, useState } from "react";

const ListUjianFragment = () => {
  const [examData, setExamData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [selectedExamId, setSelectedExamId] = useState(null);
  const [kode_soal, setKodeSoal] = useState("");
  const [nama_soal, setNamaSoal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [start_date, setStartDate] = useState();
  const [end_date, setEndDate] = useState();
  const [max_score, setMaxScore] = useState("");
  const [pass_score, setPassScore] = useState("");
  const [durasi, setDurasi] = useState("");

  const fetchData = async () => {
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
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${config.api_host_dev}/api/v1/cms/delete-exam/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ujian berhasil dihapus");
      fetchData();
    } catch (error) {
      console.error("There was an error deleting the ujian!", error);
      alert("Gagal menghapus ujian");
    }
  };
  const formatDateFrontend = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };
  const formatDateBackend = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const handleAdd = (id) => {
    const selectedExam = examData.find((exam) => exam.id === id);
    if (selectedExam) {
      setNamaSoal(selectedExam.nama);
      setKodeSoal(selectedExam.kd_soal);
      setDeskripsi(selectedExam.desc);
      setStartDate(formatDateFrontend(selectedExam.start_time));
      setEndDate(formatDateFrontend(selectedExam.end_time));
      setMaxScore(selectedExam.max_score);
      setPassScore(selectedExam.min_pass_score);
      setSelectedExamId(selectedExam.id);
      setDurasi(selectedExam.duration);

      setOpenModal(true);
    }
  };
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${config.api_host_dev}/api/v1/cms/exam/update/${selectedExamId}`,
        {
          kd_soal: kode_soal,
          nama: nama_soal,
          desc: deskripsi,
          start_time: formatDateBackend(start_date),
          end_time: formatDateBackend(end_date),
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
      alert("Exam status updated successfully");

      fetchData();

      setOpenModal(false);
    } catch (error) {
      console.error("Error updating Exam:", error);
    }
  };

  const handleStatusActive = async (kd_soal) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${config.api_host_dev}/api/v1/cms/exam/status/${kd_soal}`,
        {
          active: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User status updated successfully");

      fetchData();
    } catch (error) {
      console.error("There was an error update the exam!", error);
    }
  };
  const handleStatusDeActive = async (kd_soal) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${config.api_host_dev}/api/v1/cms/exam/status/${kd_soal}`,
        {
          active: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Exam status updated successfully");

      fetchData();
    } catch (error) {
      console.error("There was an error update the user!", error);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setKodeSoal("");
    setNamaSoal("");
    setDeskripsi("");
    setStartDate("");
    setEndDate("");
    setMaxScore("");
    setPassScore("");
    setDurasi("");
    setFile(null);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState(0);

  function onPageChange(newPage) {
    // Pseudocode
    // 1. Periksa apakah newPage valid dan tidak melebihi totalPages
    if (newPage > 0 && newPage <= totalPages) {
      // 2. Perbarui state currentPage dengan newPage
      setCurrentPage(newPage);
      // 3. Opsional: Muat data untuk halaman baru jika diperlukan
      loadDataForPage(newPage);
    }
  }
  useEffect(() => {
    if (Array.isArray(examData) && examData.length > 0) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      // Correctly calculate and set the current items to be displayed
      setCurrentItems(examData.slice(indexOfFirstItem, indexOfLastItem));
      // Use a separate state for currentItems if needed, or directly use currentItems within this useEffect
      setTotalPages(Math.ceil(examData.length / itemsPerPage));
    }
  }, [examData, currentPage, itemsPerPage]);

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Ujian
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Nama Soal" value="Nama Soal" />
              </div>
              <TextInput
                id="nama"
                value={nama_soal}
                onChange={(e) => setNamaSoal(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Kode Soal" value="Kode Soal" />
              </div>
              <TextInput
                id="kode"
                value={kode_soal}
                onChange={(e) => setKodeSoal(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Deskripsi" value="Deskripsi" />
              </div>
              <TextInput
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Tanggal Mulai" value="Tanggal Mulai" />
              </div>
              <TextInput
                type="datetime-local"
                id="start_date"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Tanggal Selesai" value="Tanggal Selesai" />
              </div>
              <TextInput
                type="datetime-local"
                id="end_date"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Skor Maksimal" value="Skor Maksimal" />
              </div>
              <TextInput
                type="number"
                id="max_score"
                value={max_score}
                onChange={(e) => setMaxScore(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Skor Lulus Minimal"
                  value="Skor Lulus Minimal"
                />
              </div>
              <TextInput
                type="number"
                id="pass_score"
                value={pass_score}
                onChange={(e) => setPassScore(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Durasi" value="Durasi" />
              </div>
              <TextInput
                type="number"
                id="durasi"
                value={durasi}
                onChange={(e) => setDurasi(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="w-[90%] m-10 mx-auto">
        <div className="flex justify-center mb-5">
          <h1 className="text-2xl font-bold">Manajemen Ujian</h1>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Nama</Table.HeadCell>
              <Table.HeadCell>Kode Soal</Table.HeadCell>
              <Table.HeadCell>Deskripsi</Table.HeadCell>
              <Table.HeadCell>Mulai</Table.HeadCell>
              <Table.HeadCell>Selesai</Table.HeadCell>
              <Table.HeadCell>Durasi</Table.HeadCell>
              <Table.HeadCell>Skor Maksimal</Table.HeadCell>
              <Table.HeadCell>Skor Lulus Minimal</Table.HeadCell>
              <Table.HeadCell className="">
                <span className="">Edit Status</span>
              </Table.HeadCell>
              <Table.HeadCell className="flex justify-center items-center">
                <span className="">Aksi</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((exam, index) => (
                  <Table.Row
                    key={exam.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>
                      {exam.active === 1 ? "Aktif" : "Tidak Aktif"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {exam.nama}
                    </Table.Cell>
                    <Table.Cell>{exam.kd_soal}</Table.Cell>
                    <Table.Cell>{exam.desc}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {(() => {
                        const date = new Date(exam.start_time);
                        const dateString = date.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        });
                        const timeString = date.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                        return (
                          <>
                            <div>{dateString}</div>
                            <div>{timeString} WIB</div>
                          </>
                        );
                      })()}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {(() => {
                        const date = new Date(exam.end_time);
                        const dateString = date.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        });
                        const timeString = date.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                        return (
                          <>
                            <div>{dateString}</div>
                            <div>{timeString} WIB</div>
                          </>
                        );
                      })()}
                    </Table.Cell>
                    <Table.Cell>{exam.duration} Menit</Table.Cell>
                    <Table.Cell>{exam.max_score}</Table.Cell>
                    <Table.Cell>{exam.min_pass_score}</Table.Cell>

                    <Table.Cell>
                      <Dropdown label="Status" dismissOnClick={false}>
                        <Dropdown.Item
                          onClick={() => handleStatusActive(exam.kd_soal)}
                        >
                          Aktifkan Status
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusDeActive(exam.kd_soal)}
                        >
                          Non Aktifkan Status
                        </Dropdown.Item>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell className="flex justify-center items-center">
                      <Button
                        type="button"
                        className="mr-1"
                        onClick={() => handleAdd(exam.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        className="bg-red-600 "
                        onClick={() => handleDelete(exam.kd_soal)}
                      >
                        Delete
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
          <Pagination
            className="m-5 items-center justify-center"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
            layout="table"
          />
        </div>
      </div>
    </>
  );
};

export default ListUjianFragment;
