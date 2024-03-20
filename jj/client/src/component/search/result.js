import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Feed from '../feed/feed';
import User from './user';
import Header from '../common/header';
import Sub from '../common/sub';
import { useSelector } from 'react-redux';


function Result() {
    const navigate = useNavigate();
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(0);
    const [newFeed, setNewFeed] = useState({});
    const [users, setUsers] = useState([]);
    const scrollAside = useRef();

    const { target, keyword } = useParams();
    const [currentTarget, setCurrentTarget] = useState(target);
    const loginUserFollow = useSelector(state=>state.follow);
    const getResult = () => {

        if (currentTarget === "feed") {
            axios.post('/api/feeds/getFeedByKeyword', null, { params: { keyword } })

                .then((result) => {
                    setFeeds(result.data.feeds);
                })
                .catch((error) => {
                    console.error(error);
                })
        } else if (currentTarget === "people") {
            axios.post('/api/members/getUserInfoByKeyword', null, { params: { keyword } })
                .then((result) => {
                    setUsers(result.data.users);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    const scrollHandler = () => {
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;

        if (clientHeight + scrollTop >= scrollHeight) {
            setPage(page => page + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);

    useEffect(() => {
        getResult();
    }, [currentTarget,loginUserFollow]);

    return (

        <div className="wrap_main">

            <header><Header setNewFeed={setNewFeed} /></header>
            <main>
                <div className="tab">
                    <div className="tab_col">
                        <button className="link" onClick={() => {
                            // getResult();
                            setCurrentTarget("feed");
                            navigate(`/result/feed/${keyword}`);
                        }}>Feed</button>
                    </div>
                    <div className="tab_col">
                        <button className="link" onClick={() => {
                            // getResult();
                            setCurrentTarget("people");
                            navigate(`/result/people/${keyword}`);
                        }}>People</button>
                    </div>
                </div>
                <div className="wrap_search">
                    {
                        currentTarget === "feed" ? (
                            <div className="wrap_feeds">
                                {feeds.length ? (
                                    feeds.map((feed) => {
                                        return (
                                            <Feed feed={feed} key={feed.updatedat} feeds={feeds} setFeeds={setFeeds} />
                                        );
                                    })
                                ) : <div className="empty_feed_message">Feed가 없습니다.</div>
                                }
                            </div>
                        ) : (
                            <div className="wrap_recommend_people">
                                <div className="result_people">

                                    {
                                        users.map((user, userIndex) => {
                                            return (
                                                <User user = {user} key={userIndex}/>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>
            </main>
            <aside id="aside" ref={scrollAside}><Sub scrollAside={scrollAside} /></aside>
        </div>


    )
}

export default Result
