import React, { useEffect, useRef, useState } from 'react'

import Footer from './footer';
import UserSummary from './usersummary';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import { useSelector } from 'react-redux';
import RecommendFeed from '../common/recommendfeed';

function Sub() {
    // const currScroll = useRef(0);
    // let currScroll = 0;
    const loginUserFollow = useSelector(state => state.follow);
    const loginUser = useSelector(state => state.user);
    const [recommendMember, setRecommendMember] = useState([]);
    const [recommendFeeds, setRecommendFeeds] = useState([]);
    const [members, setMembers] = useState([]);

    // const syncScroll = () => {
    //     if (scrollAside.current) {
    //         const bodyScroll = document.documentElement.scrollTop;
    //         // const sub = document.getElementById("aside");

    //         scrollAside.current.scrollTop += bodyScroll - currScroll.current;
    //         currScroll.current = bodyScroll;
    //     }
    //     // console.log("window.scrollY : ", window.scrollY);
    // }

    const getAllMembersNickname = () => {
        jwtAxios.post('/api/members/getallmembersnickname')
            .then(result => {
                setMembers(result.data.members);
            })
            .catch(err => {
                console.error(err);
            })
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
                setRecommendFeeds(result.data.recommendfeeds);
                console.log(result.data.recommendfeeds, '추천 피드');
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getRecommendPeopleBynickname();
        getRecommendFeedsBynickname();
        getAllMembersNickname();
    }, [loginUserFollow]);
    // main의 height가 짧아 스크롤이 없을때(main의 height가 sub의 height보다 작을때) sub가 스크롤 되지 않는데 이때는 root의 height를 조정하여 강제로 스크롤 생성
    // const root = document.getElementById("root");
    // root.style.height = '2000px';

    // window.addEventListener('scroll', syncScroll);
    // // scrollAside.current.addEventListener('scroll', syncScroll);

    // return () => {
    //     window.removeEventListener('scroll', syncScroll);
    //     // scrollAside.current.addEventListener('scroll', syncScroll);
    // }




    // useEffect(() => {
    //     getRecommendPeopleBynickname();
    // },[loginUserFollow])


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
                    {/* {
                        members.map((member, memberIndex) => {
                            return (
                                member.nickname !== loginUser.nickname
                                    ? <UserSummary member={member} key={memberIndex} />
                                    : null
                            );
                        })
                    } */}
                </div>
            </div>
            <div className="wrap_recommend_people">
                <div className="title">You might like</div>
                <div className="recommend_people">
                    {/* 태그 연관성에 따른 유저 표시 */}

                    {/* {
                        members.map((member, memberIndex) => {
                            return (
                                member.nickname !== loginUser.nickname
                                    ? <UserSummary member={member} key={memberIndex} />
                                    : null
                            );
                        })
                    } */}

                </div>
            </div>
            <div className="wrap_recommend_feed">
                <div className="recommend_feed">
                    <div className="title">Trends for you</div>
                    <div className="sub_content feeds">
                        {/* 태그 연관성에 따른 피드 표시 */}
                        
                        {
                            recommendFeeds.map((feed, feedIndex) => {
                                return (
                                    <RecommendFeed feed={feed} key={feedIndex} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                recommendMember.length !== 0
                    ? (<div className="wrap_recommend_follow">
                        <div className="title">Who to follow</div>
                        <div className="recommend_follow">
                            {/* 나를/내가 팔로우하는 사람들이/사람들을 팔로우하는 유저 표시 */}

                            {
                                recommendMember.map((member, memberIndex) => {
                                    return (
                                        loginUserFollow.followings.some((following) => following === member)
                                            ? null
                                            : <UserSummary member={member} key={memberIndex} />
                                    );
                                })
                            }

                        </div>
                    </div>)
                    : null
            }
            <footer><Footer /></footer>
        </div>
    )
}

export default Sub
