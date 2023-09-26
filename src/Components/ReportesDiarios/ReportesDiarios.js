import React from "react";
import ReportesDiariosTable from "./ReportesDiariosTable";
import "./Reportes.css";

const ReportesDiarios = ({ empleados, proyectos }) => {
  return (
    <div className="reportes">
      <h1>Reportes Diarios</h1>
      <ReportesDiariosTable empleados={empleados} proyectos={proyectos} />
    </div>
  );
};

export default ReportesDiarios;
