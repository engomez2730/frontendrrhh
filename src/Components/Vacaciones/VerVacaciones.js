import React from 'react';
import TableVacEach from './TableVacEach';

const mostrarFecha = date =>{
    if(date === undefined){
        return 'No le han establecido fecha aun'
    }
    const meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    let newDate = new Date(date)
    return `${newDate.getDate()} de ${meses[newDate.getMonth()]} del ${newDate.getFullYear()} `
}

const mostrarDisponibilidad = (date) =>{

    const actualYear = new Date()

    if(new Date(date).getFullYear() <= actualYear.getFullYear()){
      return 'Si'
    }else{
      return 'NO'
    } 
  }

const getStatus = dates =>{
    if(dates === undefined) return 
    
    const dateNow = Date.now()
    if(new Date(dates[0]) < dateNow && new Date(dates[1]) > dateNow){
        return 'En progreso'
    }else if((new Date(dates[0]) > dateNow)){
        return 'Pendiente'
    }else if((new Date(dates[1]) < dateNow)){
        return 'Tomada'
    }else{
        return 'No tiene derechos a vacaciones aun'
    }
}

const VerVacaciones = (props) => {

    return (
        <div className='verVacacionesModal'>

            <div className='disponibilidadVac'>¿Ya {props.usuario?.nombre} tiene vacaciones establecidas este año? 
                <span className='vacacionesSpan'>
                    {mostrarDisponibilidad(props.usuario?.Vacaciones[props.usuario.Vacaciones.length-1]?.tiempoDeVacaciones[0])}
                </span>
            </div>

            <TableVacEach vacaciones={props.usuario?.Vacaciones}/>
        </div>
    );
}

export default VerVacaciones;
