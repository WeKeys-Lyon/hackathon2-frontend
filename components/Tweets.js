import {useRouter} from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTweet } from '../reducers/tweets';
import styles from '../styles/Tweets.module.css'

function Tweets(props) {
    const router = useRouter();
/*     console.log(props) */
    /* const [isLiked, setLiked] = useState(false); */
    const dispatch = useDispatch();
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
        const myUrl = `http://localhost:3000/tweets/${props.username.token}/${props._id}`
        return await fetch(encodeURI(myUrl), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then(data => {
            
            if (data.result) {
                dispatch(deleteTweet(props))
            }
        });
    };

    const trashbin = <FontAwesomeIcon onClick={() => handleDelete()} style={{cursor: 'pointer'}} icon={faTrash} className={styles.tweetDump} />;

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
    <section className={styles.section}>
        <div className={styles.tweetContainer}>
            <div className={styles.tweetHeader}>
                <div className={styles.avatar}>{props.username.avatar}</div>
                <div className={styles.firstname}>{props.username.firstname}</div>
                <div className={styles.username}>@{props.username.username}</div>
                <div className={styles.date}>- {formatDate(props.date)}</div>
            </div>
        </div>
    </section>
    <section>
        <div className={styles.tweetContent}>{formatContent(props.content)}</div>
    </section>
    <section>
        <div className={styles.tweetLike}></div>
        {(props.isMine) ? trashbin : ''}
        <div>
            <div className={styles.tweetContent}>{formatContent(props.content)}</div>
        </div>
        <section className={styles.tweetactions}>
            <div className={styles.tweetLike}>X</div>
            <div className={styles.tweetDump}>X</div>
        </section>
    </section>
    </>)

};

export default Tweets;