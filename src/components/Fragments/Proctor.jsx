import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../configs";

const ProctorFragment = () => {
  const [proctorData, setProctorData] = useState([]);
  const navigate = useNavigate();
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log("Proctor data:", proctorData);
  }, []);

  const handleViewDetails = (id_user) => {
    navigate(`/details/${id_user}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetails(null);
  };

  return (
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
                  className="mb-4 w-[200px] h-[200px] object-cover "
                />
                <p className="text-center">Kamera</p>
                <img
                  src={`${config.api_foto_dev}/${item.kamera}`}
                  alt={`Kamera `}
                  className="mb-4"
                />
                <p className="text-center">Layar</p>
                <img
                  src={`${config.api_foto_dev}/${item.screen}`}
                  alt={`Kamera `}
                  className="mb-4"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ProctorFragment;
