import React,{useEffect,useState} from 'react';
import { Table,Button,Modal,Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {GET_PERMISOS_STATE} from '../../actions/index'
import {permisoSelecionado} from '../../actions/index'
import PermisoEditar from './PermisoEditar';
import PermisoVer from './PermisoVer';
import moment from 'moment';
import PermisoCrear from './PermisoCrear'
moment.locale('uk')


const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(()=>{
    props.GET_PERMISOS_STATE()
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
      width: 100,
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
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'apellido',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'cedula',
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 300,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Ver Permiso</Button>, 
      <Button type='' key='manejar' style={{marginLeft:'10px'}} onClick={e => onClickModalVer(e,text)}>Manejar Permiso</Button>, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.permisoSelecionado(text)
    showModal()
  }

  const onClickModalVer = (e,text) =>{
    props.permisoSelecionado(text)
    showModalEdit()
  }
  const onClickModalCrear = (e,text) =>{
    showModalCrear()
  }

    const permisos =  props?.permisos?.map(e => {
        return {
            nombre:e.nombre,
            descripcion:e.descripcion,
            createdAt:e.createdAt,
            fecha:moment(e.fecha).format('MMMM Do YYYY, h:mm:ss a'),
            estado:e.estado,
            Empleados:e.Empleados,
            key:e.id,
        }
    })

    return (
        <div>
          <Button type='primary' key='crear' style={{marginLeft:'10px', marginTop:'90px'}} onClick={e => onClickModalCrear(e)}>Crear Permiso</Button>, 
            <Table 
            style={{marginTop:'50px',width:'80%'}}
           columns={columns} scroll={{x: 1300, }} 
           dataSource={permisos}
           bordered={true}
           pagination={{pageSize:5,total:permisos?.length}}
           />
          <Modal title="Ver Permiso" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <PermisoVer/>
          </Modal>
          <Modal title="Editar Permiso" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
            <PermisoEditar/>
          </Modal>
          <Modal title="Crear Permiso" open={isModalOpenCrear} onOk={handleOkCrear} onCancel={handleCancelCrear} width={1000}>
            <PermisoCrear/>
          </Modal>
        </div>
    );
}

const StateMapToProps = state =>{
    return {permisos:state.permisos.permisos,permisoSelecioandoData:state.permisoSelecionado, estado:state.cambiarState}
}

export default connect(StateMapToProps,{
    GET_PERMISOS_STATE,
    permisoSelecionado
})(TablePerm);
