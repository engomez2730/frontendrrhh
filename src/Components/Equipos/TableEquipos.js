import React, { useState } from "react";
import { Table, Input, Button, Popconfirm, message } from "antd";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { CAMBIAR_ESTADO } from "../../actions";
import moment from "moment";
import CustomModal from "../UI/CustomModal";
import EditarEquipo from "./EditarEquipo";
import rrhhApi from "../../apis/rrhhApi";
import handleError from "../../Data/errorHandle";
import { useDispatch, useSelector } from "react-redux";

const TableEquipos = ({ equipos, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [equipoSelecionado, setEquiposSelecionado] = useState({});
  const dispatch = useDispatch();

  const estado = useSelector((state) => state?.cambiarState);

  const openModal = (e, text) => {
    setEquiposSelecionado(text);
    setModalVisible(true);
  };

  const eliminarEquipo = async (e, equipo) => {
    console.log(equipo);
    try {
      await rrhhApi.delete(`/equipos/${equipo._id}`);
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
      title: "Ficha",
      dataIndex: "ficha",
      key: "ficha",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "apellido",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "createdAt",
      key: "cedula",
      render: (text) => {
        return <div>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</div>;
      },
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 430,
      render: (text) => [
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => openModal(e, text)}
        >
          Editar Equipo
        </Button>,
        <Popconfirm
          okText="Si"
          cancelText="No"
          title="Estas seguro que quieres eliminar este aviso？"
          onConfirm={(e) => eliminarEquipo(e, text)}
          key="popConfirm"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Button type="danger" key="eliminar" style={{ marginLeft: "10px" }}>
            Eliminar Puesto
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={equipos} loading={loading} />
      <CustomModal
        open={modalVisible}
        onClose={closeModal}
        title="Crear Equipo"
        width={800}
        okText="Esta bien"
        cancelText="Cerrar"
        content={
          <EditarEquipo onCloseModal={closeModal} equipo={equipoSelecionado} />
        }
      />
    </div>
  );
};

export default TableEquipos;
