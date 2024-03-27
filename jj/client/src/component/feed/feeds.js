import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import Post from './post';
import Feed from './feed';

function Feeds({ newFeed, setNewFeed }) {
    const [feeds, setFeeds] = useState([]);
    const currPage = useRef(0);
    const dummyRef = useRef();
    const [lastFeedRef, inView] = useInView({
        triggerOnce: true
    });

    const getFeeds = async () => {
        try{
            const result = await jwtAxios.post('/api/feeds/getallfeeds', null, { params: { page: currPage.current++ } });
            setFeeds(feeds => [...feeds, ...result.data.feeds]);
            console.log('feeds:', result);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getFeeds();        
    }, [inView]);

    useEffect(() => {
        if (newFeed?.id) {
            setFeeds((feeds) => [newFeed, ...feeds]);
            setNewFeed({});
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
                {
                    feeds.length ? (
                        feeds.map((feed, feedIndex) => {
                            return (
                                <Feed scrollRef={feeds.length-1 === feedIndex ? lastFeedRef : dummyRef} feed={feed} key={feed.updatedat} feeds={feeds} setFeeds={setFeeds} />
                            );
                        })
                    ) : <div className="empty_feed_message">Feed가 없습니다.</div>
                }
            </div>
        </>
    )
}

export default Feeds
