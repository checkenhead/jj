import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Header from '../common/header';
import Main from '../common/main';
import Aside from '../common/aside';
import Sub from '../common/sub';
import User from './user';
import Feed from '../feed/feed';

function Search() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const scrollAside = useRef();
    const inputSearch = useRef();
    const [keyword, setKeyword] = useState('');
    const [recentKeywords, setRecentKeywords] = useState([]);
    const [toggleKeywords, setToggleKeywords] = useState(false);

    const onSearch = (word) => {
        if (word === '') {
            alert('검색어를 입력해주세요')
        } else {
            axios.post('/api/search/stats', null, { params: { keyword: word } })
                .then(result => {
                    navigate(`/result/feed/${word}`);
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

    const getFeeds = () => {
        axios.post('/api/feeds/getallfeeds', null, { params: { page: 0 } })
            .then(result => {
                setFeeds([...feeds, ...result.data.feeds]);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        getRecentKeyword();
        getFeeds();
    }, []);

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <Main component={
                <div className="wrap_search" >

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
                                        setKeyword(e.currentTarget.textContent);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.nativeEvent.key === "Enter") {
                                            setToggleKeywords(false);
                                            onSearch(keyword);
                                        }
                                    }}>

                                </div>
                                <button onClick={() => {
                                    setToggleKeywords(false);
                                    onSearch(keyword);
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
                                                    setKeyword(recentKeyword);
                                                }}
                                                onMouseLeave={() => {
                                                    inputSearch.current.textContent = '';
                                                    setKeyword('');
                                                }}>{recentKeyword}</div>
                                            );
                                        })
                                    }
                                </div>
                            ) : null
                        }
                    </div>

                    <div className="wrap_recommend_people">
                        <div className="title">You might like</div>
                        <div className="recommend_people">
                            {/* 태그 연관성에 따른 유저 표시 */}
                            {/* {
                        users.map((feed) => {return(
                            <User/>
                        );})
                    } */}

                        </div>
                    </div>
                    <div className="wrap_recommend_people">
                        <div className="title">Trends for you</div>
                        <div className="recommend_feed">
                            {/* 태그 연관성에 따른 피드 표시 */}

                            {
                                feeds.map((feed) => {
                                    return (
                                        <Feed feed={feed} key={feed.updatedat} feeds={feeds} setFeeds={setFeeds} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            } />


            <Aside component={<Sub />} />
        </div>
    )
}

export default Search
