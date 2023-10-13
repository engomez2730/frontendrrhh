import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
import { Tag, Table, Button, Modal, Popconfirm } from "antd";
import rrhhApi from "../../apis/rrhhApi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import EditarBeneficios from "./EditarBeneficios";
import { CAMBIAR_ESTADO } from "../../actions";
moment.locale("es");

const PermisoVer = ({
  empleadoSelecionado,
  CAMBIAR_ESTADO,
  estado,
  onCLose,
}) => {
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);
  const [beneficioSelecioado, setBeneficioSelecionado] = useState({});

  const handleCancelCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const handleOkCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const onClickModalEliminar = async (e) => {
    await rrhhApi.delete(`beneficios/${e.key}`);
    CAMBIAR_ESTADO(!estado);
    onCLose();
  };

  const onClickModalEditar = async (e) => {
    setIsModalVerOpenCrear(true);
    setBeneficioSelecionado(e);
  };

  const columns = [
    {
      title: "Nombre",
      width: 150,
      dataIndex: "nombre",
      key: "name",
      fixed: "left",
      render: (e) => {
        return <Tag color="cyan">{e}</Tag>;
      },
    },
    {
      title: "Cantidad",
      dataIndex: "cantidadBeneficio",
      key: "apellido",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "createdAt",
      key: "apellido",
      render: (e) => {
        return <div>{moment(e)?.format("MMMM Do YYYY")}</div>;
      },
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 400,
      render: (text, values) => [
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={() => onClickModalEditar(values)}
        >
          Editar Beneficio
        </Button>,
        <Popconfirm
          title="Estas seguro que quieres eliminar este beneficio"
          onConfirm={() => onClickModalEliminar(values)}
          key="popConfirm"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Button type="danger" key="eliminar" style={{ marginLeft: "10px" }}>
            Eliminar Beneficio
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const beneficiosFinal = empleadoSelecionado?.Beneficios.map((ben) => {
    return {
      nombre: ben.nombreBeneficio,
      cantidadBeneficio: ben.cantidadBeneficio,
      createdAt: ben.createdAt,
      key: ben._id,
    };
  });

  return (
    <div className="verVacacionesModal">
      <Table dataSource={beneficiosFinal} columns={columns} bordered={true} />
      <Modal
        title="Editar Beneficios"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <EditarBeneficios
          onCLose={handleCancelCrear}
          beneficio={beneficioSelecioado}
          onCLoseParent={onCLose}
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

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(PermisoVer);
