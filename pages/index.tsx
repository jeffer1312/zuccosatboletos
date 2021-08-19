import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../src/components/Layout';
const Home: NextPage = () => {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
      </Head>
      <Layout />
    </div>
  );
};

export default Home;
