import moment from "moment";
import React from "react";
import TableEachLic from "./TableEachLic";
import { connect } from "react-redux";
const PermisoVer = ({ usuario, onCLose }) => {
  return (
    <div>
      <h1>Licencias de {usuario?.nombre}</h1>
      <TableEachLic licencias={usuario?.Licencias} onCloseParent={onCLose} />
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    usuario: state.usuarioSelecionadoVer.usuarioSelecionadoVer,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {})(PermisoVer);
