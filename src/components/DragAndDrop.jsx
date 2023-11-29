import styles from './DragAndDrop.module.css';
import { useEffect, useRef, useState } from 'react';

const DragAndDrop = () => {
  const [dragOver, setDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [loadingStates, setLoadingStates] = useState([]);
  const abortControllerRef = useRef(new AbortController());

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
    setLoadingStates(new Array(files.length).fill(true));

    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    if (files && files.length > 0) {
      const url = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/upload`;
      for (let file of files) {
        try {
          const formData = new FormData();
          const fields = {
            file,
            upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
            tags: ['myphotoalbum-react'],
            multiple: true,
            resource_type: 'image',
          };

          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });

          const options = {
            method: 'POST',
            body: formData,
            signal: abortControllerRef.current.signal,
          };
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error('Failed to execute file upload via the Fetch API');
          }
          const json = await response.json();
          const secureUrl = json.secure_url;
          const previewUrl = secureUrl.replace(
            '/upload/',
            '/upload/w_400/f_auto,q_auto/'
          );

          setDroppedFiles((prevFiles) => [...prevFiles, { file, previewUrl }]);
          setLoadingStates((prevStates) =>
            prevStates.map((state, index) =>
              file === files[index] ? false : state
            )
          );
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error(error);
          }
          setLoadingStates((prevStates) =>
            prevStates.map((state, index) =>
              file === files[index] ? false : state
            )
          );
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.dragArea} ${dragOver ? `${styles.dragOver}` : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Drag and drop images here</p>
      </div>
      {loadingStates.some((loading) => loading) && (
        <>
          <p>Image upload in progress</p>
          <span className="loading loading-spinner text-primary"></span>
        </>
      )}
      {droppedFiles.length !== 0 && (
        <div className="flex flex-wrap">
          <h2 className="w-full text-xl font-bold">Uploaded images</h2>
          {droppedFiles.map((droppedFile, idx) => (
            <div
              key={idx}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <img
                className="w-full"
                src={droppedFile.previewUrl}
                alt={`Preview of ${droppedFile.file.name}`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DragAndDrop;
