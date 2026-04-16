import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {Navigate} from "react-router-dom";
import { addTweet } from '../reducers/tweets';

import Menu from './Menu';
import LastTweet from './LastTweet';
import Trends from './Trends';
import WriteTweet from './WriteTweet'

function Home() {
    const user = useSelector((state) => state.user.value);


  return (
    <div>
      {(user.token && user.username && user.avatar) ? '': <Navigate to="/" />}
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
