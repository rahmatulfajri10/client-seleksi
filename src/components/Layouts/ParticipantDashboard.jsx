import DaftarUjian from "../Fragments/DaftarUjian";
import DataDiriPeserta from "../Fragments/DataDiriPeserta";
import NavbarParticipant from "../Fragments/NavbarParticipant";

const ParticipantDashboard = (props) => {
  return (
    <>
      <NavbarParticipant />
      <DataDiriPeserta />
      <DaftarUjian />
    </>
  );
};
export default ParticipantDashboard;
