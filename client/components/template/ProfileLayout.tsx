import Head from 'next/head';
import Link from 'next/link';
import { FC, useContext } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { GrUserSettings } from 'react-icons/gr';
import { GeneralContext } from '../GeneralContext';
import App from './App';

const ProfileLayout: FC = ({ children }) => {
  const context = useContext<any>(GeneralContext);
  return (
    <>
      <Head>
        <style>{`
        body {
          background-color: white !important;
        }
        `}</style>
      </Head>
      <App>
        <section className="w-4/5 mx-auto mt-10 mb-8 flex">
          <aside className="w-1/5">
            <div className="px-8 border-r border-gray-300">
              <div className="text-gray-600">
                <strong>{context.user}</strong>
              </div>
              <div className="py-4">
                <div className="flex my-4">
                  <div className="mr-2">
                    <FiShoppingBag className="text-xl" />
                  </div>
                  <div className="font-semibold text-md">Siparişlerim</div>
                </div>
                <div>
                  <div className="flex my-2">
                    <div className="mr-2">
                      <GrUserSettings className="text-xl" />
                    </div>
                    <div className="font-semibold text-md">
                      Kullanıcı Bilgilerim
                    </div>
                  </div>
                  <div className="text-sm pl-4">
                    <div className="px-2 py-1">
                      <Link href="/profile/information">
                        <a>Üyelik Bilgilerim</a>
                      </Link>
                    </div>
                    <div className="px-2 py-1">Adres ve Fatura Bilgilerim</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div className="ml-4 w-4/5">{children}</div>
        </section>
      </App>
    </>
  );
};

export default ProfileLayout;
