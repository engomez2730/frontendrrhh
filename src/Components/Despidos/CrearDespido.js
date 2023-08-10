import React from "react";
import StatsDespidos from "./StatsDespidos";
import TableDespidos from "./CrearDespidosTable";
import requireAuth from "../requireAuth";

const Despidos = () => {
  return (
    <div className="verAnuncios">
      <h1>Despidos</h1>
      <div className="tableDataPer">
        <TableDespidos />
      </div>
    </div>
  );
};

export default requireAuth(Despidos);
