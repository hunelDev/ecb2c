import { Dispatch, FC, SetStateAction } from 'react';
import { ContentsType } from '../../utils/types';

type ProductContentItemProps = {
  id: string;
  title: string;
  explanation: string;
  contentSectionsState: {
    contentSections: ContentsType;
    setContentSections: Dispatch<SetStateAction<ContentsType>>;
  };
};
const ProductContentItem: FC<ProductContentItemProps> = ({
  id,
  title,
  explanation,
  contentSectionsState,
}) => {
  return (
    <div className="my-6">
      <div className="flex items-center">
        <span className="w-full mr-3 h-[1px] bg-blue-400"></span>
        <button
          type="button"
          aria-hidden="true"
          className="rounded-full bg-blue-500 px-2 text-white"
          title="Sil"
          onClick={() => {
            const newContentSectionObj: ContentsType = {
              ...contentSectionsState.contentSections,
            };
            delete newContentSectionObj[id];
            contentSectionsState.setContentSections(newContentSectionObj);
          }}
        >
          <span>x</span>
        </button>
      </div>
      <div className="mt-1 mb-3">
        <label htmlFor="">Başlık</label>
        <input
          type="text"
          name=""
          id=""
          value={title}
          className="border border-gray-300 w-full"
          onChange={(e) => {
            const newContentSectionObj: ContentsType = {
              ...contentSectionsState.contentSections,
            };
            newContentSectionObj[id].title = e.target.value;
            contentSectionsState.setContentSections(newContentSectionObj);
          }}
        />
      </div>
      <div className="my-3">
        <label htmlFor="">Açıklama</label>
        <textarea
          className="border border-gray-300 w-full"
          rows={6}
          cols={5}
          value={explanation}
          spellCheck={false}
          onChange={(e) => {
            const newContentSectionObj: ContentsType = {
              ...contentSectionsState.contentSections,
            };
            newContentSectionObj[id].explanation = e.target.value;
            contentSectionsState.setContentSections(newContentSectionObj);
          }}
        />
      </div>
      <span className="w-full h-[1px] bg-blue-400 block my-6"></span>
    </div>
  );
};

export default ProductContentItem;
