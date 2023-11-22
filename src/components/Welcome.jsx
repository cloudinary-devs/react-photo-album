const Welcome = () => {
  return (
    <>
      <h1 className="text-5xl font-bold m-2">Welcome</h1>
      <p className="m-2">
        This sample project shows how to use the{' '}
        <a className="underline text-blue-500" href="">
          Cloudinary React SDK
        </a>
      </p>
      <div className="p-2">
        The following pieces of functionality are exposed in this app:
        <ul className="list-disc list-inside">
          <li>
            Upload (Upload Widget): shows an example implementation of the
            Upload Widget
          </li>
          <li>
            API Upload: shows an example on how to use the Upload API to Uplaod
            from a React context
          </li>
          <li>
            Photo Album: shows how to display images from a Cloudinary account
          </li>
        </ul>
      </div>
    </>
  );
};

export default Welcome;
