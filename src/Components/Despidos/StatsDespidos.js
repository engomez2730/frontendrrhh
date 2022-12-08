import { Col, Row, Statistic } from 'antd';
import React from 'react';
import { connect } from 'react-redux';





const StatsCard = ({despidos}) => {

  const Data = [
    {
      title:'Empleados Registrados Total',
      value:despidos?.length,
    },
    {
      title:'Empleados Registrados Activos',
      value:despidos?.length  ,
  
    },
    {
      title:'Empleados Registrados Inactivos',
      value:despidos?.length ,
  
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
    return {despidos:state.Despidos.despidos, estado:state.cambiarState}
}

export default connect(mapStateToProps)(StatsCard);