import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  avisoSelecionado,
  cargarEmpleados,
  CAMBIAR_ESTADO,
  empleadoSelecionadoVer,
} from "../../actions/index";
import FormDespidos from "./formDespidos";
import CrearDesvinculo from "./CrearDesvinculo";

import moment from "moment";
moment.locale("uk");

const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.empleados) {
      setIsEmpleadosLoaded(false);
    }
  }, [props.estado]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Nombre",
      width: 200,
      dataIndex: "nombre",
      key: "name",
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus={true}
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
      key: "cedula",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 190,
      render: (text) => [
        <Button
          type="primary"
          key="despedir"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Despedir{" "}
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.empleadoSelecionadoVer(text?.key);
    showModal();
  };

  const empleados = props?.empleados?.map((e) => {
    return {
      nombre: e.nombre,
      apellido: e.apellido,
      correo: e.correo,
      celular: e.celular,
      cedula: e.cedula,
      key: e.id,
      PrestacionesLaborales: e.PrestacionesLaborales,
      contrato: e.contrato,
      createdAt: e.createdAt,
      direccion: e.direccion,
      estado: e.estado,
      pais: e.pais,
      provincia: e.provincia,
      salario: e.sueldoFijo,
      departamento: e.departamento,
      expiracionDelContrato: e.vencimientoDelContrato,
      Vacaciones: e.Vacaciones,
      rol: e.rol,
    };
  });

  const empleadosActivos = empleados?.filter((e) => {
    return e.estado === true && e.rol === "empleado";
  });
  return (
    <div>
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={empleadosActivos}
        bordered={true}
        pagination={{ pageSize: 5, total: empleados?.length }}
        loading={EmpleadosLoaded}
      />
      <Modal
        title="Despedir empleado"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <FormDespidos onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default connect(null, {
  avisoSelecionado,
  CAMBIAR_ESTADO,
  empleadoSelecionadoVer,
})(TablePerm);
