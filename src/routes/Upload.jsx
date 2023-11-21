import { useEffect, useState } from 'react';

const Upload = () => {
  const [loaded, setLoaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');

  useEffect(() => {
    const uwScript = document.getElementById('uw');
    if (!loaded && !uwScript) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', 'uw');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.addEventListener('load', () => setLoaded(true));
      document.body.appendChild(script);
    }
  }, [loaded]);

  const processResults = (error, result) => {
    if (result && result.event === 'success') {
      setUploadedImage(result.info.secure_url);
      // setPublicId(result.info.public_id);
    }
  };
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url'],
        tags: ['myphotoalbum-react'],
      },
      processResults
    );
  };
  return (
    <div className="m-2 space-y-4">
      <h1 className="text-5xl font-bold">Welcome</h1>
      <p>This example shows how to use the upload widget</p>
      <button className="btn btn-primary" type="button" onClick={uploadWidget}>
        Upload File
      </button>
      {uploadedImage && <img src={uploadedImage} alt="uploaded image" />}
    </div>
  );
};

export default Upload;
