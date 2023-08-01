import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 74,
      marginTop: 200,
      marginRight: 100,
    }}
    spin
  />
);
const App = () => <Spin indicator={antIcon} />;
export default App;
