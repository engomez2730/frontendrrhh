import React from "react";
import PrintDocument from "./PrintDocument";
import "./Print.css";

function DocumentDetails() {
  const handlePrint = () => {
    window.print(); // Invoke the browser's print functionality
  };

  const document = {
    title: "Sample Document",
    content: "This is the content of the document.",
    date: "2023-08-09",
    // Add other document details here
  };

  return (
    <div>
      <h1>Document Details</h1>
      <PrintDocument document={document} />
      <button onClick={handlePrint}>Print Document</button>
    </div>
  );
}

export default DocumentDetails;
