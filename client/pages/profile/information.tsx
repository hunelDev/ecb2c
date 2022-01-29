import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import ContactInfo from '../../components/ContactInfo';
import MembershipInfo from '../../components/MembershipInfo';
import ProfileLayout from '../../components/template/ProfileLayout';
import { api } from '../../utils/api';
import { checkToken } from '../../utils/general';
import { User } from '../../utils/types';

const Information: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api()
      .get('/user')
      .then(({ data }) => {
        if (data) {
          setUser(data.result);
          return;
        }
      });
  }, []);

  const updateFn = () => {
    api()
      .get('/user')
      .then(({ data }) => {
        if (data) {
          setUser(data.result);
          return;
        }
      });
  };

  return (
    <>
      <Head>
        <title>Hunel Game - Profile</title>
      </Head>
      <ProfileLayout>
        <div>
          <h2 className="text-gray-600 text-xl font-bold tracking-wider">
            Üyelik Bilgilerim
          </h2>
          <MembershipInfo dataInit={user!} updateFn={updateFn} />
        </div>
        <div className="my-8">
          <h2 className="text-gray-600 text-xl font-bold tracking-wider">
            İletişim Bilglerim
          </h2>
          <ContactInfo dataInit={user!} updateFn={updateFn} />
        </div>
      </ProfileLayout>
    </>
  );
};

export default Information;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await checkToken(req);

  if (!user)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

// const [show, setShow] = useState(false);
// <Model
// show={show}
// relativeFn={(s) => {
//   setShow(s);
// }}
// >
// <ProfileAddress />
// </Model>

{
  /* <div className="h-full">
<button className="p-2 bg-indigo-500" onClick={() => setShow(true)}>
  Show
</button>
</div> */
}
