import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loggedUserOut, setUser } from "../../actions/index";
import { Button, Layout, Menu } from "antd";
import "./Header.css";

const { Header } = Layout;

const stylesHeder = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const stylesLogo = { color: "#f97e07" };

const HeaderFInal = ({ isLoggedIn, loggedUserOut, setUser }) => {
  const elementosHeader = [
    {
      label: (
        <Button
          onClick={() => {
            loggedUserOut();
            setUser(null);
            localStorage.setItem("user", JSON.stringify(null));
          }}
        >
          Salir
        </Button>
      ),
    },
    {
      label: (
        <Button>
          <Link to="/perfil">Perfil</Link>
        </Button>
      ),
    },
  ];

  const elementosHeader2 = [
    {
      label: (
        <Link to="/login">
          <Button>Log In</Button>,
        </Link>
      ),
    },
  ];

  return (
    <>
      <Header style={stylesHeder}>
        <div className="logo">
          Varg<span style={stylesLogo}>Sang </span>RRHH
        </div>
        <Menu
          style={{ width: "250px" }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={isLoggedIn?.isLoggedIn ? elementosHeader : elementosHeader2}
        />
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    /*     usuario: state.user,
    empleados: state.empleados, */
  };
};

export default connect(mapStateToProps, {
  loggedUserOut,
  setUser,
})(HeaderFInal);
