import CreateBulkUser from "../../../../components/Fragments/User/CreateBulkUser";
import GuardRoute from "../../../../components/GuardRoute";
import DashboardLayout from "../../../../components/Layouts/DahsboardLayout";

const CreateBulkUserPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <CreateBulkUser />
      </DashboardLayout>
    </>
  );
};

export default CreateBulkUserPage;
