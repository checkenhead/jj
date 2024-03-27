import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Feed from '../feed/feed';
import User from './user';

import Header from '../common/header';
import Main from '../common/main';
import Aside from '../common/aside';
import Sub from '../common/sub';
import { useSelector } from 'react-redux';


function Result() {
    const navigate = useNavigate();
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(0);
    const [newFeed, setNewFeed] = useState({});
    const [users, setUsers] = useState([]);
    const scrollAside = useRef();
    const inputSearch = useRef();
    const loginUserFollow = useSelector(state => state.follow);
    const { target, keyword } = useParams();
    const [currentTarget, setCurrentTarget] = useState(target);

    const [inputKeyword, setInputKeyword] = useState('');
    const [recentKeywords, setRecentKeywords] = useState([]);
    const [toggleKeywords, setToggleKeywords] = useState(false);

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
                    setUsers(result.data.users.map(user => { return user.nickname }));
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    const onSearch = (word) => {
        if (word === '') {
            alert('검색어를 입력해주세요')
        } else {
            axios.post('/api/search/stats', null, { params: { keyword: word } })
                .then(result => {
                    navigate(`/result/${target}/${word}`);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    const getRecentKeyword = () => {
        axios.get('/api/search/getrecentkeyword')
            .then(result => {
                setRecentKeywords(result.data.recent);
            })
            .catch(err => {
                console.error(err);
            });
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
        getRecentKeyword();
    }, [currentTarget, keyword]);

    return (

        <div className="wrap_main">

            <header><Header setNewFeed={setNewFeed} /></header>
            <Main component={
                <>
                    <div className="search_container">
                        <div className="wrap_search_keyword" >
                            <div>
                                <div className="wrap_input">
                                    <div ref={inputSearch}
                                        contentEditable
                                        suppressContentEditableWarning
                                        placeholder="Search here"
                                        className="input_search"
                                        onFocus={() => {
                                            setToggleKeywords(true);
                                        }}
                                        onBlur={() => {
                                            setToggleKeywords(false);
                                        }}
                                        onInput={(e) => {
                                            inputSearch.current.textContent = e.currentTarget.textContent;
                                            setInputKeyword(e.currentTarget.textContent);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.nativeEvent.key === "Enter") {
                                                setToggleKeywords(false);
                                                onSearch(inputKeyword);
                                            }
                                        }}>

                                    </div>
                                    <button onClick={() => {
                                        setToggleKeywords(false);
                                        onSearch(inputKeyword);
                                    }}>Search</button>
                                </div>
                            </div>
                            {
                                toggleKeywords ? (
                                    <div className="recommend_keyword" >
                                        {
                                            recentKeywords.map((recentKeyword, recentKeywordIndex) => {
                                                return (
                                                    <div key={recentKeywordIndex} className="keyword" onMouseEnter={() => {
                                                        inputSearch.current.textContent = recentKeyword;
                                                        setInputKeyword(recentKeyword);
                                                    }}
                                                        onMouseLeave={() => {
                                                            inputSearch.current.textContent = '';
                                                            setInputKeyword('');
                                                        }}>{recentKeyword}</div>
                                                );
                                            })
                                        }
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>

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
                                    ) : <div className="empty_feed_message">
                                            <div className="empty_feed_message_text">
                                                "{keyword}"으로 검색한 Feed가 없습니다
                                            </div>
                                            <div className='empty_feed_message_list'>
                                                <label>원하는 검색결과가 나오지 않았다면?</label>
                                                <p> - 검색어가 정확한지 확인하세요</p>
                                                <p> - 다른 검색어를 사용해 보세요</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            ) : (
                                <div className="wrap_recommend_people">
                                    <div className="result_people">

                                        {
                                            users.map((user, userIndex) => {
                                                return (
                                                    <User nickname={user} key={userIndex} />
                                                );
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </>
            } />

            <Aside component={<Sub />} />

        </div>


    )
}

export default Result
