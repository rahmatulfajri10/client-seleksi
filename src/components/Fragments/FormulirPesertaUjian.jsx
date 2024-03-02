import { Button, FileInput, Label, TextInput } from "flowbite-react";
const FormulirPesertaUjian = () => {
  return (
    <>
      <div className=" relative inset-0 w-3/4 mx-auto my-5">
        <h1 className="text-3xl font-bold mb-2 text-blue-600 flex justify-center items-center">
          Formulir Peserta Ujian
        </h1>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nama" value="Nama Peserta" />
            </div>
            <TextInput id="nama" type="text" placeholder="" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nik" value="NIK Peserta" />
            </div>
            <TextInput id="nik" type="text" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="no_pendaftaran" value="Nomor Pendaftaran" />
            </div>
            <TextInput id="no_pendaftaran" type="text" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email Peserta" />
            </div>
            <TextInput id="email" type="email" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="no_telp" value="Nomor Whatsapp Peserta" />
            </div>
            <TextInput id="no_telp" type="text" required />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Foto Peserta" />
          </div>
          <FileInput id="file" accept=".jpg, .png, .jpeg" />
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
