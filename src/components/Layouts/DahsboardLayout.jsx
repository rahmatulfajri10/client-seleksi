import NavbarParticipant from "../Fragments/NavbarParticipant";
import SideBarDashboard from "../Fragments/SideBarDashboard";

const DashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <NavbarParticipant />
      <div className="flex">
        <SideBarDashboard />
        {children}
      </div>
    </>
  );
};
export default DashboardLayout;
