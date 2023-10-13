import React from "react";
import { Badge, Descriptions } from "antd";

const App = ({
  empleadosTotales,
  empleadosActivos,
  LicenciaMedica,
  LicenciaPorMaternidad,
  empleadosDisponibles,
}) => (
  <Descriptions title="Resumen" layout="vertical" bordered={true}>
    <Descriptions.Item
      contentStyle={{ fontWeight: "600" }}
      label="Empleados Totales"
    >
      {empleadosTotales || 0}
    </Descriptions.Item>

    <Descriptions.Item
      contentStyle={{ fontWeight: "600" }}
      label="Empleados Activos"
    >
      {empleadosActivos || 0}
    </Descriptions.Item>
    <Descriptions.Item
      contentStyle={{ fontWeight: "600" }}
      label="Empleados A 4 Horas"
    >
      {empleadosDisponibles}
    </Descriptions.Item>

    <Descriptions.Item
      contentStyle={{ fontWeight: "600" }}
      label="Empleados con licencias Medicas"
    >
      {LicenciaMedica}
    </Descriptions.Item>
    <Descriptions.Item
      contentStyle={{ fontWeight: "600" }}
      label="Empleados con licencia por maternidad "
    >
      {LicenciaPorMaternidad}
    </Descriptions.Item>
  </Descriptions>
);
export default App;
