import React from "react";
import "./VerDepartamentos.css";
import TableDep from "./TableDep";
import requireAuth from "../requireAuth";

const VerDepartamentos = ({ departamentos }) => {
  return (
    <div className="verDepartamentos">
      <h1>Ver Departamentos</h1>
      <div className="tableDataDepar">
        <TableDep departamentos={departamentos} />
      </div>
    </div>
  );
};

export default requireAuth(VerDepartamentos);
