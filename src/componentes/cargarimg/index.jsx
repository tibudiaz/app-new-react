import React, { useState } from "react";
import { firebase } from "../../firebaseConfig";

export function ImageUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("Seleccione una o varias imágenes para subir.");
      return;
    }
    if (!folderName) {
      alert("Ingrese un nombre para la carpeta.");
      return;
    }

    const storageRef = firebase.storage().ref(`productos/${folderName}`);
    const uploadTasks = Array.from(selectedFiles).map((file) =>
      storageRef.child(file.name).put(file)
    );

    Promise.all(uploadTasks)
      .then(() => {
        alert("Imágenes subidas exitosamente.");
        setSelectedFiles([]);
        setFolderName("");
        setUploadProgress(0);
      })
      .catch((error) => {
        alert(`Error al subir imágenes: ${error.message}`);
        setUploadProgress(0);
      });

    uploadTasks.forEach((uploadTask) => {
      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prevProgress) =>
          prevProgress + progress / uploadTasks.length
        );
      });
    });
  };

  return (
    <div>
      <h2>Cargar imágenes</h2>
      <div>
        <label>
          Seleccione una o varias imágenes:
          <input type="file" onChange={handleFileChange} multiple />
        </label>
      </div>
      <div>
        <label>
          Nombre de la carpeta:
          <input
            type="text"
            value={folderName}
            onChange={handleFolderNameChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handleUpload}>Subir imágenes</button>
      </div>
      {uploadProgress > 0 && (
        <div>
          <p>Progreso de subida: {uploadProgress.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

