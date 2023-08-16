import React from "react";
import { TableProps, Table } from "antd";

export const CustomTable = ({ ...TableProps }) => {
  return <Table {...TableProps}></Table>;
};
