import { useEffect, useState } from 'react';

const Upload = () => {
  const [loaded, setLoaded] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

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
    if (result.event === 'close') {
      setIsDisabled(false);
    }
    if (result && result.event === 'success') {
      const secureUrl = result.info.secure_url;
      const previewUrl = secureUrl.replace(
        '/upload/',
        '/upload/w_400/f_auto,q_auto/'
      );
      setUploadedImages((prevImages) => [...prevImages, previewUrl]);
      setIsDisabled(false);
    }
    if (error) {
      setIsDisabled(false);
    }
  };
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const uploadWidget = () => {
    setIsDisabled(true);
    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url'],
        tags: ['myphotoalbum-react'],
        clientAllowedFormats: ['image'],
        resourceType: 'image',
      },
      processResults
    );
  };
  return (
    <div className="m-2 space-y-4">
      <h1 className="text-5xl font-bold">Upload (Upload Widget)</h1>
      <p className="m-2">
        This example shows how to integrate the Cloudinary Upload Widget into a
        React application.
      </p>
      <div className="m-2">
        Please note that the following defaults are being used:
        <ul className="list-disc list-inside">
          <li>
            The upload source is limited to the local filesystem or to a remote
            URL.
          </li>
          <li>
            The{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              myphotoalbum-react
            </code>{' '}
            tag gets added to all photos uploaded via this method (this is used
            in the photo album to retrieve images).
          </li>
          <li>Only images can be uploaded.</li>
        </ul>
      </div>
      <button
        disabled={isDisabled}
        className={`btn btn-primary ${isDisabled ? 'btn-disabled' : ''}`}
        type="button"
        onClick={uploadWidget}
      >
        {isDisabled ? 'Opening Widget' : 'Upload Image'}
      </button>

      {uploadedImages.length !== 0 && (
        <div className="flex flex-wrap">
          <h2 className="w-full text-xl font-bold">Uploaded images</h2>
          {uploadedImages.map((uploadedImage, idx) => (
            <div
              key={idx}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <img
                className="w-full"
                src={uploadedImage}
                alt="uploaded image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
