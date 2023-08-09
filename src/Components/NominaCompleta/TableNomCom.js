import { Table,Button,Modal,Input } from 'antd';
import React,{useEffect,useState} from 'react';
import {cargarEmpleados} from '../../actions/index'
import {connect} from 'react-redux'
import {empleadoSelecionadoVer} from '../../actions/index'
import {usuarioEditarSeleciondo,editarUsuario,NOMINAS_SELECIONADA_VER} from '../../actions/index'
import {SearchOutlined} from '@ant-design/icons'
import VerNominaEach from './VerNominaEach'


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
      title: 'Nombre Nomina',
      width: 200,
      dataIndex: 'nombreNomina',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Empleado',
      dataIndex: 'Empleados',
      key: 'apellido',
      width: 200,
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
          return record.Empleado?.nombre?.toLowerCase().includes(value.toLowerCase())
      },
      render:(text)=>{
        return text?.nombre
      }
    },
    {
      title: 'Departamento',
      dataIndex: 'Empleados',
      key: 'apellido',
      width: 200,
      render:(text)=>{
        return text?.departamento
      }
    },
    {
      title: 'Acción',
      key: 'operation',
      fixed: 'right', 
      width: 400,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModalVer(e,text)}>Ver Nomina</Button>, 
      <Button type='warning' key='manejar' style={{marginLeft:'10px'}} onClick={e => onClickModal(e,text)}>Manejar Nomina</Button>, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    props.NOMINAS_SELECIONADA_VER(text.key)
    showModal()
  }

  const onClickModalVer = (e,text) =>{
    props.NOMINAS_SELECIONADA_VER(text.key)
    showModalEdit()
  }


     const empleados = props.nominaCompletaSelect?.Nominas?.map(e =>{


        let EmpleadoSus = props?.empleados.filter(empleado =>{
            return empleado._id === e.Empleados
        })

        return {
          nombreNomina:e.nombreNomina,
          tipoDeNomina:e.tipoDeNomina,
          costoPorHora:e.costoPorHora,
          horasMensualesTrabajadas:e.horasMensualesTrabajadas,
          salarioPorVacaciones:e.salarioPorVacaciones,
          key:e.id,
          sueldoBruto:e.sueldoBruto,
          sueldoNeto:e.sueldoNeto,
          sueldoAnual:e.sueldoAnual,
          afp:e.afp,
          sfs:e.sfs,
          isr:e.isr,
          totalDescuento:e.totalDescuento,
          totalSinAhorro:e.totalSinAhorro,
          prestacionesLaborables:e.prestacionesLaborables,
          descuentos: e.descuentos,
          bonus:e.bonus,
          estado:e.estado,
          createdAt:e.createdAt,
          Empleados:EmpleadoSus[0],
          Loco:EmpleadoSus[0],
          year:e.year,
          mes:e.mes

        }
    })

   return (
        <>
          <Table 
            style={{marginTop:'50px',width:'100%'}}
           columns={columns}
           dataSource={empleados}
           bordered={true}
           pagination={{pageSize:4,total:empleados?.length}}
           />
          <Modal title="Nomina del empleado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <VerNominaEach/>
          </Modal>
          <Modal title="Nomina del empleado" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
            <VerNominaEach nominaSelecionada={props?.nominaSelecionadaVer}/>
          </Modal>

        </>
   )
};

const stateMapToProps = (state) =>{
    return {
       empleados:state.empleados,
       usuarioFinal:state.usuarioEditadoFinal,
       estado:state.cambiarState,
       usuarioSelecionado:state.usuarioSelecionadoVer.usuarioSelecionadoVer,
       nominaCompletaSelect:state.nominaCompletaSelect.nominaCompletaSelect,
       empleados:state.empleados.empleados,
       nominaSelecionadaVer:state.NominaSelecionadaVer.nominaSelecionadaVer
      }
}

export default connect(stateMapToProps,{
  cargarEmpleados,
  empleadoSelecionadoVer,
  usuarioEditarSeleciondo,
  editarUsuario,
  NOMINAS_SELECIONADA_VER
})(TableFinal);