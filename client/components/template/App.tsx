import { FC, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { api } from '../../utils/general';
import { GeneralContext } from '../GeneralContext';
import Footer from './Footer';
import Header from './Header';

const App: FC = ({ children }) => {
  const context = useContext<any>(GeneralContext);
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    if (context.user) {
      api
        .get('/user-check')
        .then(({ data }) => {
          if (context.user !== data.name) context.setUser(data.name);
        })
        .catch((e) => context.setUser(null));
    }
  }, []);

  return (
    <div className="font-openSans">
      <Header user={context.user} />
      <main className="min-h-[1200px]">{children}</main>
      <Footer />
    </div>
  );
};

export default App;
