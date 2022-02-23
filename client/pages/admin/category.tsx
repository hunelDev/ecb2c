import type { NextPage } from 'next';
import Head from 'next/head';
import { MouseEventHandler, useEffect, useState } from 'react';
import CategoryCreate from '../../components/admin/CategoryCreate';
import TableExtra from '../../components/admin/tableQuery/TableQueryExtra';
import Model from '../../components/Model';
import Panel from '../../components/template/admin/Panel';
import { api } from '../../utils/api';
import { Category } from '../../utils/types';
import { MdArrowDropDown } from 'react-icons/md';

const Category: NextPage = () => {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState<null | []>(null);

  const relativeFn = (value: boolean) => {
    setShow(value);
  };

  useEffect(() => {
    if (!categories) {
      api()
        .get('/admin/categories')
        .then(({ data }) => setCategories(data.result));
    }

    if (categories) {
    }
  }, [categories]);

  const handler: MouseEventHandler<HTMLDivElement> = (e) => {
    const item = e.currentTarget;
    if (item.classList.contains('acording')) {
      item
        .closest('.top-item')
        ?.children.item(1)
        ?.classList.toggle('menu-collepse');
    }
  };

  function orderCategoryByParent(cat: Category[], parentId: number = 0) {
    const subCategoryList: any[] = [];
    cat.forEach((c) => {
      if (c.parentId === parentId) {
        const subUl = orderCategoryByParent(cat, c.id);
        subCategoryList.push(
          <div
            key={c.uuid}
            className={`cursor-pointer overflow-hidden top-item`}
          >
            <div
              className={`flex items-center${subUl ? ' acording' : ''}`}
              onClick={handler}
            >
              <span className="mr-2">{c.name}</span>
              {subUl ? <MdArrowDropDown className="inline text-lg" /> : null}
            </div>
            <div className="sub-item max-h-0">{subUl}</div>
          </div>
        );
      }
    });
    return subCategoryList.length > 0 ? (
      <div className="pl-2">{subCategoryList}</div>
    ) : null;
  }

  return (
    <>
      <Head>
        <title>Hunel Game - Yönetici Paneli</title>
      </Head>
      <Panel>
        <div className="flex justify-end">
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!show) setShow(true);
              }}
              className="px-2 py-1.5 bg-green-600 text-white rounded-sm"
            >
              Yeni Kategori Ekle
            </a>
          </div>
        </div>
        <div>{categories ? orderCategoryByParent(categories) : null}</div>
      </Panel>
      <Model show={show} relativeFn={relativeFn} heading="Yeni Kategori Ekle">
        <CategoryCreate />
      </Model>
    </>
  );
};

export default Category;
