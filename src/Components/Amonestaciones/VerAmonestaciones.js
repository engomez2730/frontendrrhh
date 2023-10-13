import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Table, Button, Modal, Tag, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import EditarAmonestacion from "./EditarAmonestacion";
import { CAMBIAR_ESTADO } from "../../actions";
import rrhhApi from "../../apis/rrhhApi";
moment.locale("es");

const PermisoVer = ({
  empleadoSelecionado,
  onCLose,
  CAMBIAR_ESTADO,
  estado,
}) => {
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);
  const [amonestacionSelecioanda, setAmonestacionSelecioanda] = useState();

  const onClickModalCrear = (text) => {
    setAmonestacionSelecioanda(text);
    setIsModalVerOpenCrear(true);
  };

  const handleOkCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const handleCancelCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const onClickModalEliminar = async (e) => {
    await rrhhApi.delete(`amonestaciones/${e.key}`);
    CAMBIAR_ESTADO(!estado);
    onCLose();
  };

  const columns = [
    {
      title: "Nombre",
      width: 200,
      dataIndex: "nombre",
      key: "name",
      render: (text) => {
        return <Tag color="red">{text}</Tag>;
      },
    },
    {
      width: 300,

      title: "Cantidad de amonestación",
      dataIndex: "cantidadAmonestacion",
      key: "cantidadAmo",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "createdAt",
      key: "cedula",
      width: 250,
      render: (text) => {
        return moment(text).format("MMMM Do YYYY");
      },
    },

    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 550,
      render: (text, values) => [
        <Button
          type="warning"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={() => onClickModalCrear(values)}
        >
          Editar Amonestaciones
        </Button>,
        <Popconfirm
          title="Estas seguro que quieres eliminar este beneficio"
          onConfirm={() => onClickModalEliminar(values)}
          key="popConfirm"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Button type="danger" key="eliminar" style={{ marginLeft: "10px" }}>
            Eliminar Amonestación
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const AmonestacionesFinal = empleadoSelecionado?.Amonestaciones.map((e) => {
    return {
      nombre: e.nombreAmonestacion,
      cantidadAmonestacion: e.cantidadAmonestacion,
      createdAt: e.createdAt,
      key: e._id,
    };
  });

  return (
    <div className="verVacacionesModal">
      <Table dataSource={AmonestacionesFinal} columns={columns} />

      <Modal
        title="Crear Amonestaciones"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
        onCLose={handleCancelCrear}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <EditarAmonestacion
          amonestacion={amonestacionSelecioanda}
          onCLoseParent={onCLose}
          onClose={handleCancelCrear}
        />
      </Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    empleado: state.usuarioSelecionadoVer?.usuarioSelecionadoVer,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, { CAMBIAR_ESTADO })(PermisoVer);
