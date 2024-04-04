import { useEffect, useRef } from "react";
import NavbarParticipant from "../Fragments/NavbarParticipant";
import QuizFrag from "../Fragments/QuizFrag";
import { config } from "../../configs";
import axios from "axios";
import { useSelector } from "react-redux";

const QuizLayout = (props) => {
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const canvasRef = useRef(document.createElement("canvas"));
  // Ubah base64 ke Blob
  function base64ToBlob(base64, mimeType) {
    const bytes = atob(base64.split(",")[1]);
    let array = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      array[i] = bytes.charCodeAt(i);
    }
    return new Blob([array], { type: mimeType });
  }
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Meminta izin akses webcam
        const webcamStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = webcamStream;
        }

        // Meminta izin akses screen capture
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
            displaySurface: "monitor",
          },
        });
        if (screenRef.current) {
          screenRef.current.srcObject = screenStream;
        }

        setInterval(async () => {
          // Dapatkan tanggal dan waktu saat ini
          const now = new Date();

          // Ubah menjadi string dengan format 'YYYY-MM-DD_HH-MM-SS'
          const timestamp = now
            .toISOString()
            .replace(/[:T]/g, "-")
            .split(".")[0];

          // Gunakan timestamp sebagai nama file
          let filenameKamera;
          let filenameScreen;
          if (user && user.id) {
            filenameKamera = `kamera_${timestamp}_${user.id}.jpg`;
            filenameScreen = `kamera_${timestamp}_${user.id}.jpg`;
          } else {
            // Handle the case where user or user.id is not defined
            console.error("User or user ID is not defined");
          }
          let webcamImage;
          let context;
          if (canvasRef.current) {
            context = canvasRef.current.getContext("2d");
          }
          if (videoRef.current && videoRef.current.readyState === 4) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(
              videoRef.current,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            webcamImage = canvasRef.current.toDataURL("image/jpeg", 1.0);
          }

          let screenImage;
          if (screenRef.current && screenRef.current.readyState === 4) {
            canvasRef.current.width = screenRef.current.videoWidth;
            canvasRef.current.height = screenRef.current.videoHeight;

            context.drawImage(
              screenRef.current,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            screenImage = canvasRef.current.toDataURL("image/jpeg", 1.0);
          }
          // Buat objek FormData dan tambahkan gambar
          const formData = new FormData();
          formData.append(
            "kamera",
            base64ToBlob(webcamImage, "image/jpeg"),
            filenameKamera
          );
          formData.append(
            "screen",
            base64ToBlob(screenImage, "image/jpeg"),
            filenameScreen
          );

          // Kirim form data ke API
          const foto = await axios.post(
            `${config.api_foto_dev}/v1/foto`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const postFoto = await axios.post(
            `${config.api_host_dev}/api/v1/cms/proctor`,
            {
              id_user: user.id,
              kamera: `uploads/kamera/${foto.data.data.kamera}`,
              screen: `uploads/screen/${foto.data.data.screen}`,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        }, 5000);
      } catch (error) {
        console.error("Gagal meminta izin:", error);
        // Tangani kesalahan izin ditolak atau tidak tersedia
      }
    };

    requestPermissions();
  }, []);
  return (
    <>
      <NavbarParticipant />
      <QuizFrag />
      <div className="flex flex-auto justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-1/4 m-5 border border-black"
        />
        <video
          ref={screenRef}
          autoPlay
          playsInline
          className="w-1/4 m-5 border border-black"
        />
      </div>
    </>
  );
};

export default QuizLayout;
