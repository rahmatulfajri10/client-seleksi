import ProctorFragment from "../../../components/Fragments/Proctor";
import GuardRoute from "../../../components/GuardRoute";
import DashboardLayout from "../../../components/Layouts/DahsboardLayout";

const ProctorPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <ProctorFragment />
      </DashboardLayout>
    </>
  );
};
export default ProctorPage;
