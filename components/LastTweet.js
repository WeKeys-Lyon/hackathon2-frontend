import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import { addTweet, eraseAll } from '../reducers/tweets';
import Tweets from './Tweets';
var moment = require('moment');

function LastTweet() {
    const tweets = useSelector((state) => state.tweets.value);
    const dispatch = useDispatch();

    async function getABatchOfTweets(start,end) {
       const myURL = `http://localhost:3000/tweets/batchtweets/${start}/${end}`
       const response = await fetch(encodeURI(myURL));
       const data = await response.json();

       data.tweets.forEach((tweet) => {
            dispatch(addTweet(tweet))
       }) 
       return
    }

    useEffect(() => {
        dispatch(eraseAll())
        getABatchOfTweets(0,5);
    },[]);

    const toDraw = tweets.slice().sort((a,b) => moment(a.date).format("x") < moment(b.date).format("x")).map((tweet, i) => {
        return <Tweets key={i} {...tweet}/>
    })
    return (<>
        {toDraw}
    </>)

};

export default LastTweet;