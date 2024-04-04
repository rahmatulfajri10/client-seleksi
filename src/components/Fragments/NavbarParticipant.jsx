import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LogOut, getMe, reset } from "../../features/authslice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../configs";
import logo from "../../assets/logo-unhan.png";

function NavbarParticipant() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let data = {};
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setCurrentDateTime(new Date());
  };
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Navbar fluid rounded className="border-b">
      <NavbarBrand href="" className="">
        <img src={logo} alt="" className="h-10 mr-3" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Sistem Ujian Online Unhan RI
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="../../../public/user.png"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block truncate text-sm font-medium">
              Login as {user ? user.username : "Guest"}
            </span>
          </DropdownHeader>

          <DropdownDivider />
          <DropdownItem onClick={logout}>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <div>
          {`${currentDateTime.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} Pukul ${currentDateTime.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}`}
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}
export default NavbarParticipant;
