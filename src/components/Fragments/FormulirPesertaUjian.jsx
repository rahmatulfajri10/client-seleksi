import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { config } from "../../configs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FormulirPesertaUjian = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
            navigate("/participant");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Panggil fungsi fetchUserData saat komponen pertama kali dimuat dan setiap kali `user` berubah
    fetchUserData();
  }, [user]); // Tambahkan `user` sebagai dependensi useEffect
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    no_pendaftaran: "",
    email: "",
    no_telp: "",
    file: null,
  });
  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "failure",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("nama", formData.nama);
    formDataToSend.append("nik", formData.nik);
    formDataToSend.append("no_pendaftaran", formData.no_pendaftaran);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("no_telp", formData.no_telp);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("id_user", user.id);
    try {
      const response = await axios.post(
        `${config.api_host_dev}/api/v1/cms/participant`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        navigate("/participant");
      }
      // Lakukan sesuatu setelah berhasil mengirimkan data
    } catch (error) {
      setAlert({
        status: true,
        message: error.response.data.msg,
        type: "failure",
      });
      // Tangani kesalahan jika ada
    }
  };
  return (
    <>
      <div className=" relative inset-0 w-3/4 mx-auto my-5">
        {alert.status && (
          <Alert color={alert.type}>
            <span className="font-medium">Info!</span> {alert.message}
          </Alert>
        )}
        <h1 className="text-3xl font-bold mb-2 text-blue-600 flex justify-center items-center">
          Formulir Peserta Ujian
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nama" value="Nama Peserta" />
            </div>
            <TextInput
              id="nama"
              type="text"
              placeholder=""
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nik" value="NIK Peserta" />
            </div>
            <TextInput
              id="nik"
              type="text"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="no_pendaftaran" value="Nomor Pendaftaran" />
            </div>
            <TextInput
              id="no_pendaftaran"
              type="text"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email Peserta" />
            </div>
            <TextInput
              id="email"
              type="email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="no_telp" value="Nomor Whatsapp Peserta" />
            </div>
            <TextInput
              id="no_telp"
              type="text"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Foto Peserta" />
          </div>
          <FileInput
            id="file"
            accept=".jpg, .png, .jpeg"
            onChange={handleFileChange}
          />
          <div className="flex justify-center items-center">
            <Button type="submit" className="w-1/4">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormulirPesertaUjian;
