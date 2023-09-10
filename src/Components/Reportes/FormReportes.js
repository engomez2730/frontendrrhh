import React, { useState } from "react";
import { Form, Select, Table, Input } from "antd";
import { CAMBIAR_ESTADO } from "../../actions";
import { connect } from "react-redux";
import Print from "../Print/Print";
import ReportesTemplate from "../Print/ReportesTemplate";
import { SearchOutlined, DollarCircleOutlined } from "@ant-design/icons";

export const FormReportes = (props) => {
  const [departamentoState, setDepartamentoState] = useState();
  const [puestoState, setpuestoState] = useState();

  const empleadosActivos = props.empleados?.filter((e) => {
    return e.estado === true && e.rol === "empleado";
  });

  function filterUsersByDepartment(users, departmentName) {
    if (departmentName === undefined) {
      return users;
    }
    return users?.filter((user) => user?.departamento === departmentName);
  }

  function filterUsersByPuesto(users, departmentName) {
    if (departmentName === undefined) {
      return users;
    }
    return users?.filter((user) => user?.puesto === departmentName);
  }

  const empleadosFinal = filterUsersByDepartment(
    empleadosActivos,
    departamentoState
  );

  const [form] = Form.useForm();

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
      title: "Salario",
      dataIndex: "salarioBruto",
      key: "celular",
      render: (text) => {
        return new Intl.NumberFormat("es-DO").format(text || 0);
      },
    },
  ];

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item label="Departamento" name="departamento">
          <Select
            style={{ width: "100%" }}
            placeholder="Seleciona los departamentos"
            onChange={(e) => setDepartamentoState(e)}
          >
            {props?.departamentos}
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Print
            componentToPrint={
              <ReportesTemplate
                title="Reporte"
                Table={
                  <Table
                    dataSource={empleadosFinal}
                    columns={columns}
                    pagination={false}
                  />
                }
                departamento={departamentoState}
                empleados={props.empleados}
              />
            }
          />
        </Form.Item>
      </Form>
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
