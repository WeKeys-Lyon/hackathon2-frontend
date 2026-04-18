import styles from '../styles/Menu.module.css';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';


function Menu(props) {

    const user = useSelector((state) => state.user.value);
    const avatars = ['bardello','elon','goodenough','misterx','poppins','rupaul','sarko','trumpet']
    const srcAvatar = `/avatars/${avatars[user.avatar]}.png`;

    return (<><Link className={styles.link} href="/home">
            <div className={styles.leftcontainer}>
            
            <Image className={styles.logo}
                src="/logo.png"
                height={30}
                width={30}
                alt="Logo d'un oiseau Tweeter retourné et mort"
            ></Image> 
            
        </div></Link>
        <div className={styles.bottomcontainer}>
                <Image 
                src={srcAvatar}
                alt="Avatar Picture"
                width={60}
                height={60}
                className={styles.avatar}
                />
            <div className={styles.bottomnames}>
                <div className={styles.firstname}>{props.firstname}</div>
                <div className={styles.username}>@{props.username}</div>
            </div>
        </div>
    </>)

};

export default Menu;