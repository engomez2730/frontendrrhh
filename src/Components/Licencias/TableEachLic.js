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
import EditarLicencia from "./EditarLicencia";

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
      title: "Tipo de Licencia",
      width: 350,
      dataIndex: "tipoDeLicencia",
      key: "name",
      fixed: "left",
      align: "center",
    },
    {
      title: "Feach de Creación",
      dataIndex: "tiempoDeLicencia",
      key: "cedula",
      align: "center",

      width: 390,
      render: (e) => {
        return moment(e[0]).format("MMMM Do YYYY");
      },
    },
    {
      title: "Feach de Finalización",
      dataIndex: "tiempoDeLicencia",
      key: "cedula",
      align: "center",

      width: 390,
      render: (e) => {
        return moment(e[1]).format("MMMM Do YYYY");
      },
    },
    {
      title: "Estado Licencia",
      dataIndex: "tiempoDeLicencia",
      align: "center",

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
      align: "center",

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
          Editar Tiempo de Licenca
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

  return (
    <div>
      <Table
        style={{ marginTop: "50px", width: "95%" }}
        columns={columns} /* scroll={{x: 1300, }}  */
        dataSource={props.licencias}
        bordered={true}
        pagination={{ pageSize: 5, total: props.licencias?.length }}
      />
      <Modal
        title="Editar Licencia"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <EditarLicencia
          onCLose={handleCancel}
          onCloseParent={props.onCloseParent}
        />
      </Modal>
      <Modal
        title="Manejar Licencias"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      ></Modal>
      <Modal
        title="Crear Licencia"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      ></Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    Licencia: state.licenciaSelecionada?.licenciaSelect,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  GET_LICENCIAS_ACTION,
  SELECT_LICENCIAS_ACTION,
  CAMBIAR_ESTADO,
})(TablePerm);
