import { FC, HTMLAttributes } from 'react';

type SpinnerProps = {
  className?: string;
};
const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={` ${className} w-full h-full border-[#0071bc] rounded-full border-t-transparent animate-spin border-[6px]`}
    ></div>
  );
};

export default Spinner;
