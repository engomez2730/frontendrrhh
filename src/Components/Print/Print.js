// PrintComponent.js
import { Button } from "antd";
import React from "react";
import { useReactToPrint } from "react-to-print";

const PrintComponent = ({ componentToPrint }) => {
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
        Imprimir
      </Button>

      <div style={{ display: "none" }}>
        <div ref={componentRef}>{componentToPrint}</div>
      </div>
    </div>
  );
};

export default PrintComponent;
