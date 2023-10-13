import React from "react";
import "./Vacaciones.css";
import TableVac from "./TableVac";
import requireAuth from "../requireAuth";
import { CalendarOutlined } from "@ant-design/icons";

const Vacaciones = ({ empleados }) => {
  return (
    <div className="verVacaciones">
      <h1>Vacaciones <CalendarOutlined/></h1>
      <div className="tableDataVac">{<TableVac empleados={empleados} />} </div>
    </div>
  );
};

export default requireAuth(Vacaciones);
