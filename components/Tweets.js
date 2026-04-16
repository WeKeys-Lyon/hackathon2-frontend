import styles from '../styles/Menu.module.css';

function Tweets(props) {

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
        <div className={styles.tweetDump}></div>
    </section>
    </>)

};

export default Tweets;