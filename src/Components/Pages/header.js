import { connect } from "react-redux";
import "./header.css";
import { loggedUserOut, loggedUserIn } from "../../actions/index";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "antd/lib/radio";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
const { Header } = Layout;

const HeaderFInal = (props) => {
  const [userLocal, userLocalSet] = useState();
  const [estadoFake, estadoFakeSer] = useState(false);

  useEffect(() => {
    getUserLocal();
  }, [estadoFake]);

  function getUserLocal() {
    userLocalSet(JSON.parse(localStorage.getItem("user")));
    estadoFakeSer(true);
  }

  const logOut = () => {
    document.cookie = "jwt=; expires=Thu, 01 J  `an 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    props.loggedUserOut();
    window.location.href = "/";
  };

  const renderButton = () => {
    if (!userLocal) {
      return (
        <Button color="inherit">
          <Link to="/login">Log In</Link>
        </Button>
      );
    } else if (userLocal) {
      return (
        <>
          <Button color="inherit" onClick={() => logOut()}>
            Salir
          </Button>
          ,<Button color="inherit">Mi Perfil</Button>
        </>
      );
    }
  };
  return (
    <>
      <Header className="header">
        <div className="logo">
          Varg<span style={{ color: "#f97e07" }}>Sang </span>RRHH
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          className="header"
        >
          <Menu.Item key="ddd">
            <span>{renderButton()}</span>
          </Menu.Item>
        </Menu>
      </Header>
      <Routes>{<Route path="/menu" element={<Menu />}></Route>}</Routes>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedInState: state.isLoggedIn,
    cambiarState: state.cambiarState,
  };
};

export default connect(mapStateToProps, {
  loggedUserIn,
  loggedUserOut,
})(HeaderFInal);
