import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { addTweet, eraseAll } from '../reducers/tweets';
import Tweets from './Tweets';

function WriteTweet() {
    const [tweetContent, setTweetContent] = useState('');
    const [tweetCounter, setTweetCounter] = useState(0);
    const [colorCounter, setColorCounter] = useState('');

    const user = useSelector((state) => state.user.value);

    const dispatch = useDispatch();

    useEffect(() => {
        setTweetCounter(tweetContent.length)
        if (tweetCounter > 260 && tweetCounter < 279) {
            setColorCounter('orange')
        } else if (tweetCounter >= 279) {
            setColorCounter('red')
        } else {
            setColorCounter('black')
        }
    },[tweetContent]);

    function writeATweet(string) {
        if (string.length <= 280) {
            setTweetContent(string);
        } 
    };

    function handleSumbit() {
        fetch('http://localhost:3000/tweets/publishtweet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, content: tweetContent}),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(addTweet({ _id: data.tweet._id, username: data.tweet.username, content: data.tweet.content, date: data.tweet.date}));
                    setTweetContent('');
                    setTweetCounter(0);
                }
            });
    };

    return (
                  <div className={styles.tweetcontainer}>
            <div className={styles.tweetbox}><input type='text' value={tweetContent} placeholder={`What\'s up ?`} onChange={(e) => writeATweet(e.target.value)} /></div>
            <div className={styles.tweetfooter}>
                <div className={styles.charcounter} style={{color: colorCounter}}>{tweetCounter}/280</div>
                <div className={styles.btntweet}><button onClick={() => handleSumbit() }>Tweet</button></div>
          </div>
          </div>
    )
}

export default WriteTweet;