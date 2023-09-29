import React, { useState } from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import { useForm } from "antd/lib/form/Form";
import handleError from "../../Data/errorHandle";
import rrhhApi from "../../apis/rrhhApi";

function hasPassedMonths(dateStr, months) {
  const inputDate = moment(dateStr, "YYYY-MM-DD");
  const futureDate = inputDate.clone().add(months, "months");
  return futureDate.isSameOrBefore(moment(), "day");
}

function YourFormComponent({ usuario }) {
  const [daysFormValues, setDaysFormValues] = useState(0);
  const [form] = useForm(); // Initialize the form instance

  const onFinish = async (values) => {
    try {
      await rrhhApi.post("vacaciones", {
        tiempoDeVacaciones: values.tiempoDeVacaciones,
        diasDeVacaciones: values.diasDeVacaciones,
        salarioPorVacaciones: values.salarioPorVacaciones,
        key: usuario._id,
      });
      message.success("Vacaciones Actualizadas con extito", 3);
      form.resetFields();
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
      <Form.Item name="diasDeVacaciones" label="Dias de Vacaciones">
        <InputNumber
          value={daysFormValues}
          onChange={(e) => setDaysFormValues(e)}
          style={{ width: "50%" }}
        />
      </Form.Item>
      <Form.Item name="salarioPorVacaciones" label="Salario por Vacaciones">
        <InputNumber style={{ width: "50%" }} />
      </Form.Item>
      <Form.Item
        name="tiempoDeVacaciones"
        label="Tiempo de Vacaciones"
        {...rangeConfig}
      >
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Establecer Vacaciones
        </Button>
      </Form.Item>
    </Form>
  );
}

export default YourFormComponent;
