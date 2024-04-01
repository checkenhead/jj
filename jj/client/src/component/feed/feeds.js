import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import Post from './post';
import Feed from './feed';

import { throttle } from 'lodash';

function Feeds({ newFeed, setNewFeed }) {
    const loginUser = useSelector(state => state.user);
    const [feeds, setFeeds] = useState([]);
    // const [feeds, setFeeds] = useState({});
    const styleSelected = { borderBottom: '2px solid #aaaaaa' };
    const [SelectedTab, setSelectedTab] = useState([true, false]);
    const currPage = useRef(0);
    const dummyRef = useRef();
    const [lastFeedRef, inView] = useInView({
        triggerOnce: true
    });

    const getFeeds = throttle(async (requireRefressh) => {

        try {
            if (requireRefressh) { currPage.current = 0; }
            const result = await jwtAxios.post('/api/feeds/getallfeeds', null, { params: { page: currPage.current++ } });
            setFeeds(feeds => requireRefressh ? [...result.data.feeds] : [...feeds, ...result.data.feeds]);
            // setFeeds();
            // console.log(result.data.feeds);
        } catch (err) {
            console.error(err);
        }

    }, 1000);



    const getFollowingFeeds = async (requireRefressh) => {
        try {
            if (requireRefressh) { currPage.current = 0; }
            const result = await jwtAxios.post('/api/feeds/getfollowingfeeds', null, { params: { page: currPage.current++, nickname: loginUser.nickname } });
            setFeeds(feeds => requireRefressh ? [...result.data.feeds] : [...feeds, ...result.data.feeds]);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (currPage.current > 0) {
            console.log('SelectedTab  called');
            if (SelectedTab[0]) {
                getFeeds(true);
            } else {
                getFollowingFeeds(true);
            }
        }
    }, [SelectedTab]);

    useEffect(() => {
        if (SelectedTab[0]) {
            getFeeds(false);
        } else {
            getFollowingFeeds(false);
        }
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
                <div className="tab_col" >
                    <button className="link" style={SelectedTab[0] ? styleSelected : null} onClick={() => {
                        setSelectedTab([true, false]);
                    }}>For you</button>
                </div>
                <div className="tab_col">
                    <button className="link" style={SelectedTab[1] ? styleSelected : null} onClick={() => {
                        setSelectedTab([false, true]);
                    }}>Following</button>
                </div>
            </div>
            <div className="wrap_feeds">
                {
                    feeds.length ? (
                        feeds.map((feed, feedIndex) => {
                            return (
                                <Feed scrollRef={feeds.length - 1 === feedIndex ? lastFeedRef : dummyRef} feed={feed} key={feed.updatedat} feeds={feeds} setFeeds={setFeeds} />
                            );
                        })
                    ) : <div className="empty_feed_message">Feed가 없습니다.</div>
                }
            </div>
        </>
    )
}

export default Feeds
