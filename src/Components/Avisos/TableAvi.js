import React,{useEffect,useState} from 'react';
import { Table,Button,Modal,Input,Popconfirm } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {avisoSelecionado,GET_AVISOS_ACTION,CAMBIAR_ESTADO} from '../../actions/index'
import CrearAvisos from './CrearAvisos'
import VerAvisos from './VerAvisos'
import EditarAvisos from './EditarAvisos'
import { QuestionCircleOutlined } from '@ant-design/icons';
import Api from '../../apis/rrhhApi'


import moment from 'moment';
moment.locale('uk')


const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(()=>{
    props.GET_AVISOS_ACTION()
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
      dataIndex: 'titulo',
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
      dataIndex: 'finishAt',
      key: 'cedula',
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 400,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Ver Anuncios</Button>, 
      <Button type='warning' key='manejar' style={{marginLeft:'10px'}} onClick={e => onClickModalVer(e,text)}>Manejar Anuncios</Button>,
      <Popconfirm title="Estas seguro que quieres eliminar este aviso？" onConfirm={e => eliminaranuncio(e,text)} key="popConfirm" icon={<QuestionCircleOutlined style={{color: 'red',}}/>}>
          <Button type='danger' key='manejar' style={{marginLeft:'10px'}}>Eliminar</Button>
      </Popconfirm>
, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.avisoSelecionado(text)
    showModal()
  }

  const eliminaranuncio = async (e,text) =>{
    const res = await Api.delete(`anuncios/${text.key}`)
    props.CAMBIAR_ESTADO(!props.estado)
  }

  const onClickModalVer = (e,text) =>{
    props.avisoSelecionado(text)
    showModalEdit()
  }
  const onClickModalCrear = (e,text) =>{
    showModalCrear()
  }

    const avisos =  props?.anuncios?.map(e => {
        return {
            titulo:e.titulo,
            descripcion:e.descripcion,
            createdAt:e.createdAt,
            finishAt:moment(e.finishAt).format('MMMM Do YYYY, h:mm:ss a'),
            estado:e.estado,
            key:e.id,
        }
    })

    return (
        <div>
          <Button type='primary' key='crear' style={{marginLeft:'10px', marginTop:'90px'}} onClick={e => onClickModalCrear(e)}>Crear Anuncio</Button>, 
            <Table 
            style={{marginTop:'50px',width:'80%'}}
           columns={columns} scroll={{x: 1300, }} 
           dataSource={avisos}
           bordered={true}
           pagination={{pageSize:5,total:avisos?.length}}
           />
          <Modal title="Ver Anuncio" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <VerAvisos anuncio={props.anuncioSelecionado}/>
          </Modal>
          <Modal title="Editar Anuncio" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
            <EditarAvisos/>
          </Modal>
          <Modal title="Crear Anuncio" open={isModalOpenCrear} onOk={handleOkCrear} onCancel={handleCancelCrear} width={1000}>
            <CrearAvisos/>
          </Modal>
        </div>
    );
}

const StateMapToProps = state =>{
    return {anuncios:state.avisos.avisos, estado:state.cambiarState, anuncioSelecionado:state.AvisoSelecionado.avisoSelecionado}
}

export default connect(StateMapToProps,{
    GET_AVISOS_ACTION,
    avisoSelecionado,
    CAMBIAR_ESTADO
})(TablePerm);
