import ResultFragment from "../../../components/Fragments/Result/Result";
import GuardRoute from "../../../components/GuardRoute";
import DashboardLayout from "../../../components/Layouts/DahsboardLayout";

const ResultPage = () => {
  return (
    <>
      <GuardRoute />
      <DashboardLayout>
        <ResultFragment />
      </DashboardLayout>
    </>
  );
};

export default ResultPage;
