import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import './App.css'
import 'antd/dist/antd.min.css'
import Header from './Pages/header';
import Sider from './Empleados/Sidebar';
import CrearEmpleado from './Empleados/CrearEmpleado';
import {Routes,Route} from 'react-router-dom'
import { /* Breadcrumb, */ Layout } from 'antd';
import { setUser,loggedUserIn,loggedUserOut } from '../actions';
import Login from '../Components/Pages/login'
import VerEmpleados from './Empleados/VerEmpleados';
import Inicio from './Pages/Inicio';
import CrearDepartamento from './Departamentos/CrearDepartamento'
import VerDepartamentos from '../Components/Departamentos/VerDepartamentos';
import Vacaciones from './Vacaciones/Vacaciones.js';
import Nomina from './Nomina/Nomina';
import Permisos from './Permisos/Permisos'
import Avisos from './Avisos/Avisos'
import Vacantes from './Vacantes/vacantes'
import VerVacantesPage from './Vacantes/verVacantesPage';
import Candidatos from './Candidato/Candidato';
import CrearDespidos from './Despidos/CrearDespido'
import NominaCompleta from './NominaCompleta/NominaCompleta'
import LinaDeTiempo from './LineaTiempo/LineaDeTiempo'
import Stats from './Nomina/Stats'
import Despidos from './Despidos/CrearDespido';
import DespidosVer from './Despidos/TableDespidos';
import Epp from './Epp/Epp'
import StatsEmpleados from './Empleados/Stats/Stats';
import Puesto from './Puestos/Puesto';
const {  Content } = Layout;


const App = (props) => {

  const [userActive,userActiveSet] = useState(JSON.parse(localStorage.getItem('user')))
  const USER = JSON.parse(localStorage.getItem('user'))


 /*  useEffect(()=>{


  },[props?.isLoggedIn?.isLoggedIn]) */

  const renderSider = () =>{
    if(props?.isLoggedIn?.isLoggedIn && USER.rol === 'admin'){
      return <Sider/>
    }else{
      return null
    }
  }

    return <div>
      <Layout>
        <Header/>
            <Layout>
              {renderSider()}
              <Layout style={{ padding: '0 24px 24px' }}>
              <Content className="site-layout-background" style={{padding: 24,margin: '20px 0px',minHeight: '80vh'}}>
                <Routes>
                  <Route path='/' element={<Inicio/>}></Route>
                  <Route path='/crearempleado' element={<CrearEmpleado/>}></Route>
                  <Route path='/verempleados' element={<VerEmpleados/>}></Route>
                  <Route path='/login' element={<Login/>}></Route>
                  <Route path='/creardepartamento' element={<CrearDepartamento/>}></Route>
                  <Route path='/verdepartamentos' element={<VerDepartamentos/>}></Route>
                  <Route path='/vacaciones' element={<Vacaciones/>}></Route>
                  <Route path='/nomina' element={<Nomina/>}></Route>
                  <Route path='/permisos' element={<Permisos/>}></Route>
                  <Route path='/avisos' element={<Avisos/>}></Route>
                  <Route path='/vacantes' element={<Vacantes/>}></Route>
                  <Route path='/vervacantes' element={<VerVacantesPage/>}></Route>
                  <Route path='/candidatos' element={<Candidatos/>}></Route>
                  <Route path='/statsnomina' element={<Stats/>}></Route>
                  <Route path='/creardespidos' element={<CrearDespidos/>}></Route>
                  <Route path='/manejarnomina' element={<NominaCompleta/>}></Route>
                  <Route path='/lineadetiempo' element={<LinaDeTiempo/>}></Route>
                  <Route path='/despidos' element={<Despidos/>}></Route>
                  <Route path='/despidosVer' element={<DespidosVer/>}></Route>
                  <Route path='/epp' element={<Epp/>}></Route>
                  <Route path='/statsempleados' element={<StatsEmpleados/>}></Route>
                  <Route path='/puestos' element={<Puesto/>}></Route>
                </Routes>
              </Content>
              </Layout>
            </Layout>
      </Layout>
    </div>
};

const mapStateToProps = (state) =>{
  return {
    isLoggedIn : state.isLoggedIn,
    usuario:state.user
  }
}

export default connect(mapStateToProps,{
  loggedUserIn,
  loggedUserOut,
  setUser
})(App);