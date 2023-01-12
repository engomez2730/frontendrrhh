import React,{useState,useEffect} from 'react'
import BarChart from '../../Nomina/BarChart'
import LineChart from '../../Nomina/LineChart'
import PieChart from '../../Nomina/PieChart'
import Api from '../../../apis/rrhhApi'
import './Stats.css'
import { Pie } from 'react-chartjs-2'
import { Select } from 'antd';



export default function Stats() {

     
   const [empleados,setEmpleadosData] =useState()
   const [state, stateSet] = useState('departamento')

   
   const getData = async() =>{
    const data = await Api.get(`empleados/stats/?query=${state}`)
    setEmpleadosData(data.data.stats)    
} 


   useEffect(()=>{
    console.log('Boo llegue')
    getData()
   },[state])
   

   const handleChangeData = (value) => {
    console.log(state)
    stateSet(value.value)
  };


   const dataFinal = {
    labels:empleados?.map(e => e._id),
    datasets:[{
        label:`Cantidad de empleados por ${state}`,
        data:empleados?.map(e => e.numEmpleados),
        backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
        borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
        borderWidth: 1
    },]
  }


   const dataFinal3 = {
    labels:empleados?.map(e => e._id),
    datasets:[{
        label:`Salario promedio de empleados por ${state}`,
        data:empleados?.map(e => e.avgSalario),
        backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
        borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
        borderWidth: 1
    },]
  }
    
  const optionsData = [{label:'Pais',value:'pais'},{label:'Sexo',value:'sexo'},{label:'Departamento',value:'departamento'}]
  const finalData = optionsData.map(e =>{
      return {
          value:e.value,
          label:e.label
      }
  }) 



  return (
        <>
             <Select labelInValue  onChange={handleChangeData} defaultValue={{value: state,label: state}}
                 options={finalData}
                style={{width: 120}} />
             <div className='Stats'>
                    
                    <div className='stats-item'>
                        <h1>Cantidad de empleados</h1>
                        <BarChart charData={dataFinal}/>
                    </div>
                    <div className='stats-item'>
                        <h1>Estadisticas de Empleados por Salario</h1>
                        <BarChart charData={dataFinal3}/>
                    </div>
                    <div className='stats-item'>
                        <h1>Estadisticas de Empleados por Departamento</h1>
                        <BarChart charData={dataFinal3}/>
                    </div>
                </div>
        </>        
  )
}
