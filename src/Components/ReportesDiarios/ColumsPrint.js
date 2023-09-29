import { Tag } from "antd";
import { formatDateOrKeepOriginal } from "../Utils/helperFunctions";

export const columnsPrint = [
  {
    title: "Nombre",
    width: 200,
    dataIndex: "nombre",
    key: "name",
    fixed: "left",
    align: "center",
    render: (field, values) => {
      return `${values.nombre} ${values.apellido}`;
    },
  },
  {
    width: 100,
    title: "Puesto",
    dataIndex: "puesto",
    key: "departamento",
    align: "center",
  },
  {
    width: 120,
    title: "Proyecto ",
    dataIndex: "proyectoActual",
    key: "Proyecto",
    align: "center",

    sorter: (a, b) => {
      return a.proyectoActual?.localeCompare(b?.proyectoActual);
    },
    defaultSortOrder: "ascend", // Set the default sort order to ascending
  },
  {
    width: 350,
    title: "Equipos que Opera",
    dataIndex: "Equipos",
    key: "equipos",
    render: (value) => {
      return (
        <div
          style={{
            width: "100%",
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
    width: 120,
    title: "Encargado",
    dataIndex: "encargado",
    key: "encargado",
    align: "center",
  },
  {
    width: 90,
    title: "Status",
    dataIndex: "StatusLaboral",
    key: "status",
    render: (value) => {
      let color = "";
      if (value === "Activo") {
        color = "blue";
      } else if (value === "Disponible") {
        color = "green";
      }
      return (
        <Tag
          color={color}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {value}
        </Tag>
      );
    },
  },
  {
    width: 90,
    title: "Comentario",
    dataIndex: "comentarioStatus",
    key: "comentario",
    align: "center",

    render: (value) => {
      const valueFinal = formatDateOrKeepOriginal(value);

      return <div>{valueFinal}</div>;
    },
  },
];
