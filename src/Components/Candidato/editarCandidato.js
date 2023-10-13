import { Button, DatePicker, Form, Input, Select, message } from "antd";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import rrhhApi from "../../apis/rrhhApi";
import { BUSCAR_SOLICITANTE_ACTION, CAMBIAR_ESTADO } from "../../actions";
import { connect } from "react-redux";
import {
  paisesFinal,
  provinciasFinal,
  puestosFinal,
  estadoCandidatoFinal,
} from "../../Data/CountriesData";
import handleError from "../../Data/errorHandle";
const { Option } = Select;

const App = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(
      {
        nombre: props.solicitante?.nombre,
        apellido: props.solicitante?.apellido,
        cedula: props.solicitante?.cedula,
        celular: props.solicitante?.celular,
        correo: props.solicitante?.correo,
        pais: props.solicitante?.pais,
        provincia: props.solicitante?.provincia,
        puestoAplicado: props.solicitante?.puestoAplicado,
        direccion: props.solicitante?.direccion,
        estadoLaboral: props.solicitante?.estadoLaboral,
        fechaDeNacimiento: moment(props.solicitante?.fechaDeNacimiento),
        sexo: props.solicitante?.sexo,
      },
      [props.solicitante]
    );
  }, [props.solicitante]);

  const onFinish = (values) => {
    try {
      const data = rrhhApi.patch(`entrevistados/${props.solicitante?._id}`, {
        nombre: values.nombre,
        apellido: values.apellido,
        correo: values.correo,
        celular: values.celular,
        cedula: values.cedula,
        provincia: values.provincia,
        pais: values.pais,
        puestoAplicado: values.puestoAplicado,
        direccion: values.direccion,
        entrevistado: values.entrevistado,
        estadoLaboral: values.estadoLaboral,
        fechaDeNacimiento: values.fechaDeNacimiento,
        sexo: values.sexo,
      });

      props.CAMBIAR_ESTADO(!props.estado);
      props.onClose();
      message.success("Editado con exito");
      console.log("Success:", values);
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderPaises = (Countries) => {
    return Countries.map((e) => {
      return (
        <Option value={`${e.label}`} key={e.label}>
          {e.label}
        </Option>
      );
    });
  };

  const renderProvincias = (provincas) => {
    return provincas.map((e) => {
      return (
        <Option value={`${e.label}`} key={e.label}>
          {e.label}
        </Option>
      );
    });
  };

  const validateMinLength = (minLength) => (rule, value, callback) => {
    if (value && value.length < minLength) {
      callback(`Necesita tener al menos ${minLength} `);
    } else {
      callback();
    }
  };

  const validateAge = (rule, date, callback) => {
    if (date && moment().diff(date, "years") < 18) {
      callback("Debes ser mayor de 18 años.");
    } else {
      callback();
    }
  };

  const validateAllNumbers = (rule, value, callback) => {
    const regex = /^\d+$/;
    if (!regex.test(value)) {
      callback("Debe ser solo numeros");
    } else {
      callback();
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ width: "500px" }}
      form={form}
    >
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Tienes que introducir el nombre del candidato",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Apellido"
        name="apellido"
        rules={[
          {
            required: true,
            message: "Tienes que introducir el apellido del candidato",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Correo"
        name="correo"
        rules={[
          {
            type: "email",
            message: "Introduce un verdadero correo",
          },
          {
            required: true,
            message: "Tienes que introducir un correo",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Cedula"
        name="cedula"
        rules={[
          {
            required: true,
            message: "Tienes que introducir una cedula!",
          },
          {
            validator: validateMinLength(11),
          },
          {
            validator: validateAllNumbers,
          },
        ]}
      >
        <Input maxLength={11} />
      </Form.Item>
      <Form.Item
        label="Celular"
        name="celular"
        rules={[
          {
            required: true,
            message: "Tienes que introducir una celular!",
          },
          {
            validator: validateMinLength(11),
          },
          {
            validator: validateAllNumbers,
          },
        ]}
      >
        <Input maxLength={10} />
      </Form.Item>

      <Form.Item
        label="Direccion"
        name="direccion"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item
        name="sexo"
        label="Genero"
        rules={[
          {
            required: true,
            message: "Por Favor introduce tu genero",
          },
        ]}
      >
        <Select placeholder="Seleciona tu genero">
          <Option value="Hombre">Hombre</Option>
          <Option value="Mujer">Mujer</Option>
          <Option value="Otro">Otro</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fechaDeNacimiento"
        label="Fecha de Nacimiento"
        rules={[
          {
            required: true,
            message: "Tienes que introducir la fecha de nacimiento",
          },
          {
            validator: validateAge,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Pais"
        name="pais"
        rules={[{ required: true, message: "Debes elegir un pais" }]}
      >
        <Select placeholder="Seleciona el Pais">
          {renderPaises(paisesFinal)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Provincia"
        name="provincia"
        rules={[{ required: true, message: "Debes elegir una provincia" }]}
      >
        <Select placeholder="Seleciona la provincia">
          {renderProvincias(provinciasFinal)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Estado Laboral"
        name="estadoLaboral"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Select placeholder="Seleciona la provincia">
          {renderProvincias(estadoCandidatoFinal)}
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
    solicitante: state.candidatoSelecionado.candidatoSelec,
  };
};

export default connect(StateMapToProps, {
  BUSCAR_SOLICITANTE_ACTION,
  CAMBIAR_ESTADO,
})(App);
