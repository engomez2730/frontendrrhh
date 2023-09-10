import React from "react";
import TableDespidos from "./CrearDespidosTable";
import requireAuth from "../requireAuth";

const Despidos = ({ empleados }) => {
  return (
    <div className="verAnuncios">
      <h1>Despidos</h1>
      <div className="tableDataPer">
        <TableDespidos empleados={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(Despidos);
