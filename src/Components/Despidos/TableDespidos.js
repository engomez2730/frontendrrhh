import React,{useEffect,useState} from 'react';
import { Table,Button,Modal,Input,Popconfirm } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {DESPIDO_SELECIONADO_ACTION,GET_DESPIDOS_ACTION,CAMBIAR_ESTADO} from '../../actions/index'
import Api from '../../apis/rrhhApi'
import VerDespido from './VerDespido'


import moment from 'moment';
moment.locale('uk')


const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(()=>{
    props.empleados()
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
      title: 'Titulo',
      width: 200,
      dataIndex: 'nombreDespido',
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
      title: 'Fecha de Finalizacion',
      dataIndex: 'fechaDespido',
      key: 'cedula',
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 360,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Ver Despido</Button>, 
      <Button type='warning' key='manejar' style={{marginLeft:'10px'}} onClick={e => onClickModalVer(e,text)}>Manejar Despido</Button>,
, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.DESPIDO_SELECIONADO_ACTION(text)
    showModal()
  }
  const onClickModalVer = (e,text) =>{
    props.DESPIDO_SELECIONADO_ACTION(text)
    showModalEdit()
  }
  const onClickModalCrear = (e,text) =>{
    showModalCrear()
  }
    const despidos =  props?.despidos?.map(e => {
        return {
            descripcion:e.descripcion,
            nombreDespido:e.Usuario?.nombre + ' Despido',
            razon:e.razon,
            fechaDespido:moment(e.fechaDespido).format('MMMM Do YYYY, h:mm:ss a'),
            Usuario:e.Usuario,
            key:e.id,
        }
    })
    return (
        <div>
          <Button type='primary' key='crear' style={{marginLeft:'10px', marginTop:'90px'}} onClick={e => onClickModalCrear(e)}>Despedir Empleado</Button>, 
            <Table 
            style={{marginTop:'50px',width:'80%'}}
           columns={columns} scroll={{x: 1300, }} 
           dataSource={despidos}
           bordered={true}
           pagination={{pageSize:10,total:despidos?.length}}
           />
          <Modal title="Ver Anuncio" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <VerDespido despido={props?.despidoSelecionado}/>
          </Modal>
          <Modal title="Editar Anuncio" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
          </Modal>
          <Modal title="Crear Anuncio" open={isModalOpenCrear} onOk={handleOkCrear} onCancel={handleCancelCrear} width={1000}>
          </Modal>
        </div>
    );
}
const StateMapToProps = state =>{
    return {despidos:state.Despidos.despidos,despidoSelecionado:state.despidoSelecionado.despidoSelecionado}
}
export default connect(StateMapToProps,{
  GET_DESPIDOS_ACTION,
  DESPIDO_SELECIONADO_ACTION,
    CAMBIAR_ESTADO
})(TablePerm);
