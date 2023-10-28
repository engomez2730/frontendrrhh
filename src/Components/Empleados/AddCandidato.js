import { Button, Form, Input } from "antd";
import React from "react";
import rrhhApi from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { BUSCAR_CANDIDATO_ACTION, CAMBIAR_ESTADO } from "../../actions/index";

const App = (props) => {
  const onFinish = async (values) => {
    const dataCandidato = await rrhhApi.get(
      `entrevistados?cedula=${values.candidato}`
    );
    props.BUSCAR_CANDIDATO_ACTION(dataCandidato?.data?.Entrevistados[0]);
    props.CAMBIAR_ESTADO(!props.estado);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Candidato"
        name="candidato"
        rules={[
          {
            required: true,
            message: "Tiene que introducir la cedula del candidato",
          },
        ]}
      >
        <Input.Search
          size="large"
          placeholder="Escribe la cedula del candidato"
          enterButton
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const stateMapToProps = (state) => {
  return { estado: state.cambiarState };
};

export default connect(stateMapToProps, {
  BUSCAR_CANDIDATO_ACTION,
  CAMBIAR_ESTADO,
})(App);
