import React from "react";
import TablePerm from "./TablePerm";
import requireAuth from "../requireAuth";
import { PushpinOutlined } from "@ant-design/icons";

const Permisos = ({ empleados }) => {
  return (
    <div className="verPermisos">
      <h1>
        Permisos <PushpinOutlined />
      </h1>
      <div className="tableDataPer">
        <TablePerm empleados={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(Permisos);
