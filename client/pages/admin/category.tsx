import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import CategoryCreate from '../../components/admin/CategoryCreate';
import Panel from '../../components/template/admin/Panel';

const Category: NextPage = () => {
  const [show, setShow] = useState(false);

  const relativeFn = (value: boolean) => {
    setShow(value);
  };

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
              className="px-2 py-1.5 bg-green-300 text-green-500 rounded-sm"
            >
              Yeni Kategori Ekle
            </a>
          </div>
        </div>
      </Panel>
      <CategoryCreate show={show} relativeFn={relativeFn} />
    </>
  );
};

export default Category;
