import React from "react";
import TablePerm from "./TablePerm";
import requireAuth from "../requireAuth";
const Permisos = ({ empleados }) => {
  return (
    <div className="verPermisos">
      <h1>Permisos</h1>
      <div className="tableDataPer">
        <TablePerm empleados={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(Permisos);
