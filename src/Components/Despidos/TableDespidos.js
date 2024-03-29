import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  avisoSelecionado,
  cargarEmpleados,
  CAMBIAR_ESTADO,
  empleadoSelecionadoVer,
  GET_DESPIDOS_ACTION,
  DESPIDO_SELECIONADO_ACTION,
} from "../../actions/index";
import VerDespido from "./VerDespido";
import { EyeOutlined } from "@ant-design/icons";

import moment from "moment";
import requireAuth from "../requireAuth";
moment.locale("uk");

const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);

  useEffect(() => {
    props.GET_DESPIDOS_ACTION();
  }, [props.estado]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOkVER = () => {
    setIsModalVerOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelVer = () => {
    setIsModalVerOpen(false);
  };

  const columns = [
    {
      title: "Empleado",
      width: 200,
      dataIndex: "Usuario",
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
      render: (text) => {
        return <>{text?.nombre}</>;
      },
    },
    {
      title: "Fecha de Despido",
      dataIndex: "fechaDespido",
      key: "apellido",
      render: (text) => {
        return <div>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</div>;
      },
    },
    {
      title: "Prestaciones",
      dataIndex: "prestacionesLaborables",
      key: "cedula",
      render: (text) => {
        return (
          <div>
            {new Intl.NumberFormat("es-DO", {
              style: "currency",
              currency: "DOM",
            }).format(text)}
          </div>
        );
      },
    },
    {
      title: "Tipo de Despido",
      dataIndex: "tipoDeDespido",
      key: "cedula",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 300,
      render: (text) => [
        <Button
          type="primary"
          key="despedir"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Despido
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.DESPIDO_SELECIONADO_ACTION(text.key);
    showModal();
  };

  const despidos = props?.despidos?.map((e) => {
    return {
      tipoDeDespido: e.tipoDeDespido,
      key: e._id,
      Usuario: e.Usuario,
      fechaDespido: e.fechaDespido,
      descripcion: e.descripcion,
      prestacionesLaborables: e.prestacionesLaborables,
    };
  });

  return (
    <div>
      <h1>
        Ver Despidos <EyeOutlined />
      </h1>

      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={despidos}
        bordered={true}
        pagination={{ pageSize: 5, total: despidos?.length }}
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
        <VerDespido despido={props?.despidoSelect} />
      </Modal>
      <Modal
        title="Desvincular Empleado"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      ></Modal>
    </div>
  );
};
const StateMapToProps = (state) => {
  return {
    empleados: state.empleados.empleados,
    despidos: state.Despidos.despidos,
    despidoSelect: state.despidoSelecionado.despidoSelecionado,
  };
};
export default requireAuth(
  connect(StateMapToProps, {
    cargarEmpleados,
    avisoSelecionado,
    CAMBIAR_ESTADO,
    empleadoSelecionadoVer,
    GET_DESPIDOS_ACTION,
    DESPIDO_SELECIONADO_ACTION,
  })(TablePerm)
);
