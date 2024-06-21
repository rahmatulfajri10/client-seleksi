import DashboardLayout from "../components/Layouts/DahsboardLayout";

import GuardRoute from "../components/GuardRoute";
import DBoardPage from "./DashboardPage/DBoardPage";

const DashboarPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <DBoardPage />
      </DashboardLayout>
    </>
  );
};
export default DashboarPage;
