import { Button } from "flowbite-react";

const DataDiriPeserta = () => {
  return (
    <>
      <div className="border-4 border-solid border-black w-3/4 mt-10 mx-auto ">
        <div className="flex justify-center my-5">
          <h1 className="text-2xl font-bold ">Data Diri Peserta</h1>
        </div>
        <div className="grid grid-cols-4">
          <div className="border h-[40vh] m-5 grid justify-center ">
            <img
              src="/public/user.png"
              alt=""
              className="h-max-screen object-cover "
            />
          </div>
          <div className="m-5  col-span-3  grid items-center">
            <div className="grid grid-cols-4">
              <p>Username</p>
              <p className="col-span-3">
                <span>:</span> rahmatulfajri10
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>Nama</p>
              <p className="col-span-3">
                <span>:</span> Rahmatul Fajri
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>NIK</p>
              <p className="col-span-3">
                <span>:</span> 14710910012023
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>Nomor Pendaftaran</p>
              <p className="col-span-3">
                <span>:</span> UNH120213412
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>Email</p>
              <p className="col-span-3">
                <span>:</span> rahmatulfajri10@gmail.com
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p>Nomor Telepon / Whatsapp</p>
              <p className="col-span-3">
                <span>:</span> 0821736382
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
