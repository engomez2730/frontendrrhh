import React, { useState, useEffect } from "react";
import "./Vacaciones.css";
import { connect } from "react-redux";
import { Button, Form, DatePicker, message, InputNumber } from "antd";
import { CAMBIAR_ESTADO } from "../../actions";
import Api from "../../apis/rrhhApi";
import handleError from "../../Data/errorHandle";
import { vacaciones } from "../../Data/Calcular";
import moment from "moment";
import bussinesMoment from "moment-business-days";

const { RangePicker } = DatePicker;

const EditarVacaciones = (props) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      vacacionesTomadas: props.usuario?.vacacionesTomadas,
      tiempoDeVacaciones: props.usuario?.tiempoDeVacaciones,
    });
  }, [props.usuarioSelecionado]);

  const calculateMonths = (date1, date2) => {
    return (date1 - date2) / (1000 * 3600 * 24 * 30);
  };

  const calculateYears = (date1, date2) => {
    return parseInt((date1 - date2) / (1000 * 60 * 60 * 24 * 30 * 12));
  };

  const verDisponibilidad = (createdAt) => {
    const meses = calculateMonths(new Date(), new Date(createdAt));
    const years = calculateYears(new Date(), new Date(createdAt));

    if (meses < 5) {
      return 0;
    } else if (meses >= 5 && meses < 6) {
      return 6;
    } else if (meses >= 6 && meses < 7) {
      return 7;
    } else if (meses >= 7 && meses < 8) {
      return 8;
    } else if (meses >= 8 && meses < 9) {
      return 9;
    } else if (meses >= 9 && meses < 10) {
      return 10;
    } else if (meses >= 10 && meses < 11) {
      return 11;
    } else if (meses >= 11 && meses <= 12) {
      return 12;
    } else if (meses >= 12 && meses < 13) {
      return 14;
    } else {
      return 14;
    }
  };


  const mostrarFecha = (date) => {
    if (date === undefined) {
      return "No le han establecido fecha aun";
    }
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    let newDate = new Date(date);
    return `${newDate.getDate()} de ${
      meses[newDate.getMonth()]
    } del ${newDate.getFullYear()} `;
  };

  const rangeConfig = { rules: [{ type: "array" }] };

  const onFinish = async (values) => {
    try {
      await Api.post(`vacaciones/`, {
        tiempoDeVacaciones: values.tiempoDeVacaciones,
        diasDeVacaciones: values.diasDeVacaciones,
        key: props.usuarioSelecionado._id,
      });
      props.CAMBIAR_ESTADO(!props.cambiarState);
      message.success("Vacaciones Actualizadas", 2);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="editrarVacacionesForm">
      <Form
        disabled={verDisponibilidad(props.usuario?.createdAt) === 0}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1>
          Dias de vacaciones que le tocan:{" "}
          <span className="vacacionesSpan">
            {vacaciones(props?.usuario?.createdAt)}
          </span>
        </h1>
        <h1>
          Proxima disponibilidad de vacaciones:{" "}
          <span className="vacacionesSpan">
            {mostrarFecha(
              props.usuario?.Vacaciones[props.usuario.Vacaciones.length - 1]
                ?.siguientesVacacionesFecha
            )}
          </span>
        </h1>
        <Form.Item name="diasDeVacaciones" label="Dias de Vacaciones">
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="tiempoDeVacaciones"
          label="Tiempo de Vacaciones"
          {...rangeConfig}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Establecer Vacaciones
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const stateMapToProps = (state) => {
  return {
    cambiarState: state.cambiarState,
    usuarioSelecionado: state.usuarioSelecionadoVer.usuarioSelecionadoVer,
  };
};

export default connect(stateMapToProps, {
  CAMBIAR_ESTADO,
})(EditarVacaciones);
