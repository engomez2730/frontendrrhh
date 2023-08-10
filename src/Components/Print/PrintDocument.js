import React from "react";

function PrintDocument({ document }) {
  return (
    <div className="print-document">
      <h1>{document.title}</h1>
      <p>{document.content}</p>
      {/* Include other document details here */}
    </div>
  );
}

export default PrintDocument;