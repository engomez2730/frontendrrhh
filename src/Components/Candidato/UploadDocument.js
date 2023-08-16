import React, { useState } from "react";
import handleError from "../../Data/errorHandle";
import { message, Button } from "antd";

const DocumentUploadForm = ({ candidato }) => {
  console.log(candidato);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFileSelected) {
      message.error("Por favor, seleccione un documento antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      const response = await fetch(
        `http://localhost:5000/Api/v1/entrevistados/${candidato?._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      message.success("Documento subido con éxito", 3);

      console.log(response);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <h2>Subir Documento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".doc, .docx, .pdf"
          onChange={handleFileChange}
        />
        <button
          style={{
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            padding: "6px 10px",
            cursor: "pointer",
          }}
          type="submit"
          disabled={!isFileSelected}
        >
          Subir Documento
        </button>
        {!isFileSelected && (
          <p style={{ color: "red" }}>Por favor, seleccione un documento.</p>
        )}
      </form>
    </div>
  );
};

export default DocumentUploadForm;
