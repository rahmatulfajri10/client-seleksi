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
import { useEffect } from "react";

function SideBarDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

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
                  className={({ isActive }) =>
                    isActive ? "bg-blue-500 text-white" : "text-gray-700"
                  }
                >
                  Dashboard
                </Sidebar.Item>
              )}

            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => usersRoles.includes(role)) && (
                <Sidebar.Collapse href="#" icon={HiUsers} label="Users">
                  <Sidebar.Item
                    as={NavLink}
                    to="/users"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 bg-blue-50"
                    }
                  >
                    List User
                  </Sidebar.Item>
                  <Sidebar.Item as={NavLink} to="/add-user">
                    Create One User
                  </Sidebar.Item>
                  <Sidebar.Item as={NavLink} to="/bulk-add-user">
                    Create Many Users
                  </Sidebar.Item>
                </Sidebar.Collapse>
              )}

            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => ujianRoles.includes(role)) && (
                <Sidebar.Collapse icon={HiClipboardCheck} label="Ujian">
                  <Sidebar.Item href="/ujian">List Ujian</Sidebar.Item>
                  <Sidebar.Item href="/add-ujian">Tambah Ujian</Sidebar.Item>
                </Sidebar.Collapse>
              )}
            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => resultRoles.includes(role)) && (
                <Sidebar.Item href="/result" icon={HiChartBar}>
                  Result
                </Sidebar.Item>
              )}
            {user &&
              Array.isArray(user.role) &&
              user.role.some((role) => proctorRoles.includes(role)) && (
                <Sidebar.Item href="/proctor" icon={HiVideoCamera}>
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
