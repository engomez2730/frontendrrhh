import React,{useEffect,useState} from 'react';
import { Table,Button,Modal,Input,Popconfirm,Tag } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {avisoSelecionado,CAMBIAR_ESTADO, GET_EPP_ACTION} from '../../actions/index'
import CrearEpp from './CrearEpp';
import moment from 'moment';
import 'moment/locale/es'
moment.locale('es')


const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(()=>{
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
      title: 'Fecha de Entrega',
      width: 200,
      dataIndex: 'createdAt',
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
      },
      render:(text) =>{
        return <>{moment(text).format('MMMM Do YYYY, h:mm:ss a')}</>
      }
    },
    {
      title: 'Camisa',
      dataIndex: 'camisa',
      key: 'Camisa',
      width: 150,
      render:(text) =>{
        return <>{text ? <Tag color='cyan'>Entregada</Tag> : <Tag color='red'>Pendiente</Tag>}</>
      }
    },
    {
        title: 'Lentes',
        dataIndex: 'lentes',
        key: 'Lentes',
        width: 150,
        render:(text) =>{
          return <>{text ? <Tag color='cyan'>Entregada</Tag> : <Tag color='red'>Pendiente</Tag>}</>
        }
    },
    {
        title: 'Botas',
        dataIndex: 'botas',
        key: 'botas',
        width: 150,
        render:(text) =>{
          return <>{text ? <Tag color='cyan'>Entregada</Tag> : <Tag color='red'>Pendiente</Tag>}</>
        }
    },
    {
        title: 'Sigueinte Fecha de Entrega',
        dataIndex: 'siguienteFechaEntrega',
        key: 'siguienteFechaEntrega',
        width: 400,
        render:(text) =>{
            return <>{moment(text).format('MMMM Do YYYY, h:mm:ss a')}</>
        }
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


  const epps = props?.usuario?.Epps?.map(e =>{
    return {
      createdAt:e.createdAt,
      key:e._id,
      botas:e.botas,
      lentes:e.lentes,
      camisa:e.camisa,
      siguienteFechaEntrega:e.siguienteFechaEntrega,
      Usuario:e.Usuario
    }
  })



    return (
        <div>
          <Button type='primary' key='crear' style={{marginLeft:'10px', marginTop:'90px'}} onClick={e => onClickModalCrear(e)}>Crear Epp para {props.usuario?.nombre}</Button>, 
            <Table 
            style={{marginTop:'50px',width:'90%'}}
           columns={columns} 
           dataSource={epps}
           bordered={true}
           pagination={{pageSize:5,total:epps?.length}}
           />
          <Modal title="Ver Anuncio" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
          </Modal>
          <Modal title="Editar Anuncio" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
          </Modal>
          <Modal title="Crear Anuncio" open={isModalOpenCrear} onOk={handleOkCrear} onCancel={handleCancelCrear} width={1000}>
            <CrearEpp usuario={props?.usuario}/> 
          </Modal>
        </div>
    );
}

const StateMapToProps = state =>{
    return { estado:state.cambiarState}
}

export default connect(StateMapToProps,{
    GET_EPP_ACTION,
    avisoSelecionado,
    CAMBIAR_ESTADO
})(TablePerm);
