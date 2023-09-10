import { Table, Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const TableEach = ({ Permisos }) => {
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
      title: "Descripción",
      dataIndex: "descripcion",
      key: "Descripción",
    },
    {
      title: "fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (e) => {
        return moment(e).format("MMMM Do YYYY");
      },
    },
    {
      title: "estado",
      dataIndex: "fecha",
      key: "estado",
      render: (e) => {
        return moment(e).isBefore(moment()) ? (
          <Tag color="red">Permiso Tomado</Tag>
        ) : (
          <Tag
            color="blue
        "
          >
            Permiso Pendiente
          </Tag>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={Permisos} />
    </>
  );
};

export default TableEach;
