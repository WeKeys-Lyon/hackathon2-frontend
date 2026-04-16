import '../styles/globals.css';
import Head from 'next/head';
import Home from '../components/Home';
import Login from '../components/Login';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store'; // tout vient de store.js

import { BrowserRouter,Routes, Route } from 'react-router-dom';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>hackatweet</title>
        </Head>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;