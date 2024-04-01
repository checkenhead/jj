import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import { useNavigate } from "react-router-dom";

import Header from '../common/header';
import Main from '../common/main';
import Aside from '../common/aside';
import Sub from '../common/sub';
import User from './user';
import Feed from '../feed/feed';
import { useSelector } from 'react-redux';


function Search() {
    const navigate = useNavigate();
    const [recommendMember, setRecommendMember] = useState([]);
    const [recommendFeeds, setRecommendFeeds] = useState([]);
    const scrollAside = useRef();
    const inputSearch = useRef();
    const [keyword, setKeyword] = useState('');
    const [recentKeywords, setRecentKeywords] = useState([]);
    const [toggleKeywords, setToggleKeywords] = useState(false);
    const loginUser = useSelector(state => state.user);
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

    const onSearch = (word) => {
        if (word === '') {
            alert('검색어를 입력해주세요');
        } else if (regExp.test(word)){ 
            alert(' 특수문자는 입력할 수 없습니다');
        } else {
            jwtAxios.post('/api/search/stats', null, { params: { keyword: word } })
                .then(result => {
                    let encodedURL = encodeURIComponent(word);
                    // console.log(encodedURL);
                    navigate(`/result/feed/${encodedURL}`);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    const getRecentKeyword = () => {
        jwtAxios.get('/api/search/getrecentkeyword')
            .then(result => {
                setRecentKeywords(result.data.recent);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getRecommendPeopleBynickname = () => {
        jwtAxios.post('/api/members/getrecommendpeoplebynickname', null, { params: { nickname: loginUser.nickname } })
            .then(result => {
                setRecommendMember(result.data.recommendmembers);
                // console.log(result.data.recommendmembers, '추천 유저');
            })
            .catch(err => {
                console.error(err);
            })
    }
    const getRecommendFeedsBynickname = () => {
        jwtAxios.post('/api/feeds/getrecommendfeedsbynickname', null, { params: { nickname: loginUser.nickname } })
            .then(result => {
                setRecommendFeeds([...recommendFeeds, ...result.data.recommendfeeds]);
                // console.log(result.data.recommendfeeds, '추천 피드');
            })
            .catch(err => {
                console.error(err);
            })
    }


    useEffect(() => {
        getRecentKeyword();
        getRecommendPeopleBynickname();
        getRecommendFeedsBynickname();
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
                            {
                                recommendMember.map((member, memberIndex) => {
                                    return (
                                        <User nickname={member} key={memberIndex}/>
                                    );
                                })
                            }

                        </div>
                    </div>
                    <div className="wrap_recommend_people">
                        <div className="title">Trends for you</div>
                        <div className="recommend_feed">
                            {/* 태그 연관성에 따른 피드 표시 */}

                            {
                                recommendFeeds.map((feed) => {
                                    return (
                                        <Feed feed={feed} key={feed.updatedat} feeds={recommendFeeds} setFeeds={setRecommendFeeds} />
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
