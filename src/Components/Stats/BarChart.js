import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ charData }) {
  const options = { scales: { y: { beginAtZero: true } } };

  return <Bar data={charData} options={options} />;
}
