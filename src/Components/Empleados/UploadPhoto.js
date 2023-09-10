import React, { useState } from "react";
import handleError from "../../Data/errorHandle";
import { message, Button } from "antd";

const PhotoUploadForm = ({ empleado }) => {
  console.log(empleado);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFileSelected) {
      message.error("Por favor, seleccione una foto antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const response = await fetch(
        `http://localhost:5000/Api/v1/empleados/${empleado?._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      console.log("Photo uploaded successfully!");
      message.success("Foto Subida", 3);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <div>
      <h2>Subir Foto</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
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
          Subir Foto
        </button>
        {!isFileSelected && (
          <p style={{ color: "red" }}>Por favor, seleccione una foto.</p>
        )}
      </form>
    </div>
  );
};

export default PhotoUploadForm;
