import React, { useState } from "react";
import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, Input, message } from "antd";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
import rrhhApi from "../../apis/rrhhApi";
import CustomModal from "../UI/CustomModal";
import EditarProyectos from "./EditarProyectos";

const TableProyecto = ({ proyectos }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [equipoSelecionado, setEquiposSelecionado] = useState({});

  const estado = useSelector((state) => state?.cambiarState);

  const openModal = (e, text) => {
    setEquiposSelecionado(text);
    setModalVisible(true);
  };

  const eliminarEquipo = async (e, equipo) => {
    try {
      await rrhhApi.delete(`/proyectos/${equipo._id}`);
      dispatch(CAMBIAR_ESTADO(!estado));

      message.success("Equipo eliminado con exito", 3);
    } catch (err) {
      handleError(err);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
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
      title: "Encargado",
      dataIndex: "encargado",
      key: "apellido",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "apellido",
    },

    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 480,
      render: (text) => [
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => openModal(e, text)}
        >
          Editar Proyecto
        </Button>,
        <Popconfirm
          title="Estas seguro que quieres eliminar este aviso？"
          onConfirm={(e) => eliminarEquipo(e, text)}
          key="popConfirm"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Button type="danger" key="manejar" style={{ marginLeft: "10px" }}>
            Eliminar Proyecto
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const proyectosFinal = proyectos?.map((e) => {
    return {
      nombre: e.nombre,
      descripcion: e.descripcion,
      encargado: e.encargado,
      _id: e._id,
    };
  });

  return (
    <div>
      <Table dataSource={proyectosFinal} columns={columns} />
      <CustomModal
        open={modalVisible}
        onClose={closeModal}
        title="Editar Proyecto"
        width={800}
        okText="Esta bien"
        cancelText="Cerrar"
        content={
          <EditarProyectos
            onCloseModal={closeModal}
            equipo={equipoSelecionado}
          />
        }
      />
    </div>
  );
};
export default TableProyecto;
