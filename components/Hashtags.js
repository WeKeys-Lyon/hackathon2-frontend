import { useRouter } from 'next/router'
import {useEffect, useState} from 'react';
import Menu from './Menu';
import SearchTrend from './SearchTrend';
import TrendResults from './TrendResults.js';
import Trends from './Trends';
import {styles} from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTweet, eraseAll } from '../reducers/tweets';
export default function Hashtags() {
  const router = useRouter()
  const [trendId, setTrendId] = useState('');
  const [slug, setSlug] = useState(router.query.slug)
//<p>Post: {router.query.slug}</p>
    console.log('hey oh '+router.query.slug)
    useEffect(() => {
        dispatch(eraseAll())
        doSearchTrend(slug);
    }, [])
    function doSearchTrend(string) {
        
        const myUrl = `http://localhost:3000/trends/getid/${string}`
        console.log(myUrl)
        fetch(encodeURI(myUrl)).then(response => response.json()).then(data => {
            console.log(data)
             if (!data.trend) {
                return
            } else {
             setTrendId(data.trend.id);
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
      {}
      <section>PANNEAU DE GAUCHE<Menu /></section>
      <section>PANNEAU CENTRAL
        <section>
          <SearchTrend hashtagName={slug} changeSlug={changeSlug}/>
        </section>
        <section>LISTE DES TWEETS<TrendResults hashtagId={trendId}/></section>
      </section>
      <section>PANNEAU DE DROITE<Trends /></section>
    </>
  )
}