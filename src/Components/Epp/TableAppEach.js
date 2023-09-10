import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import TemplatePrint from "../Print/TemplatePrint";
import {
  avisoSelecionado,
  CAMBIAR_ESTADO,
  GET_EPP_ACTION,
} from "../../actions/index";
import CrearEpp from "./CrearEpp";
import moment from "moment";
import "moment/locale/es";
import PrintComponent from "../Print/Print";
moment.locale("es");

const TablePerm = (props) => {
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.usuario) {
      setIsEmpleadosLoaded(false);
    }
  }, [props.estado]);

  const showModalCrear = () => {
    setIsModalVerOpenCrear(true);
  };
  const handleOkCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const handleCancelCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const columns = [
    {
      title: "Fecha de Entrega",
      width: 250,
      dataIndex: "createdAt",
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
        return <>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</>;
      },
    },
    {
      title: "Camisa",
      dataIndex: "camisa",
      key: "Camisa",
      width: 120,
      render: (text) => {
        return (
          <>
            {text ? (
              <Tag color="cyan">Entregada</Tag>
            ) : (
              <Tag color="red">Pendiente</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Lentes",
      dataIndex: "lentes",
      key: "Lentes",
      width: 120,
      render: (text) => {
        return (
          <>
            {text ? (
              <Tag color="cyan">Entregada</Tag>
            ) : (
              <Tag color="red">Pendiente</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Botas",
      dataIndex: "botas",
      key: "botas",
      width: 120,
      render: (text) => {
        return (
          <>
            {text ? (
              <Tag color="cyan">Entregada</Tag>
            ) : (
              <Tag color="red">Pendiente</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Sigueinte Fecha de Entrega",
      dataIndex: "siguienteFechaEntrega",
      key: "siguienteFechaEntrega",
      width: 400,
      render: (text) => {
        return <>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</>;
      },
    },
  ];

  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };

  const epps = props?.usuario?.Epps?.map((e) => {
    return {
      createdAt: e.createdAt,
      key: e._id,
      botas: e.botas,
      lentes: e.lentes,
      camisa: e.camisa,
      siguienteFechaEntrega: e.siguienteFechaEntrega,
      Usuario: e.Usuario,
    };
  });

  return (
    <div>
      <Button
        type="primary"
        key="crear"
        style={{ marginLeft: "10px", marginTop: "90px" }}
        onClick={(e) => onClickModalCrear(e)}
      >
        Crear Epp para {props.usuario?.nombre}
      </Button>
      ,
      <Table
        style={{ marginTop: "50px", width: "90%" }}
        columns={columns}
        dataSource={epps}
        bordered={true}
        pagination={{ pageSize: 5, total: epps?.length }}
      />
      <Modal
        title="Crear Epp"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
      >
        <CrearEpp
          usuario={props?.usuario}
          closeModal={props.closeModal}
          onCloseModal2={setIsModalVerOpenCrear}
        />
      </Modal>
      <PrintComponent
        componentToPrint={
          <TemplatePrint
            title="EPPS"
            nombre={props?.usuario.nombre}
            Table={
              <Table
                style={{ marginTop: "50px", width: "90%" }}
                columns={columns}
                dataSource={epps}
                bordered={true}
                pagination={{ pageSize: 5, total: epps?.length }}
              />
            }
          />
        }
      />
    </div>
  );
};

const StateMapToProps = (state) => {
  return { estado: state.cambiarState };
};

export default connect(StateMapToProps, {
  GET_EPP_ACTION,
  avisoSelecionado,
  CAMBIAR_ESTADO,
})(TablePerm);
