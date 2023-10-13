// Your main component or application
import React, { useState, useEffect } from "react";
import AusenciasChart from "./AusenciasChart";
import rrhhApi from "../../apis/rrhhApi";
import "./StatsAusencias.css";

const App = ({ year }) => {
  const [ausenciasData, setAusenciasData] = useState([]);

  const getAusenciasData = async () => {
    const data = await rrhhApi.get(`empleados/ausenciasStats/?year=${year}`);
    setAusenciasData(data.data.result);
  };

  // Fetch Ausencias data from your API or database
  useEffect(() => {
    // Replace with your API or database call to get the data

    getAusenciasData();
  }, [year]);

  return (
    <div className="ShowAusencia">
      <AusenciasChart data={ausenciasData} />
    </div>
  );
};

export default App;
