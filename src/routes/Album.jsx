import { useEffect, useState } from 'react';
import CldImage from '../components/CldImage';

const Album = () => {
  const [photos, setPhotos] = useState('');
  const [loading, setLoading] = useState(true);
  const getData = async (tag) => {
    const response = await fetch(
      `https://res.cloudinary.com/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/list/${tag}.json`
    );
    const data = await response.json();
    setPhotos(data);
    setLoading(false);
  };
  useEffect(() => {
    getData('myphotoalbum-react');
  }, []);
  return (
    <div className="m-2 space-y-4">
      <h1 className="text-5xl font-bold">Photo Album</h1>
      <p className="m-2">
        This page shows how to display images uploaded to your Cloudinary
        account.
      </p>
      <div className="m-2">
        Please note that the following defaults are being used:
        <ul className="list-disc list-inside">
          <li>
            Images are using the{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              responsive()
            </code>{' '}
            and{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              placeholder()
            </code>{' '}
            plugins
          </li>
          <li>
            Images tagged as{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              myphotoalbum-react
            </code>{' '}
            are displayed.
          </li>
          <li>
            Images are transformed using the following actions:{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm whitespace-normal overflow-auto break-words">
              .resize(thumbnail().width(300).height(300).gravity(autoGravity())).delivery(format(&apos;auto&apos;)).delivery(quality(&apos;auto&apos;));
            </code>
            .
          </li>
        </ul>
      </div>
      {loading && <p className="font-bold">Loading gallery</p>}
      {!loading && photos.length !== 0 ? (
        <div className="flex flex-wrap -mx-4">
          {photos.resources.map((photo, idx) => {
            return (
              <div className="lg:w-1/3 md:w-1/2 w-full p-4" key={idx}>
                <CldImage publicId={photo.public_id} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xl p-4">
          No photos to list. Please make sure that you have uploaded some images
          using this app.
        </p>
      )}
    </div>
  );
};

export default Album;
