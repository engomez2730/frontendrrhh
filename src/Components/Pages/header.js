import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loggedUserOut, setUser } from "../../actions/index";
import { Button, Layout, Menu, Badge, Avatar } from "antd";
import "./Header.css";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const stylesHeder = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const stylesLogo = { color: "#f97e07" };

const HeaderFInal = ({
  isLoggedIn,
  loggedUserOut,
  setUser,
  notificaciones,
}) => {
  const elementosHeader = [
    {
      label: (
        <Link to="notificaciones">
          <Badge
            count={!notificaciones ? 0 : notificaciones}
            style={{ background: "red" }}
          >
            <Avatar
              shape="rounded"
              icon={<UserOutlined style={{ color: "black" }} />}
              style={{ background: "#fff" }}
            />
          </Badge>
        </Link>
      ),
    },
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
