import React, { useEffect } from "react";
import { Form, DatePicker, Button, message } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import { useForm } from "antd/lib/form/Form";
import handleError from "../../Data/errorHandle";
import rrhhApi from "../../apis/rrhhApi";
import { CAMBIAR_ESTADO } from "../../actions";
import { connect } from "react-redux";
function YourFormComponent(props) {
  const [form] = useForm(); // Initialize the form instance

  useEffect(() => {
    form.setFieldsValue({
      siguientesVacacionesFecha: moment(
        props.vacaciones?.siguientesVacacionesFecha
      ),
    });
  }, [form, props.vacaciones]);

  console.log(props);

  const onFinish = async (values) => {
    try {
      await rrhhApi.patch(`vacaciones/${props.vacaciones?.key}`, {
        siguientesVacacionesFecha: values.siguientesVacacionesFecha,
        key: props.vacaciones?._id,
      });
      message.success("Vacaciones Actualizadas con extito", 3);
      form.resetFields();
      props.CAMBIAR_ESTADO(!props.estado);
      props.onClose();
      props.onCloseParent();
    } catch (err) {
      handleError(err);
    }
  };

  const rangeConfig = {
    rules: [],
  };

  return (
    <Form
      form={form} // Set the form instance
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="siguientesVacacionesFecha"
        label="Siguientes fechas de vacaciones"
        {...rangeConfig}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Editar Vacaciones
        </Button>
      </Form.Item>
    </Form>
  );
}

const stateMapToProps = (state) => {
  return {
    usuarioFinal: state.usuarioEditadoFinal,
    estado: state.cambiarState,
  };
};

export default connect(stateMapToProps, { CAMBIAR_ESTADO })(YourFormComponent);
