import React,{useEffect} from 'react';
import {connect} from 'react-redux'

const EmpresaInfoPer = ({usuarioSelecionado,usuarioEditado}) => {
    


    useEffect(()=>{

    },[usuarioEditado])

    console.log(usuarioSelecionado)

    return (
        <div className='infoParent'>
        <div className='header-info'>
            <div className='imageSpace'>
                <img src={`http://localhost:5000/photos/${usuarioSelecionado.photo}`} alt='prueba'/>
            </div>
            <div className='infoSpace'>
                <div className='nombres'>
                    <div className='subNombres'>Tipo de Contrato:</div>
                    <div className='realNombres'>{usuarioSelecionado?.contrato}</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>Rol del Empleado:</div>
                    <div className='realNombres'>{usuarioSelecionado?.rol}</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>Salario:</div>
                    <div className='realNombres'>{new Intl.NumberFormat().format(usuarioSelecionado.Nominas[0]?.sueldoBruto)} RD$</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>Departamento:</div>
                    <div className='realNombres'>{usuarioSelecionado?.departamento}</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>Tiempo en la Empresa:</div>
                    <div className='realNombres'>{usuarioSelecionado?.tiempoEnLaEmpresa}</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>¿Tiene Vacaciones Disponibles?:</div>
                    <div className='realNombres'>{usuarioSelecionado?.vacacionesDisponibles ? 'Si' : 'No'}</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>¿Ha tomado sus vacaciones?:</div>
                    <div className='realNombres'>{usuarioSelecionado.vacacionesTomadas ? 'Si' : 'No'}</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>Dias correspondientes de Vacaciones:</div>
                    <div className='realNombres'>{usuarioSelecionado.DiaDeVacaciones}</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>Salario por Vacaciones:</div>
                    <div className='realNombres'>{usuarioSelecionado.salarioPorVacaciones ? new Intl.NumberFormat().format(usuarioSelecionado.salarioPorVacaciones )  : 'No le toca aun'}`</div>
                </div>
            </div>
        </div>
    </div>
    );
}

const stateMapToProps = (state) =>{
    return {usuarioEditado:state.usuarioEditarSeleciondo}
}

export default connect(stateMapToProps,{

})(EmpresaInfoPer);
