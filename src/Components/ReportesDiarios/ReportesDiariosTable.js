import React, { useState } from "react";
import { Table, Button, Input, DatePicker, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Print from "../Print/Print";
import TemplatePrint from "../Print/TemplatePrint";
import { columnsPrint } from "./ColumsPrint";
import CustomModal from "../UI/CustomModal";
import EditarEmpleadoReporte from "./EditarEmpleadoReporte";
import moment from "moment";
const ReportesDiariosTable = ({ empleados, proyectos }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [empleadoSelecionado, setEmpleadoSelecionado] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const openModal = (text) => {
    setEmpleadoSelecionado(text);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const proyectosFiler = proyectos?.map((e) => {
    return {
      text: e.nombre,
      value: e.nombre,
    };
  });

  const columns = [
    {
      title: "Nombre",
      width: 100,
      dataIndex: "nombre",
      key: "name",
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            size="large"
            autoFocus
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
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "cedula",
    },
    {
      title: "Proyecto",
      dataIndex: "proyectoActual",
      key: "departamento",
      filters: proyectosFiler,
      sorter: (a, b) => {
        const result = a.proyectoActual.localeCompare(b.proyectoActual);
        return result;
      },
      defaultSortOrder: "ascend", // Set the default sort order to ascending
    },
    {
      width: 200,
      title: "Equipos que Opera",
      dataIndex: "Equipos",
      key: "equipos",
      render: (value) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {value.length > 1 ? value.map((e) => <Tag>{e}</Tag>) : "Ninguno"}
          </div>
        );
      },
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 250,
      render: (value, values) => [
        <Button
          type="warning"
          key="editar"
          onClick={() => openModal(values)}
          style={{
            marginLeft: "10px",
            backgroundColor: "#0CAF40",
            color: "#fff",
          }}
        >
          Editar Empleado
        </Button>,
      ],
    },
  ];

  function getEncargadoForProject(projects, projectName) {
    // Find the project that matches the given name
    const matchedProject = projects.find(
      (project) => project.nombre === projectName
    );

    // If a matching project is found, return its "encargado" value; otherwise, return null
    return matchedProject ? matchedProject.encargado : null;
  }

  const empleadosFinal = empleados
    ?.map((e) => {
      return {
        nombre: e.nombre,
        apellido: e.apellido,
        cedula: e.cedula,
        proyectoActual: e.proyectoActual,
        Equipos: e.Equipos,
        puesto: e.puesto,
        encargado: getEncargadoForProject(proyectos, e.proyectoActual),
        rol: e.rol,
        estado: e.estado,
        StatusLaboral: e.StatusLaboral,
        comentarioStatus: e.comentarioStatus,
        id: e._id,
      };
    })
    .filter((e) => e.rol === "empleado" && e.estado !== false);

  return (
    <>
      <Table
        dataSource={empleadosFinal}
        columns={columns}
        className="tableReportes"
        pagination={{ pageSize: 5, total: empleadosFinal?.length }}
      />

      <div>
        <DatePicker
          value={selectedDate} // Set the selected date
          onChange={handleDateChange} // Handle date selection
          format="YYYY-MM-DD" // Specify the date format
        />
      </div>

      <CustomModal
        open={modalVisible}
        onClose={closeModal}
        title="Editar Proyecto"
        width={800}
        content={
          <EditarEmpleadoReporte
            empleado={empleadoSelecionado}
            onClose={closeModal}
          />
        }
      />

      <Print
        buttonText="Generar Reporte"
        componentToPrint={
          <TemplatePrint
            title="Reporte Diario"
            fechaReporte={selectedDate}
            Table={
              <Table
                dataSource={empleadosFinal}
                columns={columnsPrint}
                pagination={false}
                bordered={true}
                size="small"
              />
            }
          />
        }
      />
    </>
  );
};

export default ReportesDiariosTable;
