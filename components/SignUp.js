import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Login.module.css';
import { login } from '../reducers/user';


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
                        dispatch(login({ username: signUpUsername, token: data.token, avatar: 1 }));
                        setSignUpUsername('');
                        setSignUpPassword('');
                        setSignUpFirstname('');
                        //TODO : Envoyer sur la Home
                    }
                });
        };
        function ModalUp() {
            props.showModalUp()
        }
    return (
        <>
		 <h2>Create your hackatweet account</h2>
         <button onClick={() => ModalUp()}>X</button>
        <input placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
        <input placeholder="Firstname" value={signUpFirstname} onChange={(e) => setSignUpFirstname(e.target.value)} />
        <input placeholder="Password" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
        <button onClick={() => handleRegister()}>Sign Up</button>
		</>
    )
};

export default SignUp