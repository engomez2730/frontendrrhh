import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { setUser, loggedUserIn, CAMBIAR_ESTADO } from "../../actions/index";
import API from "../../apis/rrhhApi";
import { Col, Row } from "antd";
import "./login.css";
import handleError from "../../Data/errorHandle";
import { UserOutlined } from "@ant-design/icons";

const Login = (props) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await API.post("http://localhost:5000/api/v1/login", {
        correo: values.correo,
        password: values.password,
      });

      if (response.data.status === "success") {
        let currentUser = response.data.data.user;
        props.loggedUserIn();
        localStorage.setItem("user", JSON.stringify(currentUser));
        props.setUser(currentUser);
        navigate("/");
      }
    } catch (err) {
      handleError(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {!props?.isLoggedIn.isLoggedIn ? (
        <div className="login">
          <div className="logoContent"> 
            <img src="logoVargSang.JPG" />
            <h2 className="headingLogo">Gestor de Recursos Humanos</h2>
          </div>
          <div className="formContent">
            <h3 className="heading">
              Login <UserOutlined />
            </h3>
            <Form
              className="form"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              size="large"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Correo"
                name="correo"
                rules={[
                  { required: true, message: "Tienes que poner tu correo" },
                  {
                    type: "email",
                    message: "Debes introducir un correo valido",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Tienes que poner una contraseña",
                  },
                  {
                    max: 16,
                    message: "Tu contraseña no debe tener mas de 16 caracteres",
                  },
                  {
                    min: 8,
                    message: "Tu contraseña debe tener almenos 8 caracteres",
                  },
                ]}
              >
                <Input.Password maxLength={20} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn };
};

export default connect(mapStateToProps, {
  setUser,
  loggedUserIn,
  CAMBIAR_ESTADO,
})(Login);
