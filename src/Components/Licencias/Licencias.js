import React from "react";
import TablaLicen from "./TablaLicen";

export default function Licencias(empleados) {
  return (
    <div>
      <h1>Licencias</h1>
      <TablaLicen empleados={empleados} />
    </div>
  );
}
