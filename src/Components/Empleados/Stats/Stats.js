import React,{useState,useEffect} from 'react'
import BarChart from '../../Nomina/BarChart'
import LineChart from '../../Nomina/LineChart'
import PieChart from '../../Nomina/PieChart'
import Api from '../../../apis/rrhhApi'
import './Stats.css'
import { Pie } from 'react-chartjs-2'


export default function Stats() {

     
   const [empleados,setEmpleadosData] =useState()
   const [empleadosNomina,setEmpleadosDataNomina] =useState()
   const [empleadospais,setEmpleadosDatapais] =useState()

   const getData = async(endpoint) =>{
       const data = await Api.get(`empleados/stats/?busqueda=${endpoint}`)
       if(endpoint === 'departamento'){
        setEmpleadosData(data.data.stats)    
       }else if(endpoint === 'tipoDeNomina'){
        setEmpleadosDataNomina(data.data.stats)
       }else if(endpoint === 'pais'){
        setEmpleadosDatapais(data.data.stats)
       }
   } 

   useState(()=>{
    getData('departamento')
    getData('tipoDeNomina')
    getData('pais')
   },[])

   console.log(empleados)
   console.log(empleadosNomina)

   const dataFinal = {
    labels:empleados?.map(e => e._id),
    datasets:[{
        label:'Departamentos',
        data:empleados?.map(e => e.numEmpleados),
        backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
        borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
        borderWidth: 1
    },]
  }

  const dataTipoNomina = {
    labels:empleadosNomina?.map(e => e._id),
    datasets:[{
        label:'Tipo de Nomina',
        data:empleadosNomina?.map(e => e.numEmpleados),
        backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
        borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
        borderWidth: 1
    },]
  }
  const dataPais = {
    labels:empleadospais?.map(e => e._id),
    datasets:[{
        label:'Paises',
        data:empleadospais?.map(e => e.numEmpleados),
        backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
        borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
        borderWidth: 1
    },]
  }

  return (
    <div className='Stats'>
        <div className='stats-item'>
            <h1>Estadisticas de Empleados por Departamento</h1>
            <BarChart charData={dataFinal}/>
        </div>
        <div className='stats-item'>
            <h1>Estadisticas de Empleados por Pais</h1>
            <BarChart charData={dataPais}/>
        </div>
        <div className='stats-item'>
            <h1>Estadisticas de Empleados por Tipo De Nomina</h1>
            <PieChart charData={dataTipoNomina}/>
        </div>
    </div>
  )
}
