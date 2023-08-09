import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  GET_LICENCIAS_ACTION,
  CAMBIAR_ESTADO,
  SELECT_LICENCIAS_ACTION,
} from "../../actions/index";
import moment from "moment";
import VerLicenEach from "./VerLicenEach";

const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(() => {
    props.GET_LICENCIAS_ACTION();
  }, [props.estado]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalCrear = () => {
    setIsModalVerOpenCrear(true);
  };
  const showModalEdit = () => {
    setIsModalVerOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOkVER = () => {
    setIsModalVerOpen(false);
  };
  const handleOkCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelVer = () => {
    setIsModalVerOpen(false);
  };
  const handleCancelCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const columns = [
    {
      title: "Razon",
      width: 200,
      dataIndex: "razon",
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
      title: "Feach de Creación",
      dataIndex: "tiempoDeLicencia",
      key: "cedula",
      width: 310,
      render: (e) => {
        return moment(e[0]).format("MMMM Do YYYY");
      },
    },
    {
      title: "Feach de Finalizacion",
      dataIndex: "tiempoDeLicencia",
      key: "cedula",
      width: 310,
      render: (e) => {
        return moment(e[1]).format("MMMM Do YYYY");
      },
    },
    {
      title: "Feach de Finalizacion",
      dataIndex: "tiempoDeLicencia",
      key: "cedula",
      width: 310,
      render: (e, text) => {
        return (
          <Tag color={moment(e[1]).isBefore(moment()) ? "red" : "blue"}>
            {moment(e[1]).isBefore(moment()) ? "Vencida" : "Activa"}
          </Tag>
        );
      },
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Licencia
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.SELECT_LICENCIAS_ACTION(text._id);
    showModal();
  };

  /*   const eliminaranuncio = async (e,text) =>{
    const res = await Api.delete(`permisos/${text.key}`)
    props.CAMBIAR_ESTADO(!props.estado)
  }
 */
  const onClickModalVer = (e, text) => {
    props.SELECT_LICENCIAS_ACTION(text._id);
    showModalEdit();
  };
  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };
  return (
    <div>
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns} /* scroll={{x: 1300, }}  */
        dataSource={props.licencias}
        bordered={true}
        pagination={{ pageSize: 5, total: props.licencias?.length }}
      />
      <Modal
        title="Ver Licencia"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <VerLicenEach />
      </Modal>
      <Modal
        title="Manejar Licencias"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
      ></Modal>
      <Modal
        title="Crear Permiso"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
      ></Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    permisoSelecioandoData: state.permisoSelecionado,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  GET_LICENCIAS_ACTION,
  SELECT_LICENCIAS_ACTION,
  CAMBIAR_ESTADO,
})(TablePerm);
