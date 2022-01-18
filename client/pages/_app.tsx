import '../styles/tailwind.css';
import '../styles/globals.css';
import '../styles/extra.css';

import type { AppProps } from 'next/app';

import { CookiesProvider } from 'react-cookie';
import GeneralContext from '../components/GeneralContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <GeneralContext>
        <Component {...pageProps} />
      </GeneralContext>
    </CookiesProvider>
  );
}

export default MyApp;
