import React, { useEffect, useRef } from 'react'

import Footer from './footer';
import UserSummary from './usersummary';

function Sub({ scrollAside }) {
    const currScroll = useRef(0);
    // let currScroll = 0;

    const syncScroll = () => {
        const bodyScroll = document.documentElement.scrollTop;
        // const sub = document.getElementById("aside");

        scrollAside.current.scrollTop += bodyScroll - currScroll.current;
        currScroll.current = bodyScroll;
    }

    useEffect(() => {
        window.addEventListener('scroll', syncScroll);
        // scrollAside.current.addEventListener('scroll', syncScroll);

        return () => {
            window.removeEventListener('scroll', syncScroll);
            // scrollAside.current.addEventListener('scroll', syncScroll);
        }
    }, []);

    return (
        <div className="wrap_sub" id="wrap_sub">
            <div className="search">
                <input type="text" list="recent_list" placeholder="Search here" />
                {/* <button>Search</button> */}
                <datalist id="recent_list">
                    <option value="가나다라" />
                    <option value="마바사" />
                    <option value="아자차카" />
                    <option value="타파하" />
                    <option value="abcd" />
                </datalist>
            </div>
            <div className="wrap_relevant_people">
                <div className="title">Relevant people</div>
                <div className="relevant_people">
                    {/* 현재 게시물과 관련된 유저 표시 */}

                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    <UserSummary />

                </div>
            </div>
            <div className="wrap_recommend_people">
                <div className="title">You might like</div>
                <div className="recommend_people">
                    {/* 태그 연관성에 따른 유저 표시 */}

                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    
                </div>
            </div>
            <div className="wrap_recommend_feed">
                <div className="recommend_feed">
                    {/* 태그 연관성에 따른 피드 표시 */}
                    <div className="title">Trends for you</div>
                    <div className="sub_content feeds">Sub Content #1</div>
                </div>
            </div>
            <div className="wrap_recommend_follow">
            <div className="title">Who to follow</div>
                <div className="recommend_follow">
                    {/* 나를/내가 팔로우하는 사람들이/사람들을 팔로우하는 유저 표시 */}
                    
                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    <UserSummary />
                    
                </div>
            </div>
            <footer><Footer /></footer>
        </div>
    )
}

export default Sub
