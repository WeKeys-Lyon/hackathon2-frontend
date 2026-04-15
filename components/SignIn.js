import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Login.module.css';
import { login } from '../reducers/user';


function SignIn(props) {  
    const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

    const dispatch = useDispatch();

    const handleConnection = () => {

    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signInUsername.toLowerCase(), password: signInPassword }),
    }).then(response => response.json())
        .then(data => {
            if (data.result) {
                dispatch(login({ username: signInUsername, token: data.token }));
                setSignInUsername('');
                setSignInPassword('');
                //TODO : Envoyer sur la home
            }
        });
};
    return      (<>
		<h2>Connect to hackatweet</h2>
        <input placeholder="Username" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
        <button onClick={() => handleConnection()}>Sign In</button>
	    </>)
};

export default SignIn