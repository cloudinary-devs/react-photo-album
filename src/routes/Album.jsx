import { useEffect, useState } from 'react';
import CldImage from '../components/CldImage';

const Album = () => {
  const [photos, setPhotos] = useState('');
  const getData = async (tag) => {
    const response = await fetch(
      `https://res.cloudinary.com/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/list/${tag}.json`
    );
    const data = await response.json();
    setPhotos(data);
  };
  useEffect(() => {
    getData('myphotoalbum-react');
  }, []);
  return (
    <div className="m-2 space-y-4">
      <h1 className="text-5xl font-bold">Photo Album</h1>
      {photos && (
        <div className="flex flex-wrap -mx-4">
          {photos.resources.map((photo, idx) => {
            return (
              <div className="lg:w-1/3 md:w-1/2 w-full p-4" key={idx}>
                <CldImage publicId={photo.public_id} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Album;
