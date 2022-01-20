import Link from 'next/link';
import { FC } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

type HeaderAttributes = {
  user: string | null;
};
const Header: FC<HeaderAttributes> = ({ user }) => {
  return (
    <header>
      <div className="w-full bg-white shadow border border-gray-50 p-1 justify-center flex relative">
        <div className="w-4/5">
          <ul className="flex justify-end">
            <li className="mx-2 after:absolute after:h-0.5 after:w-0 hover:after:w-full after:ease-out after:bg-gray-400 relative duration-300 after:transition-all after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2">
              <Link href="/">
                <a className="font-openSans text-xs font-semibold">
                  Süper Fırsatlar
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/">
                <a className="font-openSans text-xs font-semibold after:absolute after:h-0.5 after:w-0 hover:after:w-full after:ease-out after:bg-gray-400 relative duration-300 after:transition-all after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2">
                  Bize Ulaş
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/">
                <a className="font-openSans text-xs font-semibold after:absolute after:h-0.5 after:w-0 hover:after:w-full after:ease-out after:bg-gray-400 relative duration-300 after:transition-all after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2">
                  Kurumsal
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white shadow-sm flex justify-center border-t border-b border-t-gray-100 border-b-gray-200">
        <div className="w-4/5 py-4 flex items-center">
          <div className="grow mr-6">
            <Link href="/">
              <a>
                <img
                  src="/logo.png"
                  className="h-16"
                  alt="hunel logo"
                  title="hunel logo"
                />
              </a>
            </Link>
          </div>
          <div className="px-2 flex w-full">
            <div className="flex w-full">
              <div className="border border-gray-300 border-r-0 flex rounded-l-md px-4 py-2 w-full">
                <FaSearch className="self-center mr-2 text-gray-300 text-lg" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  autoComplete="off"
                  className="w-full"
                />
              </div>
              <button className="bg-gray-200 px-6 py-1 text-sm font-semibold text-gray-400 border border-gray-300 border-l-0">
                Ara
              </button>
            </div>
            <div className="shrink-0 ml-6">
              <Link href={user ? '/profile' : '/login'}>
                <a>
                  <div className="border-2 border-gray-300 rounded-full flex justify-between px-6 py-1.5">
                    <div className="mr-3 self-center">
                      <FaUser className="text-2xl text-gray-500 inline-block" />
                    </div>
                    <div className="text-center">
                      <span className="block leading-5 font-semibold">
                        {user ? `HESABIM` : `Giriş Yap`}
                      </span>
                      <span className="block leading-4 text-xs">
                        {user ?? `Kayıt Ol`}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-white font-exo2 font-semibold tracking-wide">
        <div className="w-4/5 flex items-center border-r border-l border-gray-300 bg-gray-100 relative">
          <ul className="grid grid-cols-6 w-full text-center text-gray-400 text-sm">
            <li className="inlin border-r border-gray-300 last:border-0 py-3.5 anim-max-height transition-colors duration-500 hover:bg-white border-b hover:border-b-transparent">
              <Link href="/">
                <a>OYUNLAR</a>
              </Link>
              <div className="absolute z-50 w-full top-full text-left box-content right-[-1px] bg-white border-0">
                <ul className="grid grid-cols-2 p-4">
                  <li>GS-GO</li>
                  <li>DOTA 2</li>
                  <li>POE</li>
                  <li>LEAGUE OF LEGENDS</li>
                  <li>VALORANT</li>
                  <li>PUG G</li>
                </ul>
              </div>
            </li>
            <li className="inlin border-r border-gray-300 last:border-0 py-3.5 anim-max-height transition-colors duration-500 hover:bg-white border-b hover:border-b-transparent">
              <Link href="/">
                <a>CS-GO SKIN</a>
              </Link>
              <div className="absolute z-50 w-full top-full border-0 text-left box-content right-[-1px] bg-white">
                <ul>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                  <li>a</li>
                </ul>
              </div>
            </li>
            <li className="inline border-r border-gray-300 last:border-0 py-3.5 border-b">
              <Link href="/">
                <a>VALORANT VP</a>
              </Link>
            </li>
            <li className="inline border-r border-gray-300 last:border-0 py-3.5 border-b">
              <Link href="/">
                <a>PUP G</a>
              </Link>
            </li>
            <li className="inline border-r border-gray-300 last:border-0 py-3.5 border-b">
              <Link href="/">
                <a>STEAM CÜZDAN KODU</a>
              </Link>
            </li>
            <li className="inline border-r border-gray-300 last:border-r-0 py-3.5 border-b">
              <Link href="/">
                <a>DESTEK</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
