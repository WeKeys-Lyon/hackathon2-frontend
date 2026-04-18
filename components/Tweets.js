import {useRouter} from 'next/router';
import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTweet } from '../reducers/tweets';
import {delLike, addLike} from '../reducers/user';
import styles from '../styles/Tweets.module.css';
import Image from 'next/image';

function Tweets(props) {

    const router = useRouter();
    const dispatch = useDispatch();
    const srcAvatar = '/avatars/elon.png';
    const [counter, setCounter] = useState(props.likes)


    const formatContent = (text) => {
    return text.split(/(#\w+)/g).map((word, index) => {
    if (word.startsWith('#') && word.length > 1) {
    const cleanWord = word.replace('#', '');
    return (
    <span key={index} className={styles.hashtag} onClick={() => router.push(`/hashtags/${cleanWord}`)} style={{ cursor: 'pointer', color: '#0a87ee' }}>
    {word}
    </span>
    );
    }
    return word;
    });
    };

    const handleDelete = async () => {
        const myUrl = `http://localhost:3000/tweets/${props.user.token}/${props._id}`
        return await fetch(encodeURI(myUrl), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then(data => {
            
            if (data.result) {
                dispatch(deleteTweet(props))
            }
        });
    };
    const handleLike = async () => {
        const myUrl = `http://localhost:3000/users/likes/${props.user.token}/${props._id}`

        return await fetch('http://localhost:3000/tweets/ilikeit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tweetId: props._id, token: props.user.token}),
        }).then(response => response.json()).then(async data => {
            

            if (data.result && data.erased) {
                dispatch(delLike(props._id))
                setCounter(counter - 1)
            } else if (data.result && data.added) {
                dispatch(addLike(props._id))
                setCounter(counter + 1)
            }
        })
        }

    const trashbin = <FontAwesomeIcon onClick={() => handleDelete()} style={{cursor: 'pointer'}} icon={faTrash} className={styles.tweetDump} />;
    const heartRed = <><FontAwesomeIcon onClick={() => handleLike()} style={{cursor: 'pointer', color: 'red'}} icon={faHeart} className={styles.tweetLike} />
    <div className={styles.countLikes}>{counter}</div></>;
    const heart = <><FontAwesomeIcon onClick={() => handleLike()} style={{cursor: 'pointer'}} icon={faHeart} className={styles.tweetLike} />
    <div className={styles.countLikes}>{counter}</div></>;


    const formatDate = (date) => {
    const now = new Date();
    const tweetDate = new Date(date);
    const diff = Math.floor((now - tweetDate) / 1000); // en secondes

    const hours = Math.floor(diff / 3600);

    if (hours < 1) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} min ago`;
    }

    if (hours < 24) {
        return `${hours} h ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days} d ago`;
};

   
    return (<>
    <div className={styles.globaldiv}>
    <section className={styles.section}>
        <div className={styles.tweetContainer}>
            <div className={styles.tweetHeader}>
                <div className={styles.avatar}>
                    <Image 
                        src={srcAvatar}
                        alt="Avatar Picture"
                        width={30}
                        height={30}
                        className={styles.avatar}
                    />
                </div>
                <div className={styles.firstname}>{props.username.firstname}</div>
                <div className={styles.username}>@{props.username.username}</div>
                <div className={styles.date}>- {formatDate(props.date)}</div>
            </div>
        </div>
    </section>
    <section>
        <div>
            <div className={styles.tweetContent}>{formatContent(props.content)}</div>
        </div>
        <section className={styles.tweetactions}>
            {(props.liked) ? heartRed : heart}
            {(props.isMine) ? trashbin : ''}
        </section>
    </section>
    </div>
    </>)

};

export default Tweets;