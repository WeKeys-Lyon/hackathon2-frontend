import { useEffect, useState } from 'react';
import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";
import { addTweet } from '../reducers/tweets';
import Link from 'react';
function Todraw() {return (<a href='http://jeuxvideos.com' >TEST</a>)}
function Tweets(props) {
    function getTrends(string) {
        const myRegex = new RegExp(/\#[\w\d\-\@\é\à\è\ù\ç\û\&]*/,'ig');
        let myExtractedTrends = [];
        [...string.matchAll(myRegex)].forEach((trend) => myExtractedTrends.push(trend[0].toLowerCase()))
        return myExtractedTrends;
    }

    function transformTweet(arrayTrends) {
        
        let string = '';
        for(let i =0; i < arrayTrends.length; i++){
            if (i == 0) {
                string = props.content;
                string = string.replaceAll(arrayTrends[i], 'LOLOLOLO')
            } else {
                string = string.replaceAll(arrayTrends[i], 'LOLOLOLO')
            }
        }
        
        console.log(string)
        
        return string
    }
    //transformTweet(getTrends(props.content))
   
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
        <div className={styles.tweetContent}>{transformTweet(getTrends(props.content))}</div>
    </section>
    <section>
        <div className={styles.tweetLike}></div>
        <div className={styles.tweetDump}></div>
    </section>
    </>)

};

export default Tweets;