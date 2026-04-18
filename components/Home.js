import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

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
    <div className={styles.maincontainer}>
      <section className={styles.left}>
        <Menu username={user.username} avatar={user.avatar} firstname={user.firstname} />
      </section>
      <section className={styles.center}>
        <div>
          <p className={styles.title} >Home</p>
          <WriteTweet />
        </div>
        <div className={styles.tweetList}>
          <LastTweet />
        </div>
      </section>
      <section className={styles.right}>
        <p className={styles.title}>Trends</p>
        <Trends />
      </section>
    </div>
  );
}

export default Home;
