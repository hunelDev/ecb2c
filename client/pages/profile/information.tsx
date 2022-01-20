import { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { GeneralContext } from '../../components/GeneralContext';
import Model from '../../components/Model';
import ProfileAddress from '../../components/ProfileAddress';
import ProfileLayout from '../../components/template/ProfileLayout';

const Information: NextPage = () => {
  const context = useContext<any>(GeneralContext);
  const [show, setShow] = useState(false);

  return (
    <>
      <Head>
        <title>Hunel Game - Profile</title>
      </Head>
      <ProfileLayout>
        <div className="h-full">
          <button className="p-2 bg-indigo-500" onClick={() => setShow(true)}>
            Show
          </button>
          <Model
            show={show}
            relativeFn={(s) => {
              setShow(s);
            }}
          >
            <ProfileAddress />
          </Model>
        </div>
      </ProfileLayout>
    </>
  );
};

export default Information;
