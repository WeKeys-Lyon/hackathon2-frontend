import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import * as React from 'react';

function Trends() {
    let [trends, setTrends] = useState([]);

    useEffect(()=> {
    fetch('http://localhost:3000/trends/besttrends')
    .then(response => response.json())
    .then(data => data.trends.forEach((trend) => setTrends(trends => [...trends, trend])))
    },[])

    const toDraw = trends.map((trend, i) => {
        if (trend.count < 2) {
            return (<React.Fragment key={i}><div onClick={() => router.push(`/hashtags/${trend.hashtags}`)} style={{ cursor: 'pointer'}}>{trend.hashtags}</div><div>{trend.count} Tweet</div></React.Fragment>)
        } else {
            return (<React.Fragment key={i}><div onClick={() => router.push(`/hashtags/${trend.hashtags}`)} style={{ cursor: 'pointer'}}>{trend.hashtags}</div><div>{trend.count} Tweets</div></React.Fragment>)
        }
        
    })
    return (<>
        {toDraw}
    </>)

};

export default Trends;