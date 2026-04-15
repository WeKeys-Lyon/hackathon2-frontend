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
    <div >
      <section>
        <Image 
      src="/background.png"
	  height={1368}
	  width={684}
      alt="Dépotoir Tweeter"
		/>
      </section>
      <section>
        <Image 
		src="/logo.png"
		height={500}
		width={500}
		alt="Logo d'un oiseau Tweeter retourné et mort"
		/>
        <section>
          <h1 className={styles.title}>See what's Happening!</h1>
          <h2 className={styles.title}>Join Hackatweet today</h2>
          <button onClick={() => showModalUp()}>Sign Up</button>
          <h3>Already have an account?</h3>
          <button onClick={() => showModalIn()}>Sign In</button>
        </section>
      </section>
		{(ModalUp) ? (modalUpToDraw) : ('')}
		{(ModalIn) ? (modalInToDraw) : ('')}


    </div>
  );
}

export default Login;