import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../configs";
import { Button, Carousel, Label, Modal } from "flowbite-react";
import { format } from "date-fns";

const ProctorFragment = () => {
  const [proctorData, setProctorData] = useState([]);
  const [url, setUrl] = useState("");
  const [isOpenModal, setOpenModal] = useState(false);
  const [proctorById, setProctorById] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/proctor`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProctorData(response.data);
      } catch (error) {
        console.error("Error fetching proctor data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchProctorId = async (id_user) => {
    try {
      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/proctor/${id_user}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProctorById(response.data);
    } catch (error) {
      console.error("Error fetching proctor data:", error);
    }
  };

  const openModal = async (url, id_user, z) => {
    await fetchProctorId(id_user);

    setUrl(url);
    setOpenModal(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setUrl("");
    setOpenModal(false);
    setProctorById([]);
  };
  return (
    <>
      <Modal show={isOpenModal} onClose={closeModal} popup>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-black p-4 h-[95%] w-[75%] relative">
            {" "}
            {/* Tambahkan relative di sini */}
            <Carousel indicators={false}>
              {Array.isArray(proctorById) &&
                proctorById.map((item) => (
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="text-lg font-semibold text-white">
                      {format(
                        new Date(item.response_time),
                        "dd-MM-yyyy, HH:mm:ss"
                      )}{" "}
                      WIB
                    </div>
                    <img
                      src={`${config.api_foto_dev}/${item.kamera}`}
                      alt="Camera"
                      className="object-cover"
                    />
                  </div>
                ))}
            </Carousel>
            ;{/* Letakkan Button di sini dengan posisi absolut */}
            <Button
              color="failure"
              onClick={closeModal}
              className="absolute top-0 right-0 m-2"
            >
              X
            </Button>
          </div>
        </div>
      </Modal>
      <div className="w-[90%] m-10 mx-auto">
        <h1 className="text-2xl font-bold mb-5">
          Dokumentasi Proctor Partisipan
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {Array.isArray(proctorData) &&
            proctorData.map((item) => (
              <div
                key={item.id_user}
                className="bg-slate-300 rounded-lg shadow-md p-5"
              >
                <p className="text-lg font-medium mb-2">Nama: {item.nama}</p>
                <p>Nomor Pendaftaran: {item.no_pendaftaran}</p>
                <p>No WA : {item.no_telp}</p>
                <p className="mb-1">Email: {item.email}</p>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-center">Foto Asli</p>
                  <img
                    src={`${config.api_host_dev}/${item.url_foto}`}
                    alt={`Foto Asli`}
                    className="mb-4 w-[200px] h-[200px] object-cover  "
                  />
                  <p className="text-center">Kamera</p>
                  <img
                    src={`${config.api_foto_dev}/${item.kamera}`}
                    alt={`Kamera `}
                    className="mb-4 cursor-pointer"
                    onClick={() =>
                      openModal(
                        `${config.api_foto_dev}/${item.kamera}`,
                        item.id_user,
                        0
                      )
                    }
                  />
                  <p className="text-center">Layar</p>
                  <img
                    src={`${config.api_foto_dev}/${item.screen}`}
                    alt={`Kamera `}
                    className="mb-4 cursor-pointer"
                    onClick={() =>
                      openModal(
                        `${config.api_foto_dev}/${item.screen}`,
                        item.id_user,
                        1
                      )
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default ProctorFragment;
