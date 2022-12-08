import React,{useEffect,useState} from 'react';
import { Table,Button,Modal,Input,Popconfirm } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {avisoSelecionado,cargarEmpleados,CAMBIAR_ESTADO} from '../../actions/index'
import Api from '../../apis/rrhhApi'
import VerDespido from './VerDespido'


import moment from 'moment';
moment.locale('uk')


const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(()=>{
    props.cargarEmpleados()
  },[props.estado])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalCrear = () => {
    setIsModalVerOpenCrear(true);
  };
  const showModalEdit = () => {
    setIsModalVerOpen(true);
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
      title: 'Nombre',
      width: 200,
      dataIndex: 'nombre',
      key: 'name',
      fixed: 'left',
      filterDropdown:({setSelectedKeys,selectedKeys,confirm}) =>{
        return <Input 
          autoFocus={true}
          value={selectedKeys[0]}
          onChange={(e)=>{
            setSelectedKeys(e.target.value?[e.target.value]:[])
          }}
          onPressEnter={()=>{
            confirm()
          }}
          onBlur={()=>{
            confirm()
          }}
        ></Input>
      },
      filterIcon:() =>{
        return <SearchOutlined />
      },
      onFilter:(value,record) =>{
          return record.nombre.toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
    },
    {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula',
    },
    {
      title: 'Departamento',
      dataIndex: 'departamento',
      key: 'cedula',
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 260,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Despedir </Button>, 
, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.avisoSelecionado(text)
    showModal()
  }
  const onClickModalVer = (e,text) =>{
    props.avisoSelecionado(text)
    showModalEdit()
  }
  const onClickModalCrear = (e,text) =>{
    showModalCrear()
  }
    const empleados =  props?.empleados?.map(e => {
        return {
            nombre:e.nombre,
            apellido:e.apellido,
            correo:e.correo,
            celular:e.celular,
            cedula:e.cedula,
            departamento:e.cedula,
            key:e.id,
            DiaDeVacaciones:e.DiaDeVacaciones,
            PrestacionesLaborales:e.PrestacionesLaborales,
            ausencias:e.ausencias,
            contrato:e.contrato,
            createdAt:e.createdAt,
            direccion:e.direccion,
            estado:e.estado,
            pais:e.pais,
            provincia:e.provincia,
            salario:e.salarioBruto,
            departamento:e.departamento,
            expiracionDelContrato:e.vencimientoDelContrato,
            vacacionesTomadas:e.vacacionesTomadas
        }
    })
    return (
        <div>
            <Table 
           style={{marginTop:'50px',width:'80%'}}
           columns={columns} scroll={{x: 1300, }} 
           dataSource={empleados}
           bordered={true}
           pagination={{pageSize:5,total:empleados?.length}}
           />
          <Modal title="Despedir empleado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            
          </Modal>
          <Modal title="Editar Anuncio" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
          </Modal>
        </div>
    );
}
const StateMapToProps = state =>{
    return {empleados:state.empleados.empleados}
}
export default connect(StateMapToProps,{
    cargarEmpleados,
    avisoSelecionado,
    CAMBIAR_ESTADO
})(TablePerm);
