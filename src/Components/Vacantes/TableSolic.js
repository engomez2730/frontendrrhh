import React,{useEffect,useState} from 'react';
import { Table,Button,Modal,Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {vacanteSelecionada,GET_VACANTES_ACTION,SOLICITANTE_SELECT} from '../../actions/index'
import SolicitantesVer from './SolicitantesVer';
import SolicitantesEditar from './SolicitantesEditar';
import CrearCandidato from './CrearCandidatoVac'
import moment from 'moment';
moment.locale('uk')


const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);

  useEffect(()=>{
  },[props.estado])

  const showModal = () => {
    setIsModalOpen(true);
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelVer = () => {
    setIsModalVerOpen(false);
  };

  const columns = [
    {
      title: 'Nombre',
      width: 150,
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
      width: 150,
    },
    {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula',
      width: 200,

    },
    {
      title: 'Celular',
      dataIndex: 'celular',
      key: 'puesto',
    },
    {
      title: 'Acción',
      key: 'operationa',
      fixed: 'right', 
      width: 350,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Ver</Button>, 
      <Button type='primary' key='Convertir' style={{marginLeft:'10px'}} onClick={e => onClickModalCrear(e,text)}>Convertit en Candidato</Button>, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.SOLICITANTE_SELECT(text)
    showModal()
  }

  const onClickModalCrear = (e,text) =>{
    props.SOLICITANTE_SELECT(text)
    showModalEdit()
  }


    const Solicitantes =  props?.Solicitantes?.map(e => {
        return {
            key:e._id,   
            nombre:e.nombre,
            apellido:e.apellido,
            cedula:e.cedula,
            celular:e.celular,
            correo:e.correo,
            createdAt:moment(e.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
            estado:e.state,
        }
    })


    return (
        <div>
            <Table 
            style={{marginTop:'50px',width:'90%'}}
           columns={columns} scroll={{x: 1300, }} 
           dataSource={Solicitantes}
           bordered={true}
           pagination={{pageSize:5,total:Solicitantes?.length}}
           />
          <Modal title="Ver Solicitante" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} key='d'>
            <SolicitantesVer solicitante={props.SolicitanteSelecioando} />
          </Modal>
          <Modal title="Crear Candidato" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000} key='df'>
            <CrearCandidato solicitante={props.SolicitanteSelecioando}/>
          </Modal>
        </div>
    );
}

const StateMapToProps = state =>{
    return {
        vacantes:state.Vacantes.vacantes, 
        estado:state.cambiarState, 
        VacanteSelecionada:state.VacanteSelecionada?.vacanteSelecionada,
        SolicitanteSelecioando:state.SolicitanseSelecionado?.SolicitanteSelecionado
    }
}

export default connect(StateMapToProps,{
    GET_VACANTES_ACTION,
    vacanteSelecionada,
    SOLICITANTE_SELECT
})(TablePerm);
