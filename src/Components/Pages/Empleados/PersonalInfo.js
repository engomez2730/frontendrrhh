import React from 'react'
import {UserSwitchOutlined } from '@ant-design/icons'
import './PersonalInfo.css'

export default function PersonInfo({user}) {
  return (<>
          
    <div className='personalInfo'>
        <h1 style={{ borderBottom: '1px solid #3F3F3F'}}><UserSwitchOutlined/> Informacion Personal</h1>

        <div className='content'>
                <div className='infoBlock'>
                    <div className='infoLabel'>Nombre:</div>
                    <div className='infoContent'>{user?.nombre} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Apellido:</div>
                    <div className='infoContent'>{user?.apellido} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Cedula:</div>
                    <div className='infoContent'>{user?.cedula} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Telefono:</div>
                    <div className='infoContent'>{user?.celular} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Correo:</div>
                    <div className='infoContent'>{user?.correo} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Pais:</div>
                    <div className='infoContent'>{user?.pais} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Genero:</div>
                    <div className='infoContent'>{user?.sexo} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Contrato:</div>
                    <div className='infoContent'>{user?.contrato} </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Sueldo Dijo:</div>
                    <div className='infoContent'>{new Intl.NumberFormat('es-Do').format(user?.sueldoFijo)} $ </div>
                </div>
                <div className='infoBlock'>
                    <div className='infoLabel'>Departamento:</div>
                    <div className='infoContent'>{user?.departamento} </div>
                </div>
        </div>
       
    </div>
    </>
  )
}
