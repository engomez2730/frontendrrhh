// AusenciasChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

function mapMonthsToNames(monthNumbers) {
  const monthNamesSpanish = [
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

  return monthNumbers.map((monthNumber) => {
    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNamesSpanish[monthNumber - 1];
    } else {
      return "Mes Invalido";
    }
  });
}

const AusenciasChart = ({ data }) => {
  // Prepare data for the chart
  console.log(data);
  const months = data?.map((entry) => entry.month);
  const monthsFinal = mapMonthsToNames(months);
  const ausenciasCounts = data.map((entry) => entry.ausencias.length);

  const chartData = {
    labels: monthsFinal,
    datasets: [
      {
        label: "Numero de Ausencias",
        data: ausenciasCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Asistencias por Mes </h3>
      <Bar data={chartData} />
    </div>
  );
};

export default AusenciasChart;
