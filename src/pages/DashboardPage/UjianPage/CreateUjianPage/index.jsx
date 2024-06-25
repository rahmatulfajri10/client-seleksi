import FormUjian from "../../../../components/Fragments/Ujian/FormUjian";
import GuardRoute from "../../../../components/GuardRoute";
import DashboardLayout from "../../../../components/Layouts/DahsboardLayout";

const CreateUjianPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <FormUjian />
      </DashboardLayout>
    </>
  );
};

export default CreateUjianPage;
