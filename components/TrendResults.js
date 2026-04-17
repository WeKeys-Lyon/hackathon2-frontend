import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { addTweet, eraseAll } from '../reducers/tweets';
import Tweets from './Tweets';
var moment = require('moment');

function TrendResults(props) {
    const user = useSelector((state) => state.user.value);
    const [emptyTweet, setEmptyTweet] = useState(false);
        useEffect(() => {
        if (props.tweets.length > 0) {
            setEmptyTweet(false)
        }
    },[props.tweets])
    const empty = <div>Circulez ! Y'a rien à voir ici !</div>


    const toDraw = props.tweets.slice().sort((a,b) => moment(a.date).format("x") < moment(b.date).format("x")).map((tweet, i) => {
        if  (tweet.username._id == user.id || tweet.username == user.id) {
            return <Tweets key={i} {...tweet} isMine="true"/>
        } else {
        return <Tweets key={i} {...tweet}/>
        }
    })
    return (<>
        {(props.tweets.length == 0) ? empty : toDraw}
    </>)

};

export default TrendResults;