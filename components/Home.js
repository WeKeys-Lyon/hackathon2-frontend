import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { addTweet } from '../reducers/tweets';

import Menu from './Menu';
import LastTweet from './LastTweet';
import Trends from './Trends';
import WriteTweet from './WriteTweet'

function Home() {
  const router = useRouter();
    const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (user.token && user.username && user.avatar) ? '': router.push("/")
  }, [] )

  return (
    <div>
      {}
      <section>PANNEAU DE GAUCHE<Menu /></section>
      <section>PANNEAU CENTRAL
        <section>
          <WriteTweet />
        </section>
        <section>LISTE DES TWEETS<LastTweet /></section>
      </section>
      <section>PANNEAU DE DROITE<Trends /></section>
    </div>
  );
}

export default Home;
