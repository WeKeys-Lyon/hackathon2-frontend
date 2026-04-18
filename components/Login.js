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
console.log(user)
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
		
    <div className={styles.section}>
      <section className={styles.imageContainer}>
        <Image 
      src="/background.png"
      layout='fill'
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