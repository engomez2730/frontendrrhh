import React from "react";
import FormReportes from "./FormReportes";
import { Select } from "antd";
const { Option } = Select;

const Reportes = ({ departamentos, empleados }) => {
  const departamentosFinal = departamentos?.map((e) => {
    return (
      <Option value={e.nombre} label={e.nombre} key={e.nombre}>
        <div className="demo-option-label-item">{e.nombre}</div>
      </Option>
    );
  });

  return (
    <div>
      <h1>Reportes</h1>
      <FormReportes departamentos={departamentosFinal} empleados={empleados} />
    </div>
  );
};

export default Reportes;
