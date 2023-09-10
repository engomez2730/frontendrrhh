import React from "react";
import TableCandi from "./TableCandi";
import requireAuth from "../requireAuth";

const Candidato = ({ entrevistados }) => {
  return (
    <div className="verAnuncios">
      <h1>Candidatos</h1>
      <div className="tableDataPer">
        <TableCandi entrevistados={entrevistados} />
      </div>
    </div>
  );
};

export default requireAuth(Candidato);
