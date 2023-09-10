import { Col, Row, Statistic } from "antd";
import React from "react";
import { connect } from "react-redux";

const StatsCard = ({ empleados }) => {
  const EmpleadosActivos = empleados?.filter((e) => {
    return e.estado === true;
  });
  const Data = [
    {
      title: "Empleados Registrados Total",
      value: empleados?.length,
    },
    {
      title: "Empleados Registrados Activos",
      value: EmpleadosActivos?.length,
    },
    {
      title: "Empleados Registrados Inactivos",
      value: empleados?.length - EmpleadosActivos?.length,
    },
  ];

  return (
    <Row gutter={18}>
      {Data.map((e) => {
        return (
          <Col span={5} key={e.title}>
            <Statistic
              title={e.title}
              value={e.value}
              className="card"
              style={e.style}
            />
          </Col>
        );
      })}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return { empleados: state.empleados.empleados, estado: state.cambiarState };
};

export default connect(mapStateToProps)(StatsCard);
