import React, { useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
import CustomFomItem from "../Custom/CustomFomItem";
import { returnOption, prepareOptionLabels } from "../Utils/helperFunctions";

const EditarEquipo = (props) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      proyectoActual: props.empleado?.proyectoActual,
      StatusLaboral: props.empleado?.StatusLaboral,
      comentarioStatus: props.empleado?.comentarioStatus,
    });
  }, [props]);

  const opcionesStatus = [
    "Activo",
    "Disponible",
    "Licencia Medica",
    "Licencia Materna",
    "De Vacaciones",
  ];

  const proyectos = props.proyectos?.map((e) => e.nombre);

  const opcionesProyectos = prepareOptionLabels(proyectos);
  const opcionesStatusArray = prepareOptionLabels(opcionesStatus);

  const onFinish = async (values) => {
    try {
      await Api.patch(`/empleados/${props.empleado.id}`, {
        proyectoActual: values.proyectoActual,
        StatusLaboral: values.StatusLaboral,
        comentarioStatus: values.comentarioStatus,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Empleado Editado con exito", 3);
      props.onClose();
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <CustomFomItem label="Proyecto Actual" name="proyectoActual">
        <Select placeholder="Seleciona el estado laboral">
          {returnOption(opcionesProyectos)}
        </Select>
      </CustomFomItem>
      ,
      <CustomFomItem label="Estado Laboral" name="StatusLaboral">
        <Select placeholder="Seleciona el estado laboral">
          {returnOption(opcionesStatusArray)}
        </Select>
      </CustomFomItem>
      ,
      <CustomFomItem label="Comentario Estado" name="comentarioStatus">
        <Input />
      </CustomFomItem>
      ,
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Empleado Editado
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
    puestoSelecionado: state.puestoSelecionado.puestoSelecionado,
    proyectos: state.Proyectos.proyectos,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(EditarEquipo);
