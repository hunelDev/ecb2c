import { NextPage } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import { GeneralContext } from '../../components/GeneralContext';
import ProfileLayout from '../../components/template/ProfileLayout';

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

export default Profile;
