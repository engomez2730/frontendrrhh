import React from "react";
import TableVacantes from "./TableVacantes";
import requireAuth from "../requireAuth";

const Vacantes = ({ vacantes }) => {
  return (
    <div className="verAnuncios">
      <h1>Vacantes</h1>
      <div className="tableDataPer">
        <TableVacantes vacantes={vacantes} />
      </div>
    </div>
  );
};

export default requireAuth(Vacantes);
