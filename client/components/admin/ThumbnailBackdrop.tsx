import { FC } from 'react';
import ThumnbailBackdropIcon from './ThumbnailBackdropIcon';

type ThumbnailBackdropProps = {
  status: 'pending' | 'success' | 'unsuccess';
};
const ThumbnailBackdrop: FC<ThumbnailBackdropProps> = ({ status }) => {
  return (
    <>
      {status !== 'pending' && (
        <div>
          <div className="absolute inset-0 w-full h-full bg-gray-800 opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ThumnbailBackdropIcon status={status} />
          </div>
        </div>
      )}
    </>
  );
};

export default ThumbnailBackdrop;
