import { Badge, Descriptions } from 'antd';
import {connect} from 'react-redux'
import moment from 'moment';



const App = (props) => {

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

    {/* <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </Descriptions.Item> */}
  </Descriptions>
 </>
};

const mapStateToProps = (state) =>{
    return {buscadorData:state.BuscadorEmpleados.buscadorEmpleados}
}
export default connect(mapStateToProps)(App);