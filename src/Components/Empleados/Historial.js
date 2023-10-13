import React from "react";
import { Tag } from "antd";
import moment from "moment";
import "./Historial.css";
import { UserOutlined } from "@ant-design/icons";

export const Historial = ({ historial }) => {
  return (
    <div className="historial">
      {historial.map((e) => {
        return (
          <div className="tagStyle">
            <Tag
              icon={<UserOutlined />}
              style={{
                height: "100%",
                width: "100%",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
              color={e.color}
            >
              {`Este empleado recibió ${e.accion} el ${moment(e.fecha).format(
                "MMMM Do YYYY"
              )}`}
            </Tag>
          </div>
        );
      })}
    </div>
  );
};
