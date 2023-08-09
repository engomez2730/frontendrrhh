import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");

const PermisoVer = ({ empleadoSelecionado }) => {
  return (
    <div className="verVacacionesModal">
      {empleadoSelecionado?.Amonestaciones?.map((e, index) => {
        return (
          <div className="verVacacionesItem">
            <div className="verVacacionesLabel">{e?.nombreAmonestacion}:</div>
            <div className="verVacacionesValue">
              {" "}
              {new Intl.NumberFormat("es-RD", {
                maximumSignificantDigits: 4,
              }).format(e?.cantidadAmonestacion)}{" "}
              $RD   
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    empleado: state.usuarioSelecionadoVer?.usuarioSelecionadoVer,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {})(PermisoVer);
