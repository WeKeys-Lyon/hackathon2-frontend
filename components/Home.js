import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";
import Menu from './Menu';
import Tweets from './Tweets';
import LastTweet from './LastTweet';
import Trends from './Trends';

function Home() {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      {(user.token && user.username && user.avatar) ? '': <Navigate to="/" />}
      <section>PANNEAU DE GAUCHE<Menu /></section>
      <section>PANNEAU CENTRAL
        <section>J'écris un tweet<Tweets /></section>
        <section>LISTE DES TWEETS<LastTweet /></section>
      </section>
      <section>PANNEAU DE DROITE<Trends /></section>
    </div>
  );
}

export default Home;
