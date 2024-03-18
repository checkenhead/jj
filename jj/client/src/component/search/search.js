import React, { useState, useRef } from 'react'

import Header from '../common/header';
import Sub from '../common/sub';

function Search() {
    const inputSearch = useRef();
    const [keyword, setKeyword] = useState('');

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className="wrap_search">
                    <div ref={inputSearch}
                        contentEditable
                        suppressContentEditableWarning
                        placeholder="Search here"
                        className="input_search"
                        onInput={(e) => {
                            inputSearch.current.textContent = e.currentTarget.textContent;
                            setKeyword(e.currentTarget.textContent);
                        }}>
                    </div>
                    <div className="recommend_people">
                        {/* 태그 연관성에 따른 유저 표시 */}
                        <div className="title">You might like</div>
                        <div className="sub_content user">Sub Content #1</div>
                    </div>
                    <div className="recommend_feed">
                        {/* 태그 연관성에 따른 피드 표시 */}
                        <div className="title">Trends for you</div>
                        <div className="sub_content feeds">Sub Content #1</div>
                    </div>
                </div>
            </main>
            <aside id="aside"><Sub /></aside>
        </div>
    )
}

export default Search
