import ListUjianFragment from "../../../../components/Fragments/Ujian/ListUjian";
import GuardRoute from "../../../../components/GuardRoute";
import DashboardLayout from "../../../../components/Layouts/DahsboardLayout";

const ListUjianPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <ListUjianFragment />
      </DashboardLayout>
    </>
  );
};

export default ListUjianPage;
