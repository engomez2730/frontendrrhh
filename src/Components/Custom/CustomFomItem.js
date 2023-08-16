import React from "react";
import { FormItemProps, Form } from "antd"; // Import the FormItemProps type

export const CustomFomItem = ({ children, ...FormItemProps }) => {
  return <Form.Item {...FormItemProps}>{children}</Form.Item>;
};

export default CustomFomItem;
