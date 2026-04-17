import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { addTweet, eraseAll } from '../reducers/tweets';

import Tweets from './Tweets';
var moment = require('moment');

function LastTweet() {
    const tweets = useSelector((state) => state.tweets.value);
    const user = useSelector((state) => state.user.value);
    const [emptyTweet, setEmptyTweet] = useState(false);
    const dispatch = useDispatch();

    async function getABatchOfTweets(start,end) {
       const myURL = `http://localhost:3000/tweets/batchtweets/${start}/${end}`
       const response = await fetch(encodeURI(myURL));
       const data = await response.json();
       if (data.tweets.length == 0 ) {
        return setEmptyTweet(true)
       }
       data.tweets.forEach((tweet) => {
            dispatch(addTweet(tweet))
       }) 
       return
    }

    useEffect(() => {
        dispatch(eraseAll())
        getABatchOfTweets(0,15);
    },[]);

    useEffect(() => {
        if (tweets.length > 0) {
            setEmptyTweet(false)
        }
    },[tweets])
    
    const empty = <div>Circulez ! Y'a rien à voir ici !</div>
    const toDraw = tweets.slice().sort((a,b) => moment(a.date).format("x") < moment(b.date).format("x")).map((tweet, i) => {
        if ((user.likes !== null && user.likes !== undefined && user.likes.find(tweetid => tweetid == tweet._id)) && (tweet.username._id == user.id || tweet.username == user.id)) {
            return <Tweets key={i} {...tweet} isMine={true} user={user} liked={true}/>
        } else if (tweet.username._id == user.id || tweet.username == user.id) {
            return <Tweets key={i} {...tweet} isMine={true} user={user}/>
        } else if (user.likes !== null && user.likes !== undefined && user.likes.find(tweetid => tweetid == tweet._id)){
            return <Tweets key={i} {...tweet} isMine={false} user={user} liked={true}/>
        } else {
            return <Tweets key={i} {...tweet} isMine={false} user={user}/>
        }
        })

        
   return (<>
        {(tweets.length == 0) ? empty : toDraw}
    </>)

};

export default LastTweet;