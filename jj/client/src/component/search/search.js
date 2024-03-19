import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Header from '../common/header';
import Sub from '../common/sub';
import User from './user';
import Feed from '../feed/feed';

function Search() {
    const [users, setUsers] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const scrollAside = useRef();
    const inputSearch = useRef();
    const [keyword, setKeyword] = useState('');
    const [keywordBoxStyle, setKeywordBoxStyle] = useState({ height: '0', padding: '0' });
    const keywordBox = useRef();

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
        getFeeds();
    }, []);

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className="wrap_search">

                    <div className="wrap_search_keyword"  >
                        <div ref={inputSearch}
                            contentEditable
                            suppressContentEditableWarning
                            placeholder="Search here"
                            className="input_search"
                            onFocus={() => {
                                setKeywordBoxStyle({ height: '380px'});
                            }}
                            onBlur={() => {
                                setKeywordBoxStyle({ height: '0', padding: '0' });
                            }}
                            onInput={(e) => {
                                inputSearch.current.textContent = e.currentTarget.textContent;
                                setKeyword(e.currentTarget.textContent);
                            }}>
                        </div>
                        <div className="wrap_recommend_keyword" style={keywordBoxStyle}>
                        <div className="box">
                            <div className="recommend_keyword" >
                                <div className="keyword">키워드 #1</div>
                                <div className="keyword">키워드 #2</div>
                                <div className="keyword">키워드 #3</div>
                                <div className="keyword">키워드 #4</div>
                                <div className="keyword">키워드 #5</div>
                                <div className="keyword">키워드 #6</div>
                                <div className="keyword">키워드 #7</div>
                                <div className="keyword">키워드 #8</div>
                                <div className="keyword">키워드 #9</div>
                                <div className="keyword">키워드 #10</div>
                            </div>
                        </div>
                        </div>
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
                            <User />
                            <User />
                            <User />
                            <User />
                            <User />
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
            </main>
            <aside id="aside" ref={scrollAside}><Sub scrollAside={scrollAside} /></aside>
        </div>
    )
}

export default Search
