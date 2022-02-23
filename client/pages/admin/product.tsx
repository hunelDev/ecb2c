import type { NextPage } from 'next';
import Head from 'next/head';
import { MouseEventHandler, useEffect, useState } from 'react';
import ProductCreate from '../../components/admin/ProductCreate';
import Alert from '../../components/Alert';
import Model from '../../components/Model';
import Panel from '../../components/template/admin/Panel';
import { api } from '../../utils/api';

const Product: NextPage = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [categories, setCategories] = useState<null | []>(null);

  const relativeFn = (value: boolean) => {
    setShow(value);
  };

  const relativeFn2 = (value: boolean) => {
    setShow2(value);
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

  return (
    <>
      <Head>
        <title>Hunel Game - Yönetici Paneli</title>
      </Head>
      <Panel>
        <div className="flex justify-end">
          <div>
            <button
              className="px-2.5 py-1.5 mr-16 bg-indigo-500"
              onClick={() => {
                if (show2) {
                  setShow2((s) => !s);
                  return;
                }

                setShow2(true);
              }}
            >
              asd
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!show) setShow(true);
              }}
              className="px-2 py-1.5 bg-blue-500 text-white rounded-sm"
            >
              Yeni Ürün Ekle
            </a>
          </div>
        </div>
      </Panel>
      <Model show={show} relativeFn={relativeFn} heading="Yeni Ürün Ekle">
        <ProductCreate />
      </Model>
      <Alert show={show2} relativeFn={relativeFn2} timer={false}>
        Deneme
      </Alert>
    </>
  );
};

export default Product;
