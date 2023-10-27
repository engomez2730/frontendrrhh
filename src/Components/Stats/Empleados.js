import React from "react";
import { Chart } from "chart.js";
import { Space } from "antd";
import DashBoardCard from "./DashBoardCard";
import { UserOutlined } from "@ant-design/icons";
const Empleados = ({ stats }) => {
  return (
    <div>
      <div className="cardContent">
        <DashBoardCard
          title={"Empleados Totales"}
          value={stats?.totalEmployees}
          icon={
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(21, 127, 246 )",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
        />
        <DashBoardCard
          title={"Empleados Activos"}
          value={stats?.totalActiveEmployees }
          icon={
            <UserOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
        />
        <DashBoardCard
          title={"Empleados Inactivos"}
          value={stats?.totalInactiveEmployees}
          icon={
            <UserOutlined
              style={{
                color: "white",
                backgroundColor: "rgba(220, 27, 27)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default Empleados;
