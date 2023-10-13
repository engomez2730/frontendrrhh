import React from "react";
import StatsDespidos from "./StatsDespidos";
import TableDespidos from "./TableDespidos";
import { ClearOutlined } from "@ant-design/icons";

const Despidos = () => {
  return (
    <div className="verAnuncios">
      <h1>
        Despidos
      </h1>
      <div className="tableDataPer">
        <TableDespidos />
      </div>
    </div>
  );
};

export default Despidos;
