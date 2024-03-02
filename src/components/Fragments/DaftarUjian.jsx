import { Button, Table } from "flowbite-react";

const DaftarUjian = () => {
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
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Psikologi 1
                </Table.Cell>
                <Table.Cell>Sliver</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>
                  <Button type="submit">Mulai</Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DaftarUjian;
