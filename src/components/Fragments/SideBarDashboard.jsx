import { Sidebar } from "flowbite-react";
import {
  HiVideoCamera,
  HiChartPie,
  HiClipboardCheck,
  HiShoppingBag,
  HiLogout,
  HiUsers,
} from "react-icons/hi";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../../features/authslice";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function SideBarDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };
  const location = useLocation();
  return (
    <div className="">
      <Sidebar
        className="border-r flex flex-col justify-between"
        aria-label="Sidebar with multi-level dropdown example"
      >
        <Sidebar.Items className="min-h-screen">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse href="#" icon={HiUsers} label="Users">
              <Sidebar.Item href="/users">List User</Sidebar.Item>
              <Sidebar.Item href="#">Create User</Sidebar.Item>
              <Sidebar.Item href="#">Grup Peserta</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={HiClipboardCheck} label="Ujian">
              <Sidebar.Item href="#">List Ujian</Sidebar.Item>
              <Sidebar.Item href="#">Tambah Ujian</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item href="/proctor" icon={HiVideoCamera}>
              Proctor
            </Sidebar.Item>

            <Sidebar.Item
              className=" hover:bg-red-200 hover:text-red-500 mt-auto"
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
