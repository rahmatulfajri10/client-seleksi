import GuardRouteParticipant from "../../../components/GuardRouteParticipant";
import ParticipantDashboard from "../../../components/Layouts/ParticipantDashboard";

const DashboardParticipant = () => {
  return (
    <>
      <GuardRouteParticipant />
      <ParticipantDashboard />
    </>
  );
};
export default DashboardParticipant;
