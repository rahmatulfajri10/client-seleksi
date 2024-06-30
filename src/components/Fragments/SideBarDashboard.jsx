import { Sidebar } from "flowbite-react";
import {
  HiVideoCamera,
  HiChartPie,
  HiClipboardCheck,
  HiChartBar,
  HiLogout,
  HiUsers,
} from "react-icons/hi";
import { useDispatch } from "react-redux";
import { LogOut, getMe, reset } from "../../features/authslice";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SideBarDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };
  const location = useLocation();
  const dashboardRoles = [1, 2, 3, 4];
  const usersRoles = [1];
  const ujianRoles = [1, 2];
  const resultRoles = [1, 4];
  const proctorRoles = [1, 3];
  return (
    <div className="">
      <Sidebar
        className="border-r flex flex-col justify-between"
        aria-label="Sidebar with multi-level dropdown example"
      >
        <Sidebar.Items className="min-h-screen">
          <Sidebar.ItemGroup>
            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => dashboardRoles.includes(role)) && (
                <Sidebar.Item
                  as={NavLink}
                  to="/"
                  icon={HiChartPie}
                  className={"/" === currentPage ? "bg-gray-300" : ""}
                >
                  Dashboard
                </Sidebar.Item>
              )}

            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => usersRoles.includes(role)) && (
                <Sidebar.Collapse href="#" icon={HiUsers} label="Users" active>
                  <Sidebar.Item
                    as={NavLink}
                    to="/users"
                    className={"/users" === currentPage ? "bg-gray-300" : ""}
                  >
                    List User
                  </Sidebar.Item>
                  <Sidebar.Item
                    as={NavLink}
                    to="/add-user"
                    className={"/add-user" === currentPage ? "bg-gray-300" : ""}
                  >
                    Create One User
                  </Sidebar.Item>
                  <Sidebar.Item
                    as={NavLink}
                    to="/bulk-add-user"
                    className={
                      "/bulk-add-user" === currentPage ? "bg-gray-300" : ""
                    }
                  >
                    Create Many Users
                  </Sidebar.Item>
                </Sidebar.Collapse>
              )}

            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => ujianRoles.includes(role)) && (
                <Sidebar.Collapse icon={HiClipboardCheck} label="Ujian">
                  <Sidebar.Item
                    href="/ujian"
                    className={"/ujian" === currentPage ? "bg-gray-300" : ""}
                  >
                    List Ujian
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/add-ujian"
                    className={
                      "/add-ujian" === currentPage ? "bg-gray-300" : ""
                    }
                  >
                    Tambah Ujian
                  </Sidebar.Item>
                </Sidebar.Collapse>
              )}
            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => resultRoles.includes(role)) && (
                <Sidebar.Item
                  href="/result"
                  icon={HiChartBar}
                  className={"/result" === currentPage ? "bg-gray-300" : ""}
                >
                  Result
                </Sidebar.Item>
              )}
            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => proctorRoles.includes(role)) && (
                <Sidebar.Item
                  href="/proctor"
                  icon={HiVideoCamera}
                  className={"/proctor" === currentPage ? "bg-gray-300" : ""}
                >
                  Proctor
                </Sidebar.Item>
              )}

            <Sidebar.Item
              className="hover:bg-red-200 hover:text-red-500 mt-auto cursor-pointer"
              icon={() => <HiLogout className="hover:text-red-500" />}
              onClick={logout}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default SideBarDashboard;
