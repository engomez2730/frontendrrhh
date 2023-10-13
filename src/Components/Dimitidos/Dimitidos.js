import React from "react";
import DimitidosTable from "./DimitidosTable";
import requireAuth from "../requireAuth";
import { DeleteOutlined } from "@ant-design/icons";

const Domitidos = ({ empleados }) => {
  return (
    <div className="verAnuncios">
      <h1>
        Dimitidos <DeleteOutlined />
      </h1>
      <div className="tableDataPer">
        <DimitidosTable empleados={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(Domitidos);
