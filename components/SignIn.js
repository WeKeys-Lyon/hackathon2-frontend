import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Login.module.css';
import { login } from '../reducers/user';
import { useRouter } from 'next/router'


function SignIn(props) {  
    const router = useRouter()
    const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false)

    const dispatch = useDispatch();

    const handleConnection = () => {

    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signInUsername.toLowerCase(), password: signInPassword}),
    }).then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log(data)
                dispatch(login({ username: signInUsername, token: data.token, avatar: data.avatar, firstname: data.firstname }));
                setSignInUsername('');
                setSignInPassword('');
                setIsLogged(true);
            }
        });
};

    useEffect(() => {
        if (isLogged) {
            router.push('/home')
        }
    },[isLogged])

    function ModalIn() {
        props.showModalIn()
    }

    return      (<>
		<h2>Connect to hackatweet</h2>
        <button onClick={() => ModalIn()}>X</button>
        <input placeholder="Username" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
        <button onClick={() => handleConnection()}>Sign In</button>
       {/*  {(isLogged) ? router.push("/home") : ''} */}
	    </>)
};

export default SignIn