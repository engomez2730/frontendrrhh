import React from "react";
import TablaLicen from "./TablaLicen";
import requireAuth from "../requireAuth";
import { UpSquareOutlined } from "@ant-design/icons";

export default requireAuth(function Licencias(empleados) {
  return (
    <div>
      <h1>
        Licencias <UpSquareOutlined />
      </h1>
      <TablaLicen empleados={empleados} />
    </div>
  );
});
