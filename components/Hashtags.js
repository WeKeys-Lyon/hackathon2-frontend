import { useRouter } from 'next/router'
import {useEffect, useState} from 'react';
import styles from '../styles/Trends.module.css';
import Menu from './Menu';
import SearchTrend from './SearchTrend';
import TrendResults from './TrendResults.js';
import Trends from './Trends';
import { useDispatch, useSelector } from 'react-redux';
import { addTweet, eraseAll } from '../reducers/tweets';
export default function Hashtags() {

    const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (user.token && user.username && user.avatar) ? '': router.push("/")
  }, [] )

  const [slug, setSlug] = useState(PathParamComponent().props.children[1]);
  const tweets = useSelector((state) => state.tweets.value);

  function PathParamComponent() {
  const path = window.location.pathname
  const segments = path.split("/")
  const id = segments[2] // assuming /profile/123
  return <h2>Profile ID: {id}</h2>
}
  
    useEffect(() => {
        dispatch(eraseAll())
        doSearchTrend(slug);
    }, [slug])

    function doSearchTrend(string) {
        
        const myUrl = `http://localhost:3000/trends/getid/${string}`
        console.log(myUrl)
        fetch(encodeURI(myUrl)).then(response => response.json()).then(data => {
            console.log(data)
             if (!data.trend) {
                return
            } else {
             getABatchOfTweets(data.trend.id,0,15)
            }
        }
        )}
    const changeSlug = (slug) => {
        setSlug(slug)
    } 

        const dispatch = useDispatch();

    async function getABatchOfTweets(trendId, start,end) {
       const myURL = `http://localhost:3000/trends/${trendId}/${start}/${end}`
       const response = await fetch(encodeURI(myURL));
       const data = await response.json();

       data.tweets.forEach((tweet) => {
            dispatch(addTweet(tweet))
       }) 
       return
    }

  return (
    <>
      <div className={styles.maincontainer}>
      <section className={styles.left}>
        <Menu username={user.username} avatar={user.avatar} firstname={user.firstname} />
      </section>
      <section className={styles.center}>
        <p className={styles.title} >Hashtag</p>
        <section >
          <SearchTrend hashtagName={slug} changeSlug={changeSlug} className={styles.search}/>
        </section>
        <section>
          <TrendResults tweets={tweets}/>
        </section>
      </section>
      <section className={styles.right}>
        <p className={styles.title} >Trends</p>
        <Trends changeSlug={changeSlug} className={styles.trendsright}/>
      </section>
    </div>
    </>
  )
}