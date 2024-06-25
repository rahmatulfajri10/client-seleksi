import ListUserFragment from "../../../../components/Fragments/ListUser";
import GuardRoute from "../../../../components/GuardRoute";
import DashboardLayout from "../../../../components/Layouts/DahsboardLayout";

const ListUserPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <ListUserFragment />
      </DashboardLayout>
    </>
  );
};

export default ListUserPage;
