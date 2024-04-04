import { useEffect, useRef } from "react";
import FormulirPesertaUjian from "../Fragments/FormulirPesertaUjian";
import NavbarParticipant from "../Fragments/NavbarParticipant";

const FormParticipantLayout = (props) => {
  return (
    <>
      <NavbarParticipant />
      <FormulirPesertaUjian />
    </>
  );
};
export default FormParticipantLayout;
