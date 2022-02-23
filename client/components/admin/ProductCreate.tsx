import {
  DragEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MdAddBox, MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { api } from '../../utils/api';
import {
  convertFormatedValueToFloat,
  destoryImage,
  findIndexInObjectsArray,
  generateUniqueId,
  getValueAsFormated,
  refineMulitpleFiles,
  uploadImages,
} from '../../utils/general';
import { ContentsType, ImageObjectType } from '../../utils/types';
import Input from '../Input';
import Spinner from '../Spinner';
import ProductContentItem from './ProductContentItem';
import ThumbnailItem from './ThumbnailItem';

const ProductCreate: FC = () => {
  const [showAtHome, setShowAtHome] = useState(false);
  const [process, setProcess] = useState(0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('0');
  const [amount, setAmount] = useState('0');
  const [parentId, setParentId] = useState('0');
  const [categories, setCategories] = useState<any[] | null>([]);
  const [isDragEntered, setIsDragEntered] = useState(false);
  const [imagesObjectsList, setImagesObjectsList] = useState<ImageObjectType[]>(
    []
  );
  const [uploadStatus, setUploadStatus] = useState<'pending' | 'uploading'>(
    'pending'
  );
  const [contentSections, setContentSections] = useState<ContentsType>({});

  useEffect(() => {
    if (!categories!.length) {
      api()
        .get('/admin/categories')
        .then(({ data }) => {
          setProcess(1);
          setCategories(data.result);
        });
    }
  }, []);

  const categoryList = useMemo(
    () =>
      categories?.map((category) => (
        <option value={category.id} key={category.uuid}>
          {category.name}
        </option>
      )),
    [categories]
  );

  const productContentItems = useMemo(
    () =>
      Object.keys(contentSections).map((key) => {
        return (
          <ProductContentItem
            id={key}
            title={contentSections[key].title}
            explanation={contentSections[key].explanation}
            key={key}
            contentSectionsState={{ contentSections, setContentSections }}
          />
        );
      }),
    [contentSections]
  );

  const addContentSection: MouseEventHandler<HTMLButtonElement> = () => {
    const newContentSectionObj: ContentsType = { ...contentSections };
    const id = generateUniqueId();

    newContentSectionObj[id] = {
      title: '',
      explanation: '',
    };

    setContentSections(newContentSectionObj);
  };

  const removeBtnHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { parentElement } = e.currentTarget.parentElement!;
    const { id } = parentElement!.dataset;
    if (id) {
      let index = findIndexInObjectsArray(imagesObjectsList, 'id', id);
      const { public_id, status } = imagesObjectsList[index];
      if (status === 'success' && public_id) {
        destoryImage(public_id).then((res) => {
          if (res) {
            api()
              .get('/admin/image', {
                params: {
                  id: public_id,
                },
              })
              .then(() => {
                removeThumbnailItem(index);
              });
          }
        });

        return;
      }
      removeThumbnailItem(index);
    }

    function removeThumbnailItem(index: number) {
      let seperatedObj = imagesObjectsList.concat();
      seperatedObj.splice(index, 1);
      setImagesObjectsList(seperatedObj);
    }
  };

  const ImagesList = useMemo(() => {
    return imagesObjectsList.map(({ id, status, src }) => (
      <ThumbnailItem
        id={id}
        status={status}
        src={src}
        key={id}
        removeBtnEventHandler={removeBtnHandler}
      />
    ));
  }, [imagesObjectsList]);

  const imageUploadHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    if (imagesObjectsList.length > 0 && uploadStatus === 'pending') {
      setUploadStatus('uploading');
      uploadImages(imagesObjectsList, ({ index, status, data }) => {
        const newImagesObjectsList = imagesObjectsList.concat();
        newImagesObjectsList[index].status = status;
        if (status === 'success') {
          newImagesObjectsList[index].foreignSrc = data.secure_url;
          newImagesObjectsList[index].public_id = data.public_id;
          api()
            .put('/admin/image', {
              id: data.public_id,
              src: data.secure_url,
            })
            .then(() => {
              setImagesObjectsList(newImagesObjectsList);
            })
            .catch(() => {
              setUploadStatus('pending');
            });
        }
      }).then(() => {
        setUploadStatus('pending');
      });
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    api()
      .put('/admin/category', {
        title,
        parentId,
        showAtHome,
      })
      .then(({ data }) => console.log(data));
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {};

  const render = [
    <div className="flex justify-center items-center w-[500px] pr-6">
      <div className="w-12 h-12">
        <Spinner />
      </div>
    </div>,
    <form action="post" onSubmit={handleSubmit} className="w-[550px]">
      <div className="mb-6">
        <label className="block">Başlığı</label>
        <Input
          onClick={() => {
            console.log('yo');
          }}
          className="border border-red-500"
        />
        <input
          type="text"
          name=""
          className="border border-gray-300 w-full px-1 py-0.5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-6">
        <label className="block">Kategorisi</label>
        <div>
          <select
            className="w-full border border-gray-300 px-1 py-0.5"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="0"></option>
            {categoryList}
          </select>
        </div>
      </div>
      <div className="my-6">
        <label className="block">Fiyatı</label>
        <input
          type="text"
          name=""
          className="border border-gray-300 w-full px-1 py-0.5"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => {
            setPrice(getValueAsFormated(price));
          }}
        />
      </div>
      <div className="my-6">
        <label className="block">Para Birimi</label>
        <div>
          <select
            className="w-full border border-gray-300 py-0.5 px-1"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            <option value="0">₺</option>
            <option value="1">$</option>
            <option value="2">€</option>
          </select>
        </div>
      </div>
      <div className="w- my-6">
        <label className="block">Stok</label>
        <input
          type="text"
          name=""
          className="border border-gray-300 w-full px-1 py-0.5"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label>Görsel Yükle</label>
        <div
          className={`border border-gray-300 w-full h-24 p-2 relative bg-gray-100`}
        >
          <div className="flex justify-center items-center h-full">
            <MdOutlineAddPhotoAlternate
              className={`text-3xl ${
                isDragEntered ? 'text-blue-500' : 'text-gray-300'
              }`}
            />
          </div>
          <div
            className="absolute inset-0 w-full h-full z-10"
            onDrop={async (e) => {
              e.stopPropagation();
              e.preventDefault();

              setIsDragEntered(false);
              const { files } = e.dataTransfer;
              if (files.length > 0) {
                const refinedFileObjects = await refineMulitpleFiles([
                  ...files,
                ]);
                const newImageObjects: ImageObjectType[] =
                  refinedFileObjects.map(({ src, file }) => ({
                    src,
                    id: generateUniqueId(),
                    status: 'pending',
                    file,
                  }));
                setImagesObjectsList(imagesObjectsList.concat(newImageObjects));
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={(e) => {
              setIsDragEntered(true);
            }}
            onDragLeave={() => {
              setIsDragEntered(false);
            }}
          ></div>
        </div>
        {ImagesList.length > 0 && (
          <div>
            <div className="border border-gray-300 border-t-0 p-2">
              <ul className="flex flex-wrap">{ImagesList}</ul>
            </div>
            <button
              className="bg-green-500 text-white px-2 py-1.5 w-full disabled:bg-green-300 mt-2 hover:bg-green-600"
              onClick={
                [() => {}, imageUploadHandler][+(uploadStatus === 'pending')]
              }
              type="button"
              disabled={uploadStatus === 'uploading'}
            >
              {
                [
                  'Yükle',
                  <div className="flex justify-center items-center">
                    <div className="w-6 h-6 p-0.5">
                      <Spinner className="!border-white !border-t-transparent !border-[3px]" />
                    </div>
                  </div>,
                ][+(uploadStatus === 'uploading')]
              }
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="border-b border-gray-300 my-3 py-3 flex">
          <h2 className="text-2xl mr-auto">İçerikler</h2>
          <button onClick={addContentSection} type="button">
            <MdAddBox
              className="text-green-500 text-4xl"
              title="Yeni İçerik Bölümü Ekle"
            />
          </button>
        </div>
        <div>{productContentItems}</div>
      </div>
      <button className="bg-blue-500 text-white px-2 py-1.5 w-full">
        Ekle
      </button>
    </form>,
  ];

  return <div>{render[process]}</div>;
};

export default ProductCreate;
