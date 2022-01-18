import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import ListItem from '../components/ListItem';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { api } from '../utils/general';
import App from '../components/template/App';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hunel Game</title>
      </Head>
      <App>
        <div className="w-full flex justify-center mt-2">
          <div className="w-4/5">
            <div className="relative w-full">
              <Link href="/">
                <a>
                  <div className="h-[26rem] relative">
                    <Image src="/slide_1.webp" layout="fill" priority={true} />
                  </div>
                </a>
              </Link>
            </div>
            <div className="flex justify-center">
              <div>
                <button className="px-5 py-[3px] bg-gray-600 rounded-full mx-2"></button>
                <button className="px-5 py-[3px] bg-gray-600 rounded-full mx-2"></button>
                <button className="px-5 py-[3px] bg-gray-600 rounded-full mx-2"></button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center mt-6">
          <div className="w-4/5">
            <div className="pt-8 pb-4 px-6">
              <h2 className="flex before:grow before:h-[1px] before:bg-gray-400 before:self-end after:grow after:h-[1px] after:bg-gray-400 after:self-end after:ml-12 before:mr-12 text-gray-600 font-bold mb-6 text-2xl font-openSans">
                Bugüne Özel İndirim
              </h2>
            </div>
            <div className="px-6 font-openSans">
              <ul className="grid grid-cols-6 gap-4">
                <ListItem imgSrc="1.webp" content="New World Gold" />
                <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
                <ListItem imgSrc="2.jpeg" content="WOW Gold" />
                <ListItem imgSrc="1.webp" content="Poe Exalted Orb" />
                <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
                <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
                <ListItem imgSrc="1.webp" content="New World Gold" />
                <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
                <ListItem imgSrc="2.jpeg" content="WOW Gold" />
                <ListItem imgSrc="1.webp" content="Poe Exalted Orb" />
                <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
                <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
              </ul>
            </div>
            <div className="w-full h-[1px] bg-gray-400 mt-12"></div>
          </div>
        </div>
      </App>
    </>
  );
};

export default Home;
