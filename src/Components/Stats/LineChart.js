import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ charData }) {
  return <Line data={charData} />;
}
