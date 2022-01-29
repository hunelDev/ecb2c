import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import App from '../components/template/App';
import HomeSlider from '../components/HomeSlider';
import Opportunity from '../components/Opportuniy';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/HomeSlider'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hunel Game</title>
      </Head>
      <App>
        <div className="w-full flex justify-center mt-2">
          <div className="w-4/5">
            <DynamicComponent />
          </div>
        </div>
        <div className="flex w-full justify-center mt-6">
          <Opportunity />
        </div>
      </App>
    </>
  );
};

export default Home;
