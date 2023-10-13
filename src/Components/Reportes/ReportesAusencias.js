import React, { useState } from "react";
import ShowAusencias from "../Ausencias/ShowAusencias";
import { Select } from "antd";

const { Option } = Select;

const MyYearFilterSelect = () => {
  // Create state to manage the selected year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Create an array of years that includes the range from 2021 to 2050
  const startYear = 2021;
  const endYear = 2050;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  // Handle the select change event
  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div>
      <h1>Reporte de Ausencias</h1>
      <h4>Seleciona el año</h4>
      <Select
        value={selectedYear}
        style={{ width: 200 }}
        placeholder="Seleciona el año"
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
      <ShowAusencias year={selectedYear} />
    </div>
  );
};

export default MyYearFilterSelect;
