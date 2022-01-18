import { FC } from 'react';

type ListItemProps = {
  imgSrc: string;
  content: string;
};

const ListItem: FC<ListItemProps> = ({ imgSrc, content }) => {
  return (
    <li>
      <div className="bg-gray-100 rounded-xl shadow-md py-2 border border-gray-300 asd">
        <div
          className="w-52 h-52 bg-no-repeat rounded-full mx-auto"
          style={{
            backgroundImage: `url(./${imgSrc})`,
            backgroundSize: 'contain',
            backgroundPosition: 'top',
          }}
        ></div>
        <div className="p-2">
          <div className="text-gray-500 font-semibold pb-2">{content}</div>
          <div className="w-full flex justify-end">
            <div className="">
              <div>
                <span className="text-gray-400 text-sm line-through italic">
                  15,00₺
                </span>
                <div className="inline bg-red-500 px-1 py-0.5 rounded-full">
                  <span className="text-xs text-white font-semibold">%50</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-green-600 font-bold text-lg">7,50₺</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
