import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './post';
import Feed from './feed';

function Feeds() {
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(0);
    const [newFeed, setNewFeed] = useState({});

    const getFeeds = () => {
        axios.post('/api/feeds/getallfeeds', null, { params: { page } })
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

    useEffect(() => {
        if (newFeed?.id) {
            setFeeds((feeds) => [newFeed, ...feeds]);
            setNewFeed({});
            console.log(feeds);
        }
    }, [newFeed]);

    return (
        <>
            <Post setNewFeed={setNewFeed} />
            <div className="tab">
                <div className="tab_col">
                    <button className="link">For you</button>
                </div>
                <div className="tab_col">
                    <button className="link">Following</button>
                </div>
            </div>
            <div className="wrap_feeds">
                {feeds.length ? (
                    feeds.map((feed) => {
                        return (
                            <Feed feed={feed} key={feed.id} />
                        );
                    })
                ) : <div className="empty_feed_message">Feed가 없습니다.</div>
                }
            </div>
        </>
    )
}

export default Feeds
