import React from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cedula',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Celular',
      dataIndex: 'address',
      key: 'address',
    },
    
  ];


const DeparEmpleados = (props) => {

    const dataFinal = props.departamento.empleados.map((e) =>{
        return {
            key: e._id,
            name: e.nombre,
            age: e.cedula,
            address: e.celular,
        }
    })

    console.log()



    return (
        <div>
            <Table columns={columns} dataSource={dataFinal}  />
        </div>
    );
}

export default DeparEmpleados;
