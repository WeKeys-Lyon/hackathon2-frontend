import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import * as React from 'react';
import { useRouter } from 'next/router'

function Trends() {
    let [trends, setTrends] = useState([]);
    const router = useRouter();

    useEffect(()=> {
    fetch('http://localhost:3000/trends/besttrends')
    .then(response => response.json())
    .then(data => data.trends.forEach((trend) => setTrends(trends => [...trends, trend])))
    },[])

    const toDraw = trends.map((trend, i) => {
        const cleanHashtag = trend.hashtags.slice(1)
        if (trend.count < 2) {
            return (<React.Fragment key={i}>
                <div onClick={() => router.push(`/hashtags/${cleanHashtag}`)} style={{ cursor: 'pointer'}}>{trend.hashtags}</div>
                <div>{trend.count} Tweet</div></React.Fragment>)
        } else {
            return (<React.Fragment key={i}><div onClick={() => router.push(`/hashtags/${cleanHashtag}`)} style={{ cursor: 'pointer'}}>{trend.hashtags}</div><div>{trend.count} Tweets</div></React.Fragment>)
        }
        
    })
    return (<>
        {toDraw}
    </>)

};

export default Trends;