import { Table, Button, Modal, Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  GET_NOMINASCOMPLETAS_ACTION,
  cargarEmpleados,
  NOMINAS_COMPLETA_SELECIONADA_ACTION,
} from "../../actions/index";
import { connect } from "react-redux";
import { empleadoSelecionadoVer } from "../../actions/index";
import { usuarioEditarSeleciondo, editarUsuario } from "../../actions/index";
import { SearchOutlined } from "@ant-design/icons";
import CrearNomina from "./CrearNomina";
import VerNomina from "./VerNomina";
import TablaLinea from "../LineaTiempo/TablaLinea";

const TableFinal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalCrearOpen] = useState(false);

  useEffect(() => {
    props.GET_NOMINASCOMPLETAS_ACTION();
    props.cargarEmpleados();
  }, [props.estado]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalEdit = () => {
    setIsModalVerOpen(true);
  };
  const showModalCrear = () => {
    setIsModalCrearOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOkVER = () => {
    setIsModalVerOpen(false);
  };
  const handleOkCrear = () => {
    setIsModalCrearOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelVer = () => {
    setIsModalVerOpen(false);
  };
  const handleCancelCrear = () => {
    setIsModalCrearOpen(false);
  };

  const columns = [
    {
      title: "Mes",
      width: 140,
      dataIndex: "mes",
      key: "mes",
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
        return record.mes.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Año",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => {
        const newArreglo = new Array(text);
        return (
          <>
            {newArreglo.map((newArreglo) => {
              let color = newArreglo.length > 5 ? "geekblue" : "green";
              if (newArreglo === "Pendiente") {
                color = "geekblue";
              } else if (newArreglo === "En Proceso") {
                color = "orange";
              } else if (newArreglo === "Completa") {
                color = "green";
              } else if (newArreglo === "Autorizada") {
                color = "cyan";
              }
              return (
                <Tag color={color} key={newArreglo}>
                  {newArreglo.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Empleados",
      dataIndex: "empleados",
      key: "empleados",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 400,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Ver Nomina
        </Button>,
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          disabled={text.estado === "Autorizada" ? true : false}
          onClick={(e) => onClickModal(e, text)}
        >
          Manejar Nomina
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    console.log(text);
    props.NOMINAS_COMPLETA_SELECIONADA_ACTION(text.key);
    showModal();
  };

  const onClickModalVer = (e, text) => {
    props.NOMINAS_COMPLETA_SELECIONADA_ACTION(text.key);
    showModalEdit();
  };

  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };

  const nominasCompletas = props.nominasCompletas?.map((e) => {
    return {
      key: e._id,
      mes: e.mes,
      year: e.year,
      estado: e.estado,
      empleados: e.totalEmpleados,
      Nominas: e.Nominas,
    };
  });

  return (
    <>
      <Button
        type="primary"
        key="crear"
        style={{ marginLeft: "10px", marginTop: "90px" }}
        onClick={() => onClickModalCrear()}
      >
        Crear Nomina
      </Button>
      ,
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={nominasCompletas}
        bordered={true}
        pagination={{ pageSize: 6, total: nominasCompletas?.length }}
      />
      <Modal
        title="Editar Nomina"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1600}
      >
        <TablaLinea />
      </Modal>
      <Modal
        title="Ver Nomina"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
      >
        <VerNomina nomina={props?.nomina} />
      </Modal>
      <Modal
        title="Crear Nomina"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
      >
        <CrearNomina />
      </Modal>
    </>
  );
};

const stateMapToProps = (state) => {
  return {
    nominasCompletas: state.nominasCompletas.nominasCompletas,
    usuarioFinal: state.usuarioEditadoFinal,
    estado: state.cambiarState,
    usuarioSelecionado: state.usuarioSelecionadoVer.usuarioSelecionadoVer,
    empleados: state.empleados,
    nomina: state.nominaCompletaSelect.nominaCompletaSelect,
  };
};

export default connect(stateMapToProps, {
  GET_NOMINASCOMPLETAS_ACTION,
  cargarEmpleados,
  empleadoSelecionadoVer,
  usuarioEditarSeleciondo,
  NOMINAS_COMPLETA_SELECIONADA_ACTION,
  editarUsuario,
})(TableFinal);
