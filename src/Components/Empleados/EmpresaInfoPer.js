import React,{useEffect} from 'react';
import {connect} from 'react-redux'

const EmpresaInfoPer = ({usuarioSelecionado,usuarioEditado}) => {
    


    useEffect(()=>{

    },[usuarioEditado])


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
                    <div className='realNombres'>{new Intl.NumberFormat('es-DO').format(usuarioSelecionado?.sueldoFijo)} RD$</div>
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
                    <div className='subNombres'>Incentivos:</div>
                    <div className='realNombres'>{new Intl.NumberFormat('es-DO').format(usuarioSelecionado?.Incentivos)} RD$</div>
                </div>
                <div className='nombres'>
                    <div className='subNombres'>Precio de Dieta Diaria 350:</div>
                    <div className='realNombres'>{new Intl.NumberFormat('es-DO').format(usuarioSelecionado?.Dieta)} RD$</div>
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
