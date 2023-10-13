import { Table, Button, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import rrhhApi from "../../apis/rrhhApi";
import { Modal } from "antd";
import VerDepartamento from "./VerDepartamento";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { verDepartamento, CAMBIAR_ESTADO } from "../../actions/index";
import EditarDepartamentos from "./EditarDepartamentos";
import CrearDepartModal from "./CrearDepartModal";
import DeparEmpleados from "./DeparEmpleados";

const App = (props) => {
  const [open, setOpen] = useState(false);
  const [openDep, setOpenDep] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.departamentos) {
      setIsEmpleadosLoaded(false);
    }
  }, []);

  const onVerSelect = (text) => {
    setOpen(!open);
    props.verDepartamento(text);
  };

  const onEditarSelect = (text) => {
    setOpenDep(!openDep);
    props.verDepartamento(text);
  };

  const eliminateOne = async (key) => {
    console.log(key);
    try {
      await rrhhApi.delete(`/departamentos/${key}`);
      props.CAMBIAR_ESTADO(!props?.estado);
    } catch (err) {
      alert(err);
    }
  };

  const handleCancelCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const handleOkCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const showModalCrear = () => {
    setIsModalVerOpenCrear(true);
  };

  useEffect(() => {
    console.log("Cambie");
  }, [props.estado]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      fixed: "left",
    },
    {
      title: "Encargado",
      dataIndex: "encargado",
      key: "age",
      fixed: "left",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "1",
    },
    {
      title: "Empleados",
      dataIndex: "empleadosLength",
      key: "1",
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 300,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={() => onVerSelect(text)}
        >
          Ver
        </Button>,
        <Button
          type="warning"
          key="editar"
          style={{ marginLeft: "10px" }}
          onClick={() => onEditarSelect(text)}
        >
          Editar
        </Button>,
        <Popconfirm
          title="Estas seguro que quieres eliminar este departamento"
          onConfirm={() => eliminateOne(text.key)}
          key="popConfirm"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Button type="danger" key="eliminar" style={{ marginLeft: "10px" }}>
            Eliminar
          </Button>
          ,
        </Popconfirm>,
      ],
    },
  ];

  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };

  const dataFinal = props.departamentos?.map((e) => {
    return {
      key: e._id,
      nombre: e.nombre,
      encargado: e.encargado,
      descripcion: e.descripcion,
      empleadosLength: e.Empleados.length,
      empleados: e.Empleados,
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
        Crear Departamento
      </Button>
      ,
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        dataSource={dataFinal}
        bordered={true}
        pagination={{ pageSize: 5, total: props.dataFinal?.length }}
        loading={DeparEmpleados}
        scroll={{
          x: 1300,
        }}
      />
      <Modal
        title="Ver Departamento"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <VerDepartamento departamento={props.departamento} />
      </Modal>
      <Modal
        title="Ver Departamento"
        centered
        open={openDep}
        onOk={() => setOpenDep(false)}
        onCancel={() => setOpenDep(false)}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <EditarDepartamentos departamento={props.departamento} />
      </Modal>
      <Modal
        title="Crear Departamento"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <CrearDepartModal />
      </Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    departamento: state.departamentoSelecionado.departamentoSelecionado,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  verDepartamento,
  CAMBIAR_ESTADO,
})(App);
