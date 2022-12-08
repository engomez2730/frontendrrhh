import { Table,Button,Modal,Input,Tag } from 'antd';
import React,{useEffect,useState} from 'react';
import {cargarEmpleados} from '../../actions/index'
import {connect} from 'react-redux'
import {empleadoSelecionadoVer} from '../../actions/index'
import {usuarioEditarSeleciondo,editarUsuario} from '../../actions/index'
import {SearchOutlined} from '@ant-design/icons'
import EditarVacaciones from './EditarVacaciones';
import VerVacaciones from './VerVacaciones';
import moment from 'moment';



const TableFinal = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);


  useEffect(()=>{
    props.cargarEmpleados()
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
      title: 'Estado',
      dataIndex: 'Vacaciones',
      key: 'cedula',
      render: (text,item) => {        
        if(text.length === 0){
          return <Tag color='red' key={item._id}>No tiene tiempo</Tag>
        }else if(text.length > 0){
          const date1 = moment(text[text.length-1].tiempoDeVacaciones[0]).format()
          const dateNow = moment().format()
          if(dateNow < date1){
            return <Tag color='blue' key={item._id}>Pendiente</Tag>
          }else if (dateNow > date1){
            return <Tag color='purple' key={item._id}>Tomadas</Tag>
          }
          return <Tag color='Green' key={item._id}>En espera</Tag>
        }

        return <></>
      }
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 400,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModalVer(e,text)}>Ver Vacaciones</Button>, 
      <Button type='warning' key='manejar' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Manejar Vacaciones</Button>, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.empleadoSelecionadoVer(text.key)
    showModal()
  }

  const onClickModalVer = (e,text) =>{
    props.empleadoSelecionadoVer(text.key)
    showModalEdit()
  }


     const empleados = props.empleados?.empleados?.map(e =>{
        return {
          nombre:e.nombre,
          apellido:e.apellido,
          correo:e.correo,
          celular:e.celular,
          cedula:e.cedula,
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
          vacacionesTomadas:e.vacacionesTomadas,
          Vacaciones:e.Vacaciones,
          Nominas:e.Nominas
        }
    })

    const estadoP = true

    const empleadosActivos = empleados?.filter(e =>{
        return e.estado === true
    })

   return (
        <>
          <Table 
            style={{marginTop:'50px',width:'80%'}}
           columns={columns} scroll={{x: 1300, }} 
           dataSource={estadoP ? empleadosActivos :empleados}
           bordered={true}
           pagination={{pageSize:6,total:empleados?.length}}
           />
          <Modal title="Vacaciones del empleado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <EditarVacaciones usuario={props.usuarioSelecionado} />
          </Modal>
          <Modal title="Vacaciones del empleado" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
            <VerVacaciones usuario={props.usuarioSelecionado} />
          </Modal>
        </>
   )
};

const stateMapToProps = (state) =>{
    return {
       empleados:state.empleados,
       usuarioFinal:state.usuarioEditadoFinal,
       estado:state.cambiarState,
       usuarioSelecionado:state.usuarioSelecionadoVer.usuarioSelecionadoVer
      }
}

export default connect(stateMapToProps,{
  cargarEmpleados,
  empleadoSelecionadoVer,
  usuarioEditarSeleciondo,
  editarUsuario
})(TableFinal);