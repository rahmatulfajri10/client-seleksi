import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { config } from "../../configs";
import { useState } from "react";

const DataDiriPeserta = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          // Lakukan permintaan ke backend untuk memeriksa keberadaan pengguna dengan ID tertentu
          const response = await axios.get(
            `${config.api_host_dev}/api/v1/cms/participant/${user.id}`,
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
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Panggil fungsi fetchUserData saat komponen pertama kali dimuat dan setiap kali `user` berubah
    fetchUserData();
  }, [user]);
  return (
    <>
      <div className="border-4 border-solid border-black w-3/4 mt-10 mx-auto ">
        <div className="flex justify-center my-5">
          <h1 className="text-2xl font-bold ">Data Diri Peserta</h1>
        </div>
        <div className="grid grid-cols-4">
          <div className="border h-[40vh] m-5 grid justify-center ">
            <img
              src={
                data && data.url_foto
                  ? `${config.api_host_dev}/${data.url_foto}`
                  : "Loading..."
              }
              alt=""
              className="h-max-screen object-cover "
            />
          </div>
          <div className="m-5  col-span-3  grid items-center">
            <div className="grid grid-cols-4">
              <p>Nama</p>
              <p className="col-span-3">
                <span>:</span> {data && data.nama ? data.nama : "Loading..."}
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>NIK</p>
              <p className="col-span-3">
                <span>:</span> {data && data.nik ? data.nik : "Loading..."}
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>Nomor Pendaftaran</p>
              <p className="col-span-3">
                <span>:</span>{" "}
                {data && data.no_pendaftaran
                  ? data.no_pendaftaran
                  : "Loading..."}
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>Email</p>
              <p className="col-span-3">
                <span>:</span> {data && data.email ? data.email : "Loading..."}
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>Nomor Telepon / Whatsapp</p>
              <p className="col-span-3">
                <span>:</span>{" "}
                {data && data.no_telp ? data.no_telp : "Loading..."}
              </p>
            </div>
          </div>
        </div>
        <div className="grid justify-end m-5">
          <Button>Edit</Button>
        </div>
      </div>
    </>
  );
};

export default DataDiriPeserta;
