import React from "react";
import TableDespidos from "./CrearDespidosTable";
import requireAuth from "../requireAuth";
import { ClearOutlined } from "@ant-design/icons";

const Despidos = ({ empleados }) => {
  return (
    <div className="verAnuncios">
      <h1>
        Despidos <ClearOutlined />
      </h1>
      <div className="tableDataPer">
        <TableDespidos empleados={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(Despidos);
