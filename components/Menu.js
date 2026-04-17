import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

function Menu() {
    const user = useSelector((state) => state.user.value);

    const srcAvatar = '/avatars/goodenough.png';
    const accountName = '@' + user.username;
    return (<>
        <Link href="/home" className={styles.logo}>Logo</Link>
        <div>
            <div>
                <Image 
                src={srcAvatar}
                alt="Avatar Picture"
                width={100}
                height={100}
                />
                <div>
                    <div>{user.firstname}</div>
                    <div>{accountName}</div>
                </div>
            </div>
        </div>
    </>)

};

export default Menu;