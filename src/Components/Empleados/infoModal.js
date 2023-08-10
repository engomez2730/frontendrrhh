import React,{ useState } from 'react';
import {Button, Drawer, List } from 'antd';
import {connect} from 'react-redux'
import EmpleadosInfoPer from './EmpleadosInfoPer';
import EmpresaInfoPer from './EmpresaInfoPer';



const InfoModal = (props) => {
    const [open, setOpen] = useState(false);
    const [showUser, showUserSet] = useState(1);
    
    const showDrawer = (e,item) => {
      showUserSet(item)
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    const renderData = () =>{
      if(showUser === 1){
        return <EmpleadosInfoPer usuarioSelecionado={props.usuarioSelecionado}/>
      }else{
        return <EmpresaInfoPer usuarioSelecionado={props.usuarioSelecionado}/>
      }
    }

    return (
      <>
        <List
          dataSource={[ 
          { id: 1,name: 'Informacion Personal',description:'Nombre,cedula,telefono,correo, etc...'},
          { id: 2,name: 'Infomracion Empresarial',description:'Salario, Vacaciones, Regalia, Prestacions'}
          ,]}
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[<Button onClick={(e) => showDrawer(e,item.id)} key={`a-${item.id}`}>Ver Info</Button>,]}>
              <List.Item.Meta
                title={<p>{item.name}</p>} 
                description={item.description}/>
            </List.Item>
          )}
        />
        <Drawer width={740} placement="right" closable={true} onClose={onClose} open={open}>
          <h1 className="site-description-item-profile-p" style={{marginBottom: 24,}}>
            Informacion de Empleados 
          </h1>
          {renderData()}
        </Drawer>
      </>
    );
  };

const stateMapToProps = (state) =>{
    return {usuarioSelecionado:state.usuarioSelecionadoVer.usuarioSelecionadoVer,usuarioFinal:state.usuarioEditadoFinal}
}

export default connect(stateMapToProps,{

})(InfoModal);
