import DragAndDrop from '../components/DragAndDrop';

const ApiUpload = () => {
  return (
    <div className="m-2 space-y-4">
      <h1 className="text-5xl font-bold">API Upload</h1>
      <p className="m-2">
        This example shows how to upload images via the Upload API.
      </p>
      <div className="m-2">
        Please note that the following defaults are being used:
        <ul className="list-disc list-inside">
          <li>The sample uses the HTML5 Drag & Drop API</li>
          <li>
            The{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              myphotoalbum-react
            </code>{' '}
            tag gets added to all photos uploaded via this method (this is used
            in the photo album to retrieve images)
          </li>
          <li>Only images can be uploaded</li>
        </ul>
      </div>
      <DragAndDrop />
    </div>
  );
};

export default ApiUpload;
