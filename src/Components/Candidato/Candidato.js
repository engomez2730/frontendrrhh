import React from "react";
import TableCandi from "./TableCandi";
import requireAuth from "../requireAuth";
import { BookOutlined } from "@ant-design/icons";

const Candidato = ({ entrevistados }) => {
  return (
    <div className="verAnuncios">
      <h1>
        Candidatos <BookOutlined />
      </h1>
      <div className="tableDataPer">
        <TableCandi entrevistados={entrevistados} />
      </div>
    </div>
  );
};

export default requireAuth(Candidato);
