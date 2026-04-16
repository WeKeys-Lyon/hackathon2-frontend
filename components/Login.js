import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

import styles from '../styles/Login.module.css';
import SignUp from './SignUp'
import SignIn from './SignIn'


function Login() {
	const router = useRouter()
	const user = useSelector((state) => state.user.value);

	const [ModalUp, setModalUp] = useState(false);
	const [ModalIn, setModalIn] = useState(false);

	useEffect(()=> {
		(user.token && user.username && user.avatar) ? router.push('/home') : ''
	}, [user])

	const showModalUp = () =>{
		setModalUp(!ModalUp)
	}

	const showModalIn = () => {
		setModalIn(!ModalIn)
	}

	let modalUpToDraw = <SignUp showModalUp={showModalUp}/>
	let modalInToDraw = <SignIn showModalIn={showModalIn}/>
	return (
		
    <div >
		{}
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