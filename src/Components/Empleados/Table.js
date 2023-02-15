import { Table,Button,Modal,Input } from 'antd';
import React,{useEffect,useState} from 'react';
import {cargarEmpleados} from '../../actions/index'
import {connect} from 'react-redux'
import InfoModal from './infoModal';
import EditarEmpleado from './EditarEmpleado';
import {empleadoSelecionadoVer} from '../../actions/index'
import {usuarioEditarSeleciondo,editarUsuario,CAMBIAR_ESTADO} from '../../actions/index'
import {SearchOutlined} from '@ant-design/icons'
import InfoModalEdit from './InfoModalEdit';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Api from '../../apis/rrhhApi'



const TableFinal = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalEditOpen] = useState(false);

  useEffect(()=>{
    props.cargarEmpleados()
  },[props.estado])

  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const handleOkEdit = () => {
    setIsModalEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
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
          autoFocus
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
      key: 'departamento',
      filters: [
        {
          text: 'Administracion',
          value: 'Administracion',
        },
        {
          text: 'Inmobiliaria',
          value: 'Inmobiliaria',
        }
      ],
      onFilter: (value, record) => {
        return record?.departamento?.indexOf(value) === 0
      }

    },
    {
      title: 'Telefono',
      dataIndex: 'celular',
      key: 'celular',
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 250,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Ver</Button>,
      <Button type='warning' key='editar'style={{marginLeft:'10px'}} onClick={e => onClickModalEdit(e,text)}>Editar Empleado</Button>,
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.empleadoSelecionadoVer(text.key)
    showModal()
  }
  const onClickModalEdit = (e,text) =>{
    props.usuarioEditarSeleciondo(text)
/*     props.editarUsuario(text,text.key)
 */    showModalEdit()
  }


     
     const empleados = props.empleados?.empleados?.map(e =>{
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
          sueldoFijo:e.sueldoFijo,
          departamento:e.departamento,
          expiracionDelContrato:e.vencimientoDelContrato,
          vacacionesTomadas:e.vacacionesTomadas,
          licenciasDeConducir:e.licenciasDeConducir,
          tipoLicencia:e.tipoLicencia,
          licenciaDeConducirFechaExp:e.licenciaDeConducirFechaExp,
          contactoDeEmergencia:e.contactoDeEmergencia,
          puesto:e.puesto
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
          <Modal title="Informacion del Empleado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <InfoModal/>
          </Modal>
          <Modal title="Editar el Empleado" open={isModalOpenEdit} onOk={handleOkEdit} onCancel={handleCancelEdit} width={1000}>
            <InfoModalEdit />
          </Modal>
        </>
   )
};

const stateMapToProps = (state) =>{
    return {empleados:state.empleados, usuarioFinal:state.usuarioEditadoFinal, estado:state.cambiarState}
}

export default connect(stateMapToProps,{
  cargarEmpleados,
  empleadoSelecionadoVer,
  usuarioEditarSeleciondo,
  editarUsuario,
  CAMBIAR_ESTADO
})(TableFinal);