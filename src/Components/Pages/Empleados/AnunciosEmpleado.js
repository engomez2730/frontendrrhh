import React from 'react'
import Table from './Table'
import './AnunciosEmpleados.css'
import {SoundOutlined } from '@ant-design/icons'


export default function (props) {
  return (
    <div className='anunciosEmpleados'>
        <h1 style={{ borderBottom: '1px solid #3F3F3F'}}><SoundOutlined/> Anuncios</h1>
        <Table user={props.user}/>
    </div>
  )
}
