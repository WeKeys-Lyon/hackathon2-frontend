import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Signup.module.css'
import { login } from '../reducers/user';
import Image from 'next/image';
import * as React from 'react';

function SignUp(props) {
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpFirstname, setSignUpFirstname] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
    const [choosenAvatar, setChoosenAvatar] = useState('');

    const avatars = ['bardello','elon','goodenough','misterx','poppins','rupaul','sarko','trumpet']
    
    const dispatch = useDispatch();


        const handleRegister = () => {
            fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: signUpUsername.toLowerCase(), password: signUpPassword, firstname: signUpFirstname, avatar: choosenAvatar}),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(login({ username: signUpUsername, token: data.token, avatar: choosenAvatar, firstname: data.firstname, id: data.id }));
                        setSignUpUsername('');
                        setSignUpPassword('');
                        setSignUpFirstname('');
                    }
                });
        };
        function ModalUp() {
            props.showModalUp()
        }

        const avatarDraw = avatars.map((avatar,i) => {
            const path = `/avatars/${avatar}.png`
            const alternate = `Avatar choice ${avatar}`
            return <React.Fragment key={i}>
                <Image 
                src={path}
                alt={alternate}
                height={150}
                width={150}
                className={styles.avatar}
                onClick={() => setChoosenAvatar(i)}
                />
            </React.Fragment>
        })
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
            <div className={styles.avatarbox}>
                {avatarDraw}
            </div>
            <button className={styles.btn} onClick={() => handleRegister()}>Sign Up</button>
		</section>
        </div>
        </>
    )
};

export default SignUp