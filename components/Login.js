import { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";

import styles from '../styles/Login.module.css';
import SignUp from './SignUp'
import SignIn from './SignIn'


function Login() {

	const user = useSelector((state) => state.user.value);

	const [ModalUp, setModalUp] = useState(false);
	const [ModalIn, setModalIn] = useState(false);



	const showModalUp = () =>{
		setModalUp(!ModalUp)
	}

	const showModalIn = () => {
		setModalIn(!ModalIn)
	}

	let modalUpToDraw = <SignUp showModalUp={showModalUp}/>
	let modalInToDraw = <SignIn showModalIn={showModalIn}/>
	return (
    <div className={styles.section}>
        {(user.token && user.username && user.avatar) ? <Navigate to="/home" /> : ''}
      <section className={styles.imageContainer}>
        <Image 
      src="/background.png"
	  height={1368}
	  width={684}
      alt="Dépotoir Tweeter"
      className={styles.background}
		/>
      </section>
      <section>
        <section className={styles.connexionContainer}>
            <Image 
              src="/logo.png"
                  height={50}
                  width={50}
                  style={{ width: '50px', height: 'auto' }}
              alt="Logo d'un oiseau Tweeter retourné et mort"
              className={styles.logo}
          />
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