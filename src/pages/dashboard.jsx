import DashboardLayout from "../components/Layouts/DahsboardLayout";

import GuardRoute from "../components/GuardRoute";

const DashboarPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout />
    </>
  );
};
export default DashboarPage;
