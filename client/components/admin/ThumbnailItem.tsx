import { FC, MouseEventHandler } from 'react';
import ThumbnailBackdrop from './ThumbnailBackdrop';
import ThumbnailRemoveBtn from './ThumbnailRemoveBtn';

type ThumbnailItemProps = {
  id: string;
  src: string;
  status: 'pending' | 'success' | 'unsuccess';
  removeBtnEventHandler: MouseEventHandler<HTMLButtonElement>;
};
const ThumbnailItem: FC<ThumbnailItemProps> = ({
  id,
  src,
  status,
  removeBtnEventHandler,
}) => {
  const thumbnailMouseEventHandler: MouseEventHandler<HTMLLIElement> = (e) => {
    const { children } = e.currentTarget;
    const childrenItem = children.item(0)!.children;
    childrenItem.item(1)!.classList.toggle('opacity-70');
    childrenItem.item(0)!.classList.toggle('opacity-0');
    childrenItem.item(0)!.classList.toggle('opacity-100');
  };

  return (
    <li
      className="w-1/5"
      data-id={id}
      onMouseOver={thumbnailMouseEventHandler}
      onMouseOut={thumbnailMouseEventHandler}
    >
      <div className="mx-0.5 relative">
        <ThumbnailRemoveBtn clickHandler={removeBtnEventHandler} />
        <ThumbnailBackdrop status={status} />
        <img
          src={src}
          alt=""
          draggable={'false'}
          className="transition-opacity duration-75"
        />
      </div>
    </li>
  );
};

export default ThumbnailItem;
