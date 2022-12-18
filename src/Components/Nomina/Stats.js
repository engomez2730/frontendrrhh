import React,{useState,useEffect} from 'react'
import StatsData from './StatsData'
import BarChart from './BarChart'
import LineChart from './LineChart'
import PieChart from './PieChart'
import requireAuth from '../requireAuth';
import Api from '../../apis/rrhhApi'
import './Stats.css'

const Stats = ()=> {
 
   const [empleados,setEmpleadosData] =useState()
    const getData = async() =>{
        const data = await Api.get('nomina/stats')
        setEmpleadosData(data.data.stats)    
    } 

    useEffect(()=>{
        getData()
    },[])
      const dataFinal = {
        labels:empleados?.map(e => e._id),
        datasets:[{
            label:'Nomina Total',
            data:empleados?.map(e => e.totalNomina),
            backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
            borderColor: ['rgb(255, 99, 132)','rgb(25   5, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
            borderWidth: 1
        },
    ]
      }
  return (
    <div className='Stats'>
        <div className='stats-item'>
            <h1>Nomina</h1>
            <BarChart charData={dataFinal}/>
        </div>
        <div className='stats-item'>
            <h1>Nomina</h1>
            <PieChart charData={dataFinal}/>
        </div>
        <div className='stats-item'>
            <h1>Nomina</h1>
            <LineChart charData={dataFinal}/>
        </div>
    </div>
  )
}

export default requireAuth(Stats)