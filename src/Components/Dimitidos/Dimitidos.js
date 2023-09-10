import React from "react";
import DimitidosTable from "./DimitidosTable";

const Domitidos = ({ empleados }) => {
  return (
    <div className="verAnuncios">
      <h1>Dimitidos</h1>
      <div className="tableDataPer">
        <DimitidosTable empleados={empleados} />
      </div>
    </div>
  );
};

export default Domitidos;
