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

function NavbarParticipant() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
      <NavbarBrand href="">
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
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
        <div>{currentDateTime.toLocaleString()}</div>
      </NavbarCollapse>
    </Navbar>
  );
}
export default NavbarParticipant;
