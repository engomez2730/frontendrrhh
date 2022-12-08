import React,{useEffect} from 'react';
import './EmpleadosInfoPer.css'
import {connect} from 'react-redux'
import moment from 'moment';

const EmpleadosInfoPer = ({usuarioSelecionado,usuarioEditado}) => {

    console.log(usuarioSelecionado?.Nominas[0])

    const verCedula = (numbers) =>{
        let myFunc = num => Number(num);
        var intArr = Array.from(String(numbers), myFunc);
        // Print the result array
        intArr.splice(3,0,"-")
        intArr.splice(11,0,"-")
        return intArr
    }

    const edad = moment(usuarioSelecionado?.fechaDeNacimiento).fromNow().split(' ')[0] + ' Años'
    return (
        <div className='infoParent'>
            <div className='header-info'>
                <div className='imageSpace'>
                    <img src={`http://localhost:5000/photos/${usuarioSelecionado?.photo}`} alt='imag'/>
                </div>
                <div className='infoSpace'>
                    <div className='nombres'>
                        <div className='subNombres'>Nombre:</div>
                        <div className='realNombres'>{usuarioSelecionado?.nombre}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Apellido:</div>
                        <div className='realNombres'>{usuarioSelecionado?.apellido}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Cedula:</div>
                        <div className='realNombres'>{verCedula(usuarioSelecionado?.cedula)}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Telefono:</div>
                        <div className='realNombres'>{usuarioSelecionado?.celular}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Edad:</div>
                        <div className='realNombres'>{edad}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Sexo:</div>
                        <div className='realNombres'>{usuarioSelecionado?.sexo}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Pais:</div>
                        <div className='realNombres'>{usuarioSelecionado?.pais}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Provincia:</div>
                        <div className='realNombres'>{usuarioSelecionado?.provincia}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Correo:</div>
                        <div className='realNombres'>{usuarioSelecionado?.correo}</div>
                    </div>
                    <div className='nombres'>
                        <div className='subNombres'>Direccion:</div>
                        <div className='realNombres'>{usuarioSelecionado?.direccion}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const stateMapToProps = (state) =>{
    return {usuarioEditado:state.usuarioEditarSelecionado}
}

export default connect(stateMapToProps,{

})(EmpleadosInfoPer);
