import FormAddUser from "../../../../components/Fragments/User/FormUser";
import GuardRoute from "../../../../components/GuardRoute";
import DashboardLayout from "../../../../components/Layouts/DahsboardLayout";

const CreateUserPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <FormAddUser />
      </DashboardLayout>
    </>
  );
};

export default CreateUserPage;
