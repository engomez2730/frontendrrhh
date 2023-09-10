import React from "react";
import "./Vacaciones.css";
import TableVac from "./TableVac";
import requireAuth from "../requireAuth";

const Vacaciones = ({ empleados }) => {
  return (
    <div className="verVacaciones">
      <h1>Vacaciones</h1>
      <div className="tableDataVac">{<TableVac empleados={empleados} />} </div>
    </div>
  );
};

export default requireAuth(Vacaciones);
