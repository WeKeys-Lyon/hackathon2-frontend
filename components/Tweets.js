import styles from '../styles/Menu.module.css';
import {useRouter} from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTweet } from '../reducers/tweets';

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

    return (<>
    <section>
        <div className={styles.tweetContainer}>
            <div className={styles.tweetHeader}>
                <div className={styles.tweetAvatar}>{props.username.avatar}</div>
                <div className={styles.tweetFirstname}>{props.username.firstname}</div>
                <div className={styles.tweetUsername}>{props.username.username}</div>
                <div>{props.date}</div>
            </div>
        </div>
    </section>
    <section>
        <div className={styles.tweetContent}>{formatContent(props.content)}</div>
    </section>
    <section>
        <div className={styles.tweetLike}></div>
        {(props.isMine) ? trashbin : ''}
    </section>
    </>)

};

export default Tweets;