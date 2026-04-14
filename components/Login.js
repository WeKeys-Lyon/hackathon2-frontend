import { useState } from 'react';
import { Image } from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import styles from '../styles/Login.module.css';
import { Modal } from 'antd';

function Login() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpFirstname, setSignUpFirstname] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

	const handleRegister = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signUpUsername, password: signUpPassword, firstname: signUpFirstname}),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signUpUsername, token: data.token }));
					setSignUpUsername('');
					setSignUpPassword('');
                    setSignUpFirstname('');
					setIsModalVisible(false)
				}
			});
	};

	const handleConnection = () => {

		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
					setIsModalVisible(false)
				}
			});
	};

	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	return (
    <div >
      <section>
        <Image src="/assets/logo.png" />
      </section>
      <section>
        <Image src="/assets/twitter-icon.png"/>
        <section>
          <h1 className={styles.title}>See what's Happening!</h1>
          <h2 className={styles.title}>Join Hackatweet today</h2>
          <button onClick={showModal}>Sign Up</button>
          <h3>Already have an account?</h3>
          <button onClick={showModal}>Sign In</button>
        </section>
      </section>

      
      <Modal open={isModalVisible} onCancel={showModal}>
        <h2>Create your hackatweet account</h2>
        <input placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
        <input placeholder="Firstname" value={signUpFirstname} onChange={(e) => setSignUpFirstname(e.target.value)} />
        <input placeholder="Password" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
        <button onClick={handleRegister}>Sign Up</button>

        <h2>Connect to hackatweet</h2>
        <input placeholder="Username" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
        <button onClick={handleConnection}>Sign In</button>
      </Modal>

    </div>
  );
}

export default Login;