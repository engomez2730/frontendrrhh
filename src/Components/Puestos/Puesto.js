import React from "react";
import TablePuestos from "./TablePuestos";
import requireAuth from "../requireAuth";
import { AuditOutlined } from "@ant-design/icons";

const Avisos = ({ puestos }) => {
  return (
    <div className="verAnuncios">
      <h1>
        Puestos <AuditOutlined />
      </h1>
      <div className="tableDataPer">
        <TablePuestos puestos={puestos} />
      </div>
    </div>
  );
};

export default requireAuth(Avisos);
