import React from "react";
import Tableamos from "./TableAmos";
import requireAuth from "../requireAuth";
import { CloseOutlined } from "@ant-design/icons";

export default requireAuth(function Compensaciones(empleados) {
  return (
    <div>
      <h1>
        Amonestaciones <CloseOutlined></CloseOutlined>
      </h1>
      <Tableamos empleados={empleados} />
    </div>
  );
});
