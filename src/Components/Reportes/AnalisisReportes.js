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
      filters: [
        {
          text: "Administracion",
          value: "Administracion",
        },
        {
          text: "Inmobiliaria",
          value: "Inmobiliaria",
        },
      ],
      onFilter: (value, record) => {
        return record?.departamento?.indexOf(value) === 0;
      },
    },
    {
      title: "Fecha de expiración de Analisis",
      dataIndex: "analisisFechaDeExpiracion",
      key: "celular",
      align: "center",
      render: (analisisFechaDeExpiracion) => {
        return (
          <div>
            {analisisFechaDeExpiracion ? (
              <Tag>
                {moment(analisisFechaDeExpiracion).format("MMMM Do YYYY")}
              </Tag>
            ) : (
              <Tag>No tiene</Tag>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Print
        buttonText="Reporte de Analisis"
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
