import axios from "axios";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../configs";

const ListUserFragment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/user`,
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
    fetchExamData();
  }, []);
  const handleEdit = (id) => {
    console.log(id);
    setOpenModal(true);
  };
  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }
  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Role User
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                value={username}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <div className="flex max-w-md flex-col gap-4" id="checkbox">
                <div className="flex items-center gap-2">
                  <Checkbox id="accept" />
                  <Label htmlFor="accept" className="flex">
                    I agree with the
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="promotion" />
                  <Label htmlFor="promotion">
                    I want to get promotional offers
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="age" />
                  <Label htmlFor="age">I am 18 years or older</Label>
                </div>
              </div>
            </div>

            <div className="w-full">
              <Button>Save</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="w-[90%] m-10 mx-auto">
        <div className="flex justify-center mb-5">
          <h1 className="text-2xl font-bold">Manajemen User</h1>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell className="flex justify-center items-center">
                <span className="">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array.isArray(data) ? (
                data.map((user) => (
                  <Table.Row
                    key={user.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </Table.Cell>
                    <Table.Cell>
                      {user.active === 1 ? "Aktif" : "Tidak Aktif"}
                    </Table.Cell>
                    <Table.Cell>
                      {Array.isArray(user.role)
                        ? user.role
                            .map((role) =>
                              typeof role === "string"
                                ? role.toUpperCase()
                                : role
                            )
                            .join(", ")
                        : user.role}
                    </Table.Cell>
                    <Table.Cell className="flex justify-center items-center">
                      <Button
                        type="submit"
                        className="mr-2"
                        onClick={() => handleEdit(user.id)}
                      >
                        Role
                      </Button>
                      <Button type="submit" onClick={() => handleEdit(user.id)}>
                        Status
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
export default ListUserFragment;
