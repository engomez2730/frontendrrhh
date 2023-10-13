import React from "react";
import "./VerDepartamentos.css";
import TableDep from "./TableDep";
import requireAuth from "../requireAuth";
import { HomeOutlined } from "@ant-design/icons";

const VerDepartamentos = ({ departamentos }) => {
  return (
    <div className="verDepartamentos">
      <h1>
        Departamentos <HomeOutlined />
      </h1>
      <div className="tableDataDepar">
        <TableDep departamentos={departamentos} />
      </div>
    </div>
  );
};

export default requireAuth(VerDepartamentos);
