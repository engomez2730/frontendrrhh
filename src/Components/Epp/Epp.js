import React from "react";
import TableEpp from "./TableEpp";
import requireAuth from "../requireAuth";
import { FieldTimeOutlined } from "@ant-design/icons";

const Epp = ({ empleados }) => {
  return (
    <div className="verAnuncios">
      <h1>
        Epp <FieldTimeOutlined />
      </h1>
      <div className="tableDataPer">
        <TableEpp empleados={empleados} />
      </div>
    </div>
  );
};

export default requireAuth(Epp);
