import { FC, MouseEventHandler } from 'react';

type ThumbnailRemoveBtnProps = {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
};

const ThumbnailRemoveBtn: FC<ThumbnailRemoveBtnProps> = ({ clickHandler }) => {
  return (
    <button
      type="button"
      aria-hidden="true"
      className="absolute rounded-full bg-blue-500 px-2 text-white right-0 top-0 opacity-0 transition-opacity duration-250 z-10"
      title="Sil"
      onClick={clickHandler}
    >
      <span>x</span>
    </button>
  );
};

export default ThumbnailRemoveBtn;
