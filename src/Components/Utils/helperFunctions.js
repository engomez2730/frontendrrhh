import { Select } from "antd";
const { Option } = Select;

export const returnOption = (Countries) => {
  return Countries?.map((e) => {
    return (
      <Option value={`${e.label}`} key={e.label}>
        {e.label}
      </Option>
    );
  });
};

export const prepareOptionLabels = (array) => {
  return array?.map((e) => {
    return {
      label: e,
      value: e,
    };
  });
};

export const formatDateOrKeepOriginal = (input) => {
  // Attempt to parse the input as a Date
  const dateObject = new Date(input);

  // Check if the parsed date is valid
  if (dateObject instanceof Date && !isNaN(dateObject)) {
    const formattedDate = dateObject.toLocaleDateString();
    return `Regresa el ${formattedDate}`;
  } else {
    // If it's not a valid Date, return the original input as-is
    return input;
  }
};

