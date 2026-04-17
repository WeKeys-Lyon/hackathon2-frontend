import {useRouter} from 'next/router';
import styles from '../styles/Tweets.module.css'

function Tweets(props) {
    const router = useRouter();
    
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

   
    return (<>
    <section className={styles.section}>
        <div className={styles.tweetContainer}>
            <div className={styles.tweetHeader}>
                <div className={styles.avatar}>{props.username.avatar}</div>
                <div className={styles.firstname}>{props.username.firstname}</div>
                <div className={styles.username}>@{props.username.username}</div>
                <div className={styles.date}>{props.date}</div>
            </div>
        </div>
    </section>
    <section>
        <div className={styles.tweetContent}>{formatContent(props.content)}</div>
    </section>
    <section>
        <div className={styles.tweetLike}></div>
        <div className={styles.tweetDump}></div>
    </section>
    </>)

};

export default Tweets;