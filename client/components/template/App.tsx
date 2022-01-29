import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { api } from '../../utils/api';
import { GeneralContext } from '../GeneralContext';
import Footer from './Footer';
import Header from './Header';

const App: FC = ({ children }) => {
  const context = useContext<any>(GeneralContext);

  return (
    <div className="font-openSans">
      <Header user={context.user} />
      <main className="min-h-[1200px]">{children}</main>
      <Footer />
    </div>
  );
};

export default App;
