import React from "react";
import "./VerEmpleados.css";
import StatsCard from "./StatsCardContainer";
import Table from "../Empleados/Table";
import requireAuth from "../requireAuth";
const VerEmpleados = ({ empleados }) => {
  return (
    <div className="verEmpleados">
      <h1>Manejar Empleados</h1>
      <div className="tabledata">
        <Table empleadosProps={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(VerEmpleados);
