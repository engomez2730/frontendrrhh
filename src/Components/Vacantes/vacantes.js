import React from "react";
import VacanteStats from "./VacanteStats";
import TableVacantes from "./TableVacantes";
import requireAuth from "../requireAuth";

const Vacantes = () => {
  return (
    <div className="verAnuncios">
      <h1>Vacantes</h1>
      <div className="tableDataPer">
        <TableVacantes />
      </div>
    </div>
  );
};

export default requireAuth(Vacantes);
