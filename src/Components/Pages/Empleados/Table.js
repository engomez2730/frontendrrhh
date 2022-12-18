import { Table,Button,Modal,Input } from 'antd';
import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'
import {GET_AVISOS_ACTION,avisoSelecionado} from '../../../actions/index'
import VerAvisos from '../../Avisos/VerAvisos';



const TableFinal = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);


  useEffect(()=>{
    props.GET_AVISOS_ACTION()
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
      title: 'titulo',
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
      title: 'Acción',
      key: '    ',
      fixed: 'right', 
      width: 200,
      render: (text) => [
      <Button type='primary' key='ver' style={{marginLeft:'10px'}} onClick={e => onClickModalVer(e,text)}>Ver Anuncio</Button>, 
    ],
    },
  ];

  const onClickModal = (e,text) =>{
    showModal()
  }

  const onClickModalVer = (e,text) =>{
    props.avisoSelecionado(text)
    showModalEdit()
  }


     const avisos = props.avisos?.map(e =>{
        return {
          titulo:e.titulo,
          key:e._id,
          createdAt:e.createdAt,
          departamentos:e.departamentos,
          finishAt:e.finishAt,
          estado:e.estado
        }
    })

    const avisosFinales = avisos?.filter((e,index) =>{
        if(e.departamentos.includes(props.user.departamento) || e.departamentos.includes('Todos')){
            return e
        }        
    })


   return (
        <>
          <Table 
            style={{marginTop:'50px',width:'90%'}}
           columns={columns}
           dataSource={avisosFinales}
           bordered={true}
           pagination={{pageSize:6,total:avisosFinales?.length}}
           />
          <Modal title="Nomina del empleado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
          </Modal>
          <Modal title="Nomina del empleado" open={isModalOpenVer} onOk={handleOkVER} onCancel={handleCancelVer} width={1000}>
            <VerAvisos props={props.avisoSelecionado}/>
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
       avisos:state.avisos.avisos,
       avisoSelecionado:state.AvisoSelecionado.avisoSelecionado
      }
}

export default connect(stateMapToProps,{
    GET_AVISOS_ACTION,
    avisoSelecionado,
})(TableFinal);