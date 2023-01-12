import React,{useState,useEffect} from 'react'
import StatsData from './StatsData'
import BarChart from './BarChart'
import LineChart from './LineChart'
import PieChart from './PieChart'
import requireAuth from '../requireAuth';
import Api from '../../apis/rrhhApi'
import './Stats.css'

import { Select } from 'antd';


const Stats = ()=> {
 
   const [empleados,setEmpleadosData] =useState()
   const [yearState, yearStateSet] = useState(new Date().getFullYear())
   const [state, stateSet] = useState('mes')

   const handleChange = (value) => {
    yearStateSet(value.value)
  };
   const handleChangeData = (value) => {
    stateSet(value.value)
  };

    const getData = async() =>{
        const data = await Api.get(`nomina/stats/${yearState}?query=${state}`)
        setEmpleadosData(data.data.stats)    
    } 

    const years = [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031]
    const finalYears = years.map(e =>{
        return {
            value:e,
            label:e
        }
    }) 

    const optionsData = [{label:'Mes',value:'mes'},{label:'Tipo de Nomina',value:'tipoDeNomina'}]
    const finalData = optionsData.map(e =>{
        return {
            value:e.value,
            label:e.label
        }
    }) 
    useEffect(()=>{
        getData()
    },[yearState,state])

    const dataFinal = {
        labels:empleados?.map(e => e._id),
        datasets:[{
            label:'Nomina Total',
            data:empleados?.map(e => e.totalNomina),
            backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
            borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
            borderWidth: 1
        },]
    }

    const dataFinal2 = {
        labels:empleados?.map(e => e._id),
        datasets:[{
            label:'Cantidad de Empleados',
            data:empleados?.map(e => e.numTours),
            backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
            borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
            borderWidth: 1
        },]
    }

    const dataFinal3 = {
        labels:empleados?.map(e => e._id),
        datasets:[{
            label:'Salario Promedio',
            data:empleados?.map(e => e.avgSalario),
            backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
            borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
            borderWidth: 1
        },]
    }
  return (
    <>
    <Select labelInValue  onChange={handleChange} defaultValue={{value: yearState,label: yearState}}
        options={finalYears}
        style={{width: 120}} />
    <Select labelInValue  onChange={handleChangeData} defaultValue={{value: state,label: state}}
        options={finalData}
        style={{width: 120}} />
    <div className='Stats'>
        <div className='stats-item'>
            <h1>Nomina Total Pagada Por mes</h1>
            <BarChart charData={dataFinal}/>
        </div>
        <div className='stats-item'>
            <h1>Cantidad de Empleados Nominados</h1>
            <BarChart charData={dataFinal2}/>
        </div>
        <div className='stats-item'>
            <h1>Salario Promedio</h1>
            <BarChart charData={dataFinal3}/>
        </div>
    </div>
    </>
  )
}

export default requireAuth(Stats)