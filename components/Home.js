import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      {(user.token && user.username && user.avatar) ? '': <Navigate to="/" />}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

export default Home;
