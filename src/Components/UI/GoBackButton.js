import React from "react";
import { useNavigate } from "react-router-dom";

function GoBackButton() {
  const history = useNavigate();

  const goBack = () => {
    history.goBack(); // Navigate back to the previous page
  };

  return <button onClick={goBack}>Go Back</button>;
}

export default GoBackButton;
