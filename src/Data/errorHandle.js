import {message} from 'antd'

const handleError = (err) => {
    console.log(err)
    if(err.response.data.error.code === 11000){
        const key = Object.keys((err.response.data.error.keyPattern))
        const valor = Object.values((err.response.data.error.keyValue))
        return message.error(`El campo ${key} con valor ${valor} ya esta en uso `)
    }else if (err.response.data.error.name === 'ValidationError'){
        const value = err.response.data.error.message.split('`')[1]
        const key = err.response.data.error.message.split('`')[3]
        return  message.error(`El valor ${value} no esta entre las opciones de ${key}`)
    }else if(err.code === 'ERR_NETWORK'){
        return message.error(`Error con la red`)
    }
    return  message.error(err.response.data.message,3)
}

export default handleError