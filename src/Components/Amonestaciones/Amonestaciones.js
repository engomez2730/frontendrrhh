import React from "react";
import Tableamos from "./TableAmos";
import requireAuth from "../requireAuth";

export default requireAuth(function Compensaciones(empleados) {
  return (
    <div>
      <h1>Amonestaciones</h1>
      <Tableamos empleados={empleados} />
    </div>
  );
});
