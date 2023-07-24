import React, { useEffect } from "react";
import FormBuscador from "./FormBuscar";
import Descriptions from "./Descriptions";
import { connect } from "react-redux";
import { Empty } from "antd";
import { BUSCADOR_EMPLEADOS_GET } from "../../actions";

import "./Buscador.css";
import requireAuth from "../requireAuth";

const Buscador = ({ buscadorData, BUSCADOR_EMPLEADOS_GET }) => {
  useEffect(() => {
    return () => {
      BUSCADOR_EMPLEADOS_GET(undefined);
    };
  }, []);

  const renderDesc = () => {
    if (buscadorData) {
      return <Descriptions />;
    } else {
      return <Empty style={{ marginTop: "200px" }} />;
    }
  };

  return (
    <div className="buscador">
      <FormBuscador />
      {renderDesc()}
    </div>
  );
};

const stateMapToProps = (state) => {
  return { buscadorData: state.BuscadorEmpleados.buscadorEmpleados };
};

export default requireAuth(
  connect(stateMapToProps, {
    BUSCADOR_EMPLEADOS_GET,
  })(Buscador)
);
