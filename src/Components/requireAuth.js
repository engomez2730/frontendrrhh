import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {connect } from 'react-redux'


export default (ChildComponent) =>{

    
  function getCookies() {
    var cookies = document.cookie.split(';');
    var ret = '';
    for(var i = 1; i <= cookies.length; i++) {
        ret += i + ' - ' + cookies[i - 1] + "<br>";
    }
    return ret.split('=')[1];

  }

  const token = getCookies()
    
    const ComposedComponent = (props) => {
        var navigate = useNavigate();
        const AmILoggedIn = () =>{
            if((!props?.isLoggedIn?.isLoggedIn && !token) || props.user.user?.rol !=='admin' ){
                  navigate('/')
            }   
        }
        useEffect(()=>{
            AmILoggedIn()
        })
        return (
            <ChildComponent {...props}/>
        );
    }

    const mapStateToProps = (state) =>{
        return {isLoggedIn:state.isLoggedIn,user:state.user}
    }    
    return connect(mapStateToProps)(ComposedComponent)
    
}