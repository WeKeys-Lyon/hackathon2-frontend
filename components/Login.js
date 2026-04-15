import { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../styles/Login.module.css';
import SignUp from './SignUp'
import SignIn from './SignIn'


function Login() {

	const user = useSelector((state) => state.user.value);

	const [ModalUp, setModalUp] = useState(false);
	const [ModalIn, setModalIn] = useState(false);

	function showModalUp() {
		setModalUp(!ModalUp)
	}

	function showModalIn() {
		setModalIn(!ModalIn)
	}

	let modalUpToDraw = <SignUp />
	let modalInToDraw = <SignIn />
	return (
    <div className={styles.section}>
      <section className={styles.imageContainer}>
        <Image 
      src="/background.png"
	  height={1368}
	  width={684}
      alt="Dépotoir Tweeter"
      className={styles.background}
		/>
        <Image 
		src="/logo.png"
        height={150}
        width={150}
		alt="Logo d'un oiseau Tweeter retourné et mort"
		className={styles.logo}
        />
      </section>
      <section>

        <section className={styles.connexion}>
          <h1>See what's Happening!</h1>
          <h2>Join Hackatweet today</h2>
          <button onClick={() => showModalUp()} className={styles.btn}>Sign Up</button>
          <h3>Already have an account?</h3>
          <button onClick={() => showModalIn()} className={styles.btn}>Sign In</button>
        </section>
      </section>
		{(ModalUp) ? (modalUpToDraw) : ('')}
		{(ModalIn) ? (modalInToDraw) : ('')}
    </div>
  );
}

export default Login;