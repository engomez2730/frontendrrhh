import React from "react";
import { Form, Button } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const onValuesChange = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const App = ({ children, ...props }) => (
  <Form
    {...props} // Spread the props correctly using {...props}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {children}
  </Form>
);

export default App;
