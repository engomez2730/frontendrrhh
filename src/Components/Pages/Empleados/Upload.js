import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import FormImage from './Form'

const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"labelCol={{span: 8, }} wrapperCol={{span: 16,}} initialValues={{remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username" name="upload"
      >
        <FormImage />
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8,span: 16,}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;