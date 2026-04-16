import { useEffect, useState } from 'react';
import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";
import { addTweet } from '../reducers/tweets';


function Tweets(props) {
    console.log(props)
    return (<>
    <section>
        <div className={styles.tweetContainer}>
            <div className={styles.tweetHeader}>
                <div className={styles.tweetAvatar}>{props.username.avatar}</div>
                <div className={styles.tweetFirstname}>{props.username.firstname}</div>
                <div className={styles.tweetUsername}>{props.username.username}</div>
                <div>Utiliser Moment</div>
            </div>
        </div>
    </section>
    <section>
        <div className={styles.tweetContent}>{props.content}</div>
    </section>
    <section>
        <div className={styles.tweetLike}></div>
        <div className={styles.tweetDump}></div>
    </section>
    </>)

};

export default Tweets;