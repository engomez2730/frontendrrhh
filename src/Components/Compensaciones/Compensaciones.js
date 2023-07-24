import React from "react";
import TableBenef from "./TableBenef";
import requireAuth from "../requireAuth";

export default requireAuth(function Compensaciones() {
  return (
    <div>
      <h1>Compensaciones y Beneficios</h1>
      <TableBenef />
    </div>
  );
});
