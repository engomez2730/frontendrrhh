import React, { useEffect } from "react";
import { connect } from "react-redux";
import TableEach from "./TableEach";

const PermisoVer = (props) => {
  useEffect(() => {}, [props.estado]);


  return (
    <div className="verVacacionesModal">
      <TableEach Permisos={props.usuario?.Permisos} />
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {})(PermisoVer);
