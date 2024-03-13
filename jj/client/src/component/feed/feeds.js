import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './post';
import Feed from './feed';

function Feeds() {
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(0);

    const getFeeds = () => {
        axios.post('/api/feeds/getallfeeds', null, {params: {page}})
        .then(result => {
            setFeeds([...feeds, ...result.data.feeds]);
        })
        .catch(err => {
            console.error(err);
        });
    }

    useEffect(() => {
        getFeeds();
    }, [page]);


    return (
        <>
            <Post />
            <div id="main_tab">
                <button className="link">For you</button>
                <button className="link">Following</button>
            </div>
            <div className="wrap_feeds">
                {   feeds.length ? (
                    feeds.map((feed, feedIndex) => {return (
                        <Feed feed={feed} key={feedIndex}/>
                    );})
                    ) : <div className="empty_feed_message">Feed가 없습니다.</div> 
                }
            </div>
        </>
    )
}

export default Feeds
