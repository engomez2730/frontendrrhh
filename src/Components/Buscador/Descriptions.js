import { Badge, Descriptions } from 'antd';
import {connect} from 'react-redux'
import moment from 'moment';



const App = (props) => {
  console.log(props.buscadorData)

  const vacaciones = props?.buscadorData?.Vacaciones.map((e,index) =>{
      return <div style={{fontWeight:'500'}}>
          {index + 1} -
          Del {moment(e.tiempoDeVacaciones[0]).format('MMMM Do YYYY')} al {moment(e.tiempoDeVacaciones[1]).format('MMMM Do YYYY')} ----
          Dias de Vacaciones {e.diasDeVacaciones}
          <br />
      </div>
  })

  console.log(vacaciones)


 return <>
     <Descriptions title="Informacion del Empleado" layout="horizontal" bordered={true}>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Nombre Completo">{props?.buscadorData?.nombre} {props?.buscadorData?.apellido}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Telefono">{props?.buscadorData?.celular}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Correo">{props?.buscadorData?.correo}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Provincia">{props?.buscadorData?.provincia}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Pais">{props?.buscadorData?.pais}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Sexo">{props?.buscadorData?.sexo}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Fecha de Nacimiento">{moment(props?.buscadorData?.fechaDeNacimiento).format('MMMM Do YYYY')}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Departamento">{props?.buscadorData?.departamento}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Entrada a la empresa" span={2}>{moment(props?.buscadorData?.createdAt).format('MMMM Do YYYY')} </Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Estado">
      <Badge status={props?.buscadorData?.estado ? 'success' : 'error'} text={props?.buscadorData?.estado ? 'Activo' : 'Inactivo'} />
    </Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}}  label="Salario">{(new Intl.NumberFormat('es-RD').format(props.buscadorData?.sueldoFijo))}$</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Tipo de Nomina">{props?.buscadorData?.tipoDeNomina}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Puesto">{props?.buscadorData?.puesto}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Ultimas Vacaciones">{props?.buscadorData?.Vacaciones[props?.buscadorData?.Vacaciones?.length - 1]?.tiempoDeVacaciones[0] ? moment(props?.buscadorData?.Vacaciones[props?.buscadorData?.Vacaciones?.length - 1]?.tiempoDeVacaciones[0]).format('MMMM Do YYYY') : 'No Ha tomado aun'}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Dirreccion">{props?.buscadorData?.direccion}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Contacto de Emergencia">{props?.buscadorData?.contactoDeEmergencia}</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Incentivos">{(new Intl.NumberFormat('es-RD').format(props.buscadorData?.Incentivos))}$</Descriptions.Item>
    <Descriptions.Item contentStyle={{fontWeight:'600'}} label="Dieta">{(new Intl.NumberFormat('es-RD').format(props.buscadorData?.Dieta))}$</Descriptions.Item>
    <Descriptions.Item label='Historial Laboral'>
      
    </Descriptions.Item>

  </Descriptions>
 </>
};

const mapStateToProps = (state) =>{
    return {buscadorData:state.BuscadorEmpleados.buscadorEmpleados}
}
export default connect(mapStateToProps)(App);