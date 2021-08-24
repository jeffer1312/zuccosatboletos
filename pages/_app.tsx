import '../styles/globals.css';
import '../styles/styles.css';
import 'animate.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/styles';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SideProvider } from '../src/context/context';
function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement !== null
  //       ? jssStyles.parentElement.removeChild(jssStyles)
  //       : '';
  //   }
  // }, []);

  return (
    <SideProvider>
      {/* <StylesProvider injectFirst> */}
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      {/* <CssBaseline /> */}
      <Component {...pageProps} />
      {/* </StylesProvider> */}
    </SideProvider>
  );
}
export default MyApp;
