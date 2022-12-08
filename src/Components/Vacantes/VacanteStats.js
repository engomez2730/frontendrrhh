import { Col, Row, Statistic } from 'antd';
import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import Api from '../../apis/rrhhApi'

const StatsCard = (props) => {

    const [Permisos,setPermisos] = useState([])


    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        const data = await Api.get('http://localhost:5000/api/v1/vacantes')
        setPermisos(data.data.data.Vacantes)
    }

  const Data = [
    {
      title:'Permisos Registrados Total',
      value:Permisos?.length,
    },
    {
      title:'Permisos Registrados Activos',
      value:Permisos?.length,
  
    },
    {
      title:'Permisos Registrados Inactivos',
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