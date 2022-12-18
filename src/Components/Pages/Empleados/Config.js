import React from 'react'
import './Config.css'
import {SoundOutlined } from '@ant-design/icons'
import Upload from './Upload'


export default function Config() {
  return (
    <div className='configEmpleados'>
        <h1 style={{ borderBottom: '1px solid #3F3F3F'}}><SoundOutlined/> Configuracion</h1>
        <Upload/>
    </div>
  )
}
