import { FC, FormEventHandler, useEffect, useMemo, useState } from 'react';
import { api } from '../../utils/api';
import Spinner from '../Spinner';

const CategoryCreate: FC = () => {
  const [showAtHome, setShowAtHome] = useState(false);
  const [process, setProcess] = useState(0);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('0');
  const [categories, setCategories] = useState<any[] | null>([]);

  useEffect(() => {
    api()
      .get('/admin/categories')
      .then(({ data }) => {
        setProcess(1);
        setCategories(data.result);
      });
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    api()
      .put('/admin/category', {
        name,
        parentId,
        showAtHome,
      })
      .then(({ data }) => console.log(data));
  };
  const render = [
    <div className="flex justify-center items-center">
      <Spinner />
    </div>,
    <form action="post" onSubmit={handleSubmit}>
      <div>
        <label className="block">Kategori Adı</label>
        <input
          type="text"
          name=""
          className="border border-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="my-6">
        <label className="block">Üst kategoriyi seçin</label>
        <div>
          <select
            className="w-full border border-gray-300 py-0.5"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="0"></option>
            {categoryList}
          </select>
        </div>
      </div>
      <div className="my-6">
        <label>Anasayfada göster</label>
        <input
          type="checkbox"
          name=""
          id=""
          value="1"
          checked={showAtHome}
          onChange={(e) => {
            setShowAtHome(e.currentTarget.checked);
          }}
          className="ml-2"
        />
      </div>
      <button className="bg-green-600 text-white px-2 py-1.5 w-full">
        Ekle
      </button>
    </form>,
  ];

  return <div>{render[process]}</div>;
};

export default CategoryCreate;
