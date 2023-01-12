import React,{useEffect,useState} from 'react';
import { Table,Button,Modal,Input,Popconfirm } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {PUESTO_SELECT_ACTION,GET_PUESTOS_ACTION,CAMBIAR_ESTADO} from '../../actions/index'
import { QuestionCircleOutlined } from '@ant-design/icons';
import Api from '../../apis/rrhhApi'
import CrearPuesto from './CrearPuesto';
import VerPuesto from './VerPuesto';
import EditarPuesto from './EditarPuesto';
import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')


const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(()=>{
    props.GET_PUESTOS_ACTION()
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
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'apellido',
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'createdAt',
      key: 'cedula',
      render:(text) =>{
        console.log(text)
        return (<div>
          {moment(text).format('MMMM Do YYYY, h:mm:ss a')}
        </div>)
      }
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 430,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Ver Puesto</Button>, 
      <Button type='warning' key='manejar' style={{marginLeft:'10px'}} onClick={e => onClickModalVer(e,text)}>Editar Puesto</Button>,
      <Popconfirm title="Estas seguro que quieres eliminar este aviso？" onConfirm={e => eliminaranuncio(e,text)} key="popConfirm" icon={<QuestionCircleOutlined style={{color: 'red',}}/>}>
          <Button type='danger' key='manejar' style={{marginLeft:'10px'}}>Eliminar Puesto</Button>
      </Popconfirm>
, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.PUESTO_SELECT_ACTION(text.key)
    showModal()
  }

  const eliminaranuncio = async (e,text) =>{
    const res = await Api.delete(`puestos/${text.key}`)
    props.CAMBIAR_ESTADO(!props.estado)
  }

  const onClickModalVer = (e,text) =>{
    props.PUESTO_SELECT_ACTION(text.key)
    showModalEdit()
  }
  const onClickModalCrear = (e,text) =>{
    showModalCrear()
  }

    const Puestos =  props?.puestos?.map(e => {
        return {
            nombre:e.nombre,
            descripcion:e.descripcion,
            createdAt:e.createdAt,
            estado:e.estado,
            key:e.id,
        }
    })

    return (
        <div>
          <Button type='primary' key='crear' style={{marginLeft:'10px', marginTop:'90px'}} onClick={e => onClickModalCrear(e)}>Crear Puesto</Button>, 
            <Table 
            style={{marginTop:'50px',width:'80%'}}
           columns={columns} scroll={{x: 1300, }} 
           dataSource={Puestos}
           bordered={true}
           pagination={{pageSize:5,total:Puestos?.length}}
           />
          <Modal title="Ver Puesto" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <VerPuesto puesto={props?.puestoSelecionado}/>
          </Modal>
          <Modal title="Editar Puesto" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
            <EditarPuesto puesto={props?.puestoSelecionado}/>
          </Modal>
          <Modal title="Crear Puesto" open={isModalOpenCrear} onOk={handleOkCrear} onCancel={handleCancelCrear} width={1000}>
            <CrearPuesto/>
          </Modal>
        </div>
    );
}

const StateMapToProps = (state) =>{
    return {
      puestoSelecionado:state.puestoSelecionado.puestoSelecionado, 
      estado:state.cambiarState,
      puestos:state.puestos.puestos, 

    }
}

export default connect(StateMapToProps,{
    GET_PUESTOS_ACTION,
    PUESTO_SELECT_ACTION,
    CAMBIAR_ESTADO
})(TablePerm);
