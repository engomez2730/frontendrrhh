import React, { useEffect } from "react";
import FormPerfils from "./FormPerfil";
import TablePerfil from "./TablePerfil";
import "./Perfil.css";

const Perfil = ({ empleados }) => {
  useEffect(() => {}, []);

  return (
    <div>
      <h1>Administrar Perfil</h1>
      <div className="perfilContent">
        <div className="form">
          <h2>Editar mi usuario</h2>
          <FormPerfils />
        </div>

      </div>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
  };
};

export default Perfil;
