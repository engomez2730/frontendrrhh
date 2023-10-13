import React from "react";
import { ExclamationOutlined } from "@ant-design/icons";
import TableAusencias from "./TableAusencias";

const Ausencias = ({ empleados }) => {
  return (
    <div>
      <h1>
        Ausencias
        <ExclamationOutlined />
      </h1>
      <TableAusencias empleadosProps={empleados} />
    </div>
  );
};

export default Ausencias;
