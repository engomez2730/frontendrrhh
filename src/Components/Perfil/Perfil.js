import React, { useEffect } from "react";
import FormPerfils from "./FormPerfil";
import requireAuth from "../requireAuth";
import "./Perfil.css";

const Perfil = () => {
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

export default requireAuth(Perfil);
