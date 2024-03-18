import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import Header from '../common/header';
import Sub from '../common/sub';
import Feed from '../feed/feed';


function View() {
    const [feed, setFeed] = useState({});
    const param = useParams();

    const getFeed = () => {
        axios.post('/api/feeds/getfeedbyid', { id: param.feedid })
            .then(result => {
                setFeed(result.data.feed);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect (()=>{
        getFeed();
        console.log(param);
    },[]);

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main><Feed feed={feed} key={feed.updatedat}/></main>
            <aside id="aside"><Sub /></aside>
        </div>
    )
}

export default View
