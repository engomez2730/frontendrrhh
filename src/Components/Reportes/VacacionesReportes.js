import React, { useState } from "react";
import { Form, Tag, Table, Input } from "antd";
import { CAMBIAR_ESTADO } from "../../actions";
import { connect } from "react-redux";
import Print from "../Print/Print";
import ReportesTemplate from "../Print/ReportesTemplate";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

export const FormReportes = (props) => {
  const empleadosActivos = props.empleados?.filter((e) => {
    return e.estado === true && e.rol === "empleado";
  });

  const columns = [
    {
      title: "Nombre",
      width: 100,
      dataIndex: "nombre",
      key: "name",
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            size="large"
            autoFocus
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.nombre.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "cedula",
    },
    {
      title: "Salario",
      dataIndex: "salarioBruto",
      key: "cedula",
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "departamento",
    },
    {
      title: "Proximas Vacaciones",
      dataIndex: "Vacaciones",
      key: "Vacaciones",
      align: "center",

      render: (Vacaciones) => {
        return (
          <div>
            {Vacaciones[Vacaciones?.length - 1]?.siguientesVacacionesFecha ? (
              <Tag>
                {moment(
                  Vacaciones[Vacaciones?.length - 1]?.siguientesVacacionesFecha
                ).format("MMMM Do YYYY")}
              </Tag>
            ) : (
              <Tag>Todavia no ha tomado</Tag>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Print
        buttonText="Reporte de Vaaciones"
        componentToPrint={
          <ReportesTemplate
            title="Reporte"
            Table={
              <Table
                dataSource={empleadosActivos}
                columns={columns}
                pagination={false}
              />
            }
            empleados={props.empleados}
          />
        }
      />
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(FormReportes);
