import type { NextPage } from 'next';
import Head from 'next/head';
import Panel from '../../components/template/admin/Panel';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hunel Game - Yönetici Paneli</title>
      </Head>
      <Panel></Panel>
    </>
  );
};

export default Index;
