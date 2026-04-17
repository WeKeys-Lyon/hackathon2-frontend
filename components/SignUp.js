import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Signup.module.css'
import { login } from '../reducers/user';
import {Navigate} from "react-router-dom";
import Image from 'next/image';


function SignUp(props) {
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpFirstname, setSignUpFirstname] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');

    
    const dispatch = useDispatch();


        const handleRegister = () => {
            fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: signUpUsername.toLowerCase(), password: signUpPassword, firstname: signUpFirstname, avatar: 1}),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(login({ username: signUpUsername, token: data.token, avatar: 1, firstname: data.firstname }));
                        setSignUpUsername('');
                        setSignUpPassword('');
                        setSignUpFirstname('');
                        setIsLogged(true);
                    }
                });
        };
        function ModalUp() {
            props.showModalUp()
        }
    return (
        <>
        <div className={styles.overlay}>
        <section className={styles.section}>
            <Image 
            src="/logo.png"
            height={50}
            width={50}
            style={{ width: '50px', height: 'auto' }}
            alt="Logo d'un oiseau Tweeter retourné et mort"
            className={styles.logo}
            />
		 <h2 className={styles.h2}>Create your hackatweet account</h2>
            <button className={styles.close} onClick={() => ModalUp()}>X</button>
            <input className={styles.field} placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
            <input  className={styles.field} placeholder="Firstname" value={signUpFirstname} onChange={(e) => setSignUpFirstname(e.target.value)} />
            <input  className={styles.field} placeholder="Password" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
            <button className={styles.btn} onClick={() => handleRegister()}>Sign Up</button>
            {(isLogged) ? <Navigate to="/home" /> : ''}
		</section>
        </div>
        </>
    )
};

export default SignUp