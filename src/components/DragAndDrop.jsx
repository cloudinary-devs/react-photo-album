import styles from './DragAndDrop.module.css';
import { useState } from 'react';

const DragAndDrop = () => {
  const [dragOver, setDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles([]);

    if (files && files.length > 0) {
      const url = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/upload`;
      for (let file of files) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
          formData.append('tags', ['myphotoalbum-react']);
          formData.append('multiple', true);
          const options = {
            method: 'POST',
            body: formData,
          };
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error('Failed to execute file upload via the Fetch API');
          }
          const json = await response.json();
          const secureUrl = json.secure_url;
          const previewUrl = secureUrl.replace('/upload/', '/upload/w_250/');

          setDroppedFiles((prevFiles) => [...prevFiles, { file, previewUrl }]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <div
        className={`${styles.dragArea} ${dragOver ? `${styles.dragOver}` : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Drag and drop files here</p>
      </div>
      {droppedFiles.length > 0 && (
        <div>
          <h2>Dropped files:</h2>
          <ul>
            {droppedFiles.map((droppedFile, index) => (
              <li key={index}>
                <strong>{droppedFile.file.name}</strong>
                <br />
                <img
                  src={droppedFile.previewUrl}
                  alt={`Preview of ${droppedFile.file.name}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100px',
                    marginTop: '5px',
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DragAndDrop;
