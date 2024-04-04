import NavbarParticipant from "../Fragments/NavbarParticipant";
import SideBarDashboard from "../Fragments/SideBarDashboard";

const DashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <NavbarParticipant />
      <div className="flex flex-row">
        <div className="w-64 flex-none">
          <SideBarDashboard />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
};
export default DashboardLayout;
