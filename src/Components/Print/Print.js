// PrintComponent.js
import { Button } from "antd";
import React from "react";
import { useReactToPrint } from "react-to-print";
import requireAuth from "../requireAuth";

const PrintComponent = ({ componentToPrint, buttonText }) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Button
        type="primary"
        onClick={handlePrint}
        style={{ marginTop: "20px" }}
      >
        {buttonText || "Imprimir"}
      </Button>

      <div style={{ display: "none" }}>
        <div ref={componentRef}>{componentToPrint}</div>
      </div>
    </div>
  );
};

export default requireAuth(PrintComponent);
