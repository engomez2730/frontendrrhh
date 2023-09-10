import React from "react";
import EppStats from "./EppStats";
import TableEpp from "./TableEpp";
import requireAuth from "../requireAuth";

const Epp = ({ empleados }) => {
  return (
    <div className="verAnuncios">
      <h1>Epp</h1>
      <div className="tableDataPer">
        <TableEpp empleados={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(Epp);
