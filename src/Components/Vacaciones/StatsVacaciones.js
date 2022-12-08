import { Col, Row, Statistic } from 'antd';
import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import Api from '../../apis/rrhhApi'

const StatsCard = (props) => {

    const [departamentos,setDepartamentos] = useState([])


    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        const data = await Api.get('http://localhost:5000/api/v1/departamentos')
        setDepartamentos(data.data.data)
    }

  const Data = [
    {
      title:'Departamentos Registrados Total',
      value:departamentos.Departamentos?.length,
    },
    {
      title:'Departamentos Registrados Activos',
      value:3,
  
    },
    {
      title:'Departamentos Registrados Inactivos',
      value:0,
  
    }
  ]


  return <Row gutter={18}>
      {Data.map(e =>{
        return <Col span={5} key={e.title}>
          <Statistic title={e.title} value={e.value}  className='card'  style={e.style}/>
        </Col>
      })}
      
  </Row>
};

const mapStateToProps = (state) =>{
    return {empleados:state.empleados}
}

export default connect(mapStateToProps)(StatsCard);