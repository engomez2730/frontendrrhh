import { Table, Button } from 'antd';
import React,{useEffect,useState} from 'react';
import {  Modal } from 'antd';
import VerDepartamento from './VerDepartamento';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { verDepartamento } from '../../actions/index';
import EditarDepartamentos from './EditarDepartamentos';
import CrearDepartModal from './CrearDepartModal';


const App = (props) => {
    const [departamentos,setDepartamentos] = useState([])
    const [open, setOpen] = useState(false);
    const [openDep, setOpenDep] = useState(false);
    const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);


    const onVerSelect = (text) =>{
      setOpen(!open)
      props.verDepartamento(text)
    }

    const onEditarSelect = (text) =>{
      setOpenDep(!openDep)
      props.verDepartamento(text)
    }

    const handleCancelCrear = () => {
      setIsModalVerOpenCrear(false);
    };

    const handleOkCrear = () => {
      setIsModalVerOpenCrear(false);
    };

    const showModalCrear = () => {
      setIsModalVerOpenCrear(true);
    };

    useEffect(()=>{
        getData()
    },[props.estado])

    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        fixed: 'left',
      },
      {
        title: 'Encargado',
        dataIndex: 'encargado',
        key: 'age',
        fixed: 'left',
      },
      {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: '1',
      },
      {
        title: 'Empleados',
        dataIndex: 'empleadosLength',
        key: '1',
      },
    
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 300,
        render: (text) => [
            <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={()=> onVerSelect(text)}>Ver</Button>,
            <Button type='warning' key='editar'style={{marginLeft:'10px'}} onClick={()=> onEditarSelect(text)}>Editar</Button>,
            <Button type='danger' key='eliminar' style={{marginLeft:'10px'}}>Eliminar</Button>
        ],
      },
    ];
    const getData = async () =>{
        const data = await Api.get('http://localhost:5000/api/v1/departamentos')
        setDepartamentos(data.data.data)
    }

    const onClickModalCrear = (e,text) =>{
      showModalCrear()
    }


    const dataFinal = departamentos?.Departamentos?.map(e =>{
      
        return{
            key:e._id,
            nombre:e.nombre,
            encargado:e.encargado,
            descripcion:e.descripcion,
            empleadosLength:e.Empleados.length,
            empleados:e.Empleados
        }
    })

  return <div>
    <Button type='primary' key='crear' style={{marginLeft:'10px', marginTop:'90px'}} onClick={e => onClickModalCrear(e)}>Crear Departamento</Button>, 
    <Table
    style={{marginTop:'50px',width:'80%'}}
    columns={columns}
    dataSource={dataFinal}
    bordered={true}
    pagination={{pageSize:5,total:props.dataFinal?.length}}
    scroll={{
      x: 1300,
    }}
  />
  <Modal title="Ver Departamento" centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1000}>
      <VerDepartamento/>
  </Modal>
  <Modal title="Ver Departamento" centered open={openDep} onOk={() => setOpenDep(false)} onCancel={() => setOpenDep(false)} width={1000}>
      <EditarDepartamentos/>
  </Modal>
  <Modal title="Crear Departamento" open={isModalOpenCrear} onOk={handleOkCrear} onCancel={handleCancelCrear} width={1000}>
      <CrearDepartModal/>
  </Modal>
  </div> 
};

const StateMapToProps = (state) =>{
  return {departamento:state.departamentoSelecionado.departamentoSelecionado, estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  verDepartamento
})(App);