import { FC } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

type ThumnbailBackdropIconProps = {
  status: 'pending' | 'success' | 'unsuccess';
};
const ThumnbailBackdropIcon: FC<ThumnbailBackdropIconProps> = ({ status }) => {
  return (
    <>
      {status === 'success' ? (
        <BsCheckLg className="text-green-600 text-lg" />
      ) : (
        <CgClose className="text-red-600 text-xl" />
      )}
    </>
  );
};

export default ThumnbailBackdropIcon;
