import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Signin.module.css';
import { login } from '../reducers/user';
import Image from 'next/image';


function SignIn(props) {  
    const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const handleConnection = () => {

    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signInUsername.toLowerCase(), password: signInPassword}),
    }).then(response => response.json())
        .then(data =>  {
            if (data.result) {
                console.log(data)
                if (data.likes.length > 0) {
                dispatch(login({ username: signInUsername, token: data.token, avatar: data.avatar, firstname: data.firstname, id: data.id, likes: data.likes }));
                } else {
                dispatch(login({ username: signInUsername, token: data.token, avatar: data.avatar, firstname: data.firstname, id: data.id }));
                }
                setSignInUsername('');
                setSignInPassword('');
                
            }
        });
};

    function ModalIn() {
        props.showModalIn()
    }

    return      (<>
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
		<h2 className={styles.h2}>Connect to hackatweet</h2>
            <button className={styles.close} onClick={() => ModalIn()}>X</button>
            <input className={styles.field} placeholder="Username" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} />
            <input  className={styles.field}placeholder="Password" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
            <button className={styles.btn} onClick={() => handleConnection()}>Sign In</button>
	    </section>
        </div>
        </>)
};

export default SignIn