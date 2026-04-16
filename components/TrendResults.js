import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { addTweet, eraseAll } from '../reducers/tweets';
import Tweets from './Tweets';
var moment = require('moment');

function TrendResults(props) {
    const tweets = useSelector((state) => state.tweets.value);


    const toDraw = tweets.slice().sort((a,b) => moment(a.date).format("x") < moment(b.date).format("x")).map((tweet, i) => {
        return <Tweets key={i} {...tweet}/>
    })
    return (<>
        {toDraw}
    </>)

};

export default TrendResults;