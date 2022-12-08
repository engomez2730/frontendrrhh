import { connect } from 'react-redux';
import './header.css'
import {loggedUserOut,loggedUserIn} from '../../actions/index'
import { Routes,Route,Link} from "react-router-dom";
import { Button } from 'antd/lib/radio';
import {  Layout, Menu } from 'antd';
const { Header } = Layout;

const HeaderFInal = (props) => {

    const logOut = () =>{
      document.cookie = "jwt=; expires=Thu, 01 J  `an 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem('user')
      props.loggedUserOut()
      window.location.href='/'
    }
     const renderButton = () =>{
       if(!props.isLoggedInState.isLoggedIn){
         return <Button color="inherit"><Link to='/login'>Log In</Link></Button> 
       }else if(props.isLoggedInState.isLoggedIn) {
        return <>
                  <Button color="inherit" onClick={() => logOut()}>Salir</Button> 
                  <Button color="inherit" >Mi Perfil</Button>
               </>
       }
    } 
    return (
      <>
        <Header className="header">
            <div className="logo" >Vargas Sang</div>
            <Menu theme="dark" mode="horizontal" selectable={false} className='header' >
                  <Menu.Item key='ddd'>
                    <span>{renderButton()}</span>
                  </Menu.Item>
            </Menu>
        </Header>
        <Routes>
            {<Route path='/menu' element={<Menu/>}></Route>}
        </Routes>
       </>
    );
}

const mapStateToProps = (state) =>{
    return {isLoggedInState:state.isLoggedIn}
}

export default connect(mapStateToProps,{
    loggedUserIn,
    loggedUserOut
})(HeaderFInal);


