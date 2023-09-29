import React, { useState } from "react";
import FormReportes from "./FormReportes";
import requireAuth from "../requireAuth";
import { Select, Form } from "antd";
import VacacionesReportes from "./VacacionesReportes";
import "./Reportes.css";
import AnalisisReportes from "./AnalisisReportes";
import BuenaConductaReporte from "./BuenaConductaReporte";
import InduccionReporte from "./InduccionReporte";
import LicenciaDeConducir from "./LicenciaDeConducir";
const { Option } = Select;

const Reportes = ({ departamentos, empleados }) => {
  const [componentScreen, setComponentScreen] = useState("empleados");

  const handleSelectChange = (value) => {
    setComponentScreen(value); // Update the state when the user selects an option
  };

  return (
    <div className="reportes">
      <h1 className="headingReportes"> Reportes</h1>
      <div className="formReportes">
        <Form className="form">
          <Form.Item label="Seleciona el tipo de reporte">
            <Select
              value={componentScreen} // Set the selected value based on the state
              onChange={handleSelectChange} // Handle the change event to update the state
              style={{ width: 300 }}
            >
              <Option value="Departamentos">Departamentos</Option>
              <Option value="Vacaciones">Vacaciones</Option>
              <Option value="Analisis">Analisis</Option>
              <Option value="buenaConductaFechaExpiracion">
                Buena Conducta
              </Option>
              <Option value="induccion">Inducción</Option>
              <Option value="LicenciadeConducir">Licencia de Conducir</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className="content">
        {componentScreen === "Departamentos" && (
          <FormReportes empleados={empleados} />
        )}
        {componentScreen === "Vacaciones" && (
          <VacacionesReportes empleados={empleados} />
        )}
        {componentScreen === "Analisis" && (
          <AnalisisReportes empleados={empleados} />
        )}
        {componentScreen === "buenaConductaFechaExpiracion" && (
          <BuenaConductaReporte empleados={empleados} />
        )}
        {componentScreen === "induccion" && (
          <InduccionReporte empleados={empleados} />
        )}

        {componentScreen === "LicenciadeConducir" && (
          <LicenciaDeConducir empleados={empleados} />
        )}
      </div>
    </div>
  );
};

export default requireAuth(Reportes);
