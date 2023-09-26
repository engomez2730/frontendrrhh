import React from "react";
import TablaLicen from "./TablaLicen";
import requireAuth from "../requireAuth";

export default requireAuth(function Licencias(empleados) {
  return (
    <div>
      <h1>Licencias</h1>
      <TablaLicen empleados={empleados} />
    </div>
  );
});
