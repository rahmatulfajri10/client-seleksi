import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import { config } from "../../configs";
import { data } from "autoprefixer";
import Swal from "sweetalert2";

const ListUserFragment = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [userData, setUserData] = useState({});
  const [roles, setRoles] = useState([]);

  const [username, setUsername] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const [filteredRoleUser, setFilteredRoleUser] = useState("");

  const [role, setRole] = useState("");
  const [active, setActive] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${config.api_host_dev}/api/v1/cms/role`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response) {
          setRoles(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchUserData();
    fetchRoles();
  }, []);

  const handleAddRole = (id) => {
    const selectedUser = userData.find((user) => user.id === id);
    if (selectedUser) {
      setUsername(selectedUser.username);
      setRoleUser(selectedUser.role);
      setActive(selectedUser.active === 1 ? true : false);
      setSelectedUserId(id);
      setOpenModalAdd(true);
    }
  };
  useEffect(() => {
    setFilteredRoleUser(
      roles.filter((role) => roleUser.includes(role.ur_role))
    );
  }, [roles, roleUser]);
  const handleDelRole = (id) => {
    const selectedUser = userData.find((user) => user.id === id);
    if (selectedUser) {
      setUsername(selectedUser.username);
      setRoleUser(selectedUser.role);
      setActive(selectedUser.active === 1 ? true : false);
      setSelectedUserId(id);

      setOpenModalDel(true);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${config.api_host_dev}/api/v1/cms/user/add-role/${selectedUserId}`,
        {
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "User status updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setUserData(response.data.data);
      }

      setOpenModalAdd(false);
      setUsername("");
      setPassword("");
      setActive(false);
      setRole("");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteRole = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${config.api_host_dev}/api/v1/cms/user/del-role/${selectedUserId}`,
        {
          data: {
            id_role: role,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "User status updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setUserData(response.data.data);
      }

      setOpenModalDel(false);
      setUsername("");
      setPassword("");
      setActive(false);
      setRole("");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // Tambahkan async di sini
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          // Tunggu sampai penghapusan selesai
          await axios.delete(`${config.api_host_dev}/api/v1/cms/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Setelah penghapusan, muat ulang data
          const response = await axios.get(
            `${config.api_host_dev}/api/v1/cms/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response) {
            setUserData(response.data.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your user has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("There was an error deleting the user!", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the user!",
            icon: "error",
          });
        }
      }
    });
  };

  const handleStatusActive = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${config.api_host_dev}/api/v1/cms/user/status/${id}`,
        {
          active: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "User status updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("There was an error update the user!", error);
    }
  };
  const handleStatusDeActive = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${config.api_host_dev}/api/v1/cms/user/status/${id}`,
        {
          active: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "User status updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      const response = await axios.get(
        `${config.api_host_dev}/api/v1/cms/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("There was an error update the user!", error);
    }
  };

  const onCloseModal = () => {
    setOpenModalAdd(false);
    setOpenModalDel(false);
    setUsername("");
    setRoleUser("");
    setActive(false);
    setRole("");
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
    if (Array.isArray(userData) && userData.length > 0) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      // Correctly calculate and set the current items to be displayed
      setCurrentItems(userData.slice(indexOfFirstItem, indexOfLastItem));
      // Use a separate state for currentItems if needed, or directly use currentItems within this useEffect
      setTotalPages(Math.ceil(userData.length / itemsPerPage));
    }
  }, [userData, currentPage, itemsPerPage]);

  return (
    <>
      <Modal show={openModalAdd} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Tambah Role User
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role Saat Ini" />
              </div>
              <TextInput id="role" value={roleUser} required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role yang ditambahkan" />
              </div>
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="">Pilih Role</option>
                {Array.isArray(roles) &&
                  roles.map((role) => (
                    <option key={role.id} value={role.ur_role}>
                      {role.ur_role}
                    </option>
                  ))}
              </Select>
            </div>

            <div className="w-full">
              <Button onClick={handleUpdate}>Tambah</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={openModalDel} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Hapus Role User
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role Saat Ini" />
              </div>
              <TextInput id="role" value={roleUser} required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role yang ditambahkan" />
              </div>
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="">Pilih Role</option>
                {Array.isArray(filteredRoleUser) &&
                  filteredRoleUser.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.ur_role}
                    </option>
                  ))}
              </Select>
            </div>

            <div className="w-full">
              <Button className="bg-red-600" onClick={handleDeleteRole}>
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="w-[90%] m-10 mx-auto">
        <div className="flex justify-center mb-5">
          <h1 className="text-2xl font-bold">Manajemen User</h1>
        </div>
        <div className="overflow-x-auto flex flex-col">
          <Table>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell className="flex justify-center items-center">
                <span className="">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((user, index) => (
                  <Table.Row
                    key={user.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
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

                    <Table.Cell>
                      <Dropdown label="Edit" dismissOnClick={false}>
                        <Dropdown.Item onClick={() => handleAddRole(user.id)}>
                          Tambah Role
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelRole(user.id)}>
                          Hapus Role
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusActive(user.id)}
                        >
                          Aktifkan Status
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusDeActive(user.id)}
                        >
                          Non Aktifkan Status
                        </Dropdown.Item>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell className="flex justify-center items-center">
                      <Button
                        type="button"
                        className="bg-red-600 "
                        onClick={() => handleDelete(user.id)}
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
            layout="table"
            className="mt-5 items-center justify-center"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </>
  );
};
export default ListUserFragment;
