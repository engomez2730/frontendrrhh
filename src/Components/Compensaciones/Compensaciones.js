import React from "react";
import TableBenef from "./TableBenef";
import requireAuth from "../requireAuth";
import { CheckOutlined } from "@ant-design/icons";


export default requireAuth(function Compensaciones({ empleados }) {
  return (
    <div>
      <h1>Compensaciones y Beneficios <CheckOutlined/></h1>
      <TableBenef empleados={empleados} />
    </div>
  );
});
