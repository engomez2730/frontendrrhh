import React from "react";
import TableVacEach from "./TableVacEach";

const VerVacaciones = (props) => {
  return (
    <div className="verVacacionesModal">
      <div className="disponibilidadVac">
        Hisorial de Vacaciones de:
        <span className="vacacionesSpan">{props?.usuario?.nombre}</span>
      </div>
      <TableVacEach
        vacaciones={props.usuario?.Vacaciones}
        onCloseParent={props.onClose}
      />
    </div>
  );
};

export default VerVacaciones;
