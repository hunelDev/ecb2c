import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import { GeneralContext } from '../../components/GeneralContext';
import ProfileLayout from '../../components/template/ProfileLayout';
import { api } from '../../utils/api';
import { checkToken, getCookie } from '../../utils/general';

const Profile: NextPage = () => {
  const context = useContext<any>(GeneralContext);

  return (
    <>
      <Head>
        <title>Hunel Game - Profile</title>
      </Head>
      <ProfileLayout>
        <div className="h-full">a</div>
      </ProfileLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const auth = await checkToken(req);

  if (!auth)
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

export default Profile;
