import React, { useEffect, useState } from 'react'

import Footer from './footer';
import UserSummary from './usersummary';
import jwtAxios from '../../util/jwtUtil';
import { useSelector } from 'react-redux';
import RecommendFeed from '../common/recommendfeed';
import { useLocation } from 'react-router-dom';
import { getCookie } from '../../util/cookieUtil';

function Sub() {
    const location = useLocation();
    const loginUserFollow = useSelector(state => state.follow);
    const loginUser = useSelector(state => state.user);
    const [page, setPage] = useState(!!location.pathname.match("view"))
    const [recommendMember, setRecommendMember] = useState([]);
    const [recommendByFeedid, setRecommendByFeedid] = useState([]);
    const [recommendFeeds, setRecommendFeeds] = useState([]);
    const [members, setMembers] = useState([]);
    const [feeds, setFeeds] = useState([]);

    const getRecommendPeopleByFeedid = (feedid) => {
        if (!page) {
            return;
        } else {
            console.log(2, getCookie('user'));
            jwtAxios.post('/api/members/getrecommendpeoplebyfeedid', null, { params: { nickname: loginUser.nickname, feedid } })
                .then(result => {
                    // console.log(3, result.data.recommendmemberbyfeedid);
                    setRecommendByFeedid(result.data.recommendmemberbyfeedid);
                    // console.log(result.data.recommendmembers, '추천 유저');
                })
                .catch(err => {
                    console.log(4, getCookie('user'));
                    console.error(err);
                })
        }
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
                if (result.data.recommendfeeds.length !== 0) {
                    console.log(result.data.recommendfeeds);
                    setRecommendFeeds(result.data.recommendfeeds);
                } else {
                    getRandomfeed()
                }
                // console.log(result.data.recommendfeeds, '추천 피드');
            })
            .catch(err => {
                console.error(err);
            })
    }
    const getRandompeople = () => {
        jwtAxios.post('/api/members/getrandompeople', null, { params: { nickname: loginUser.nickname } })
            .then(result => {
                // console.log(1, result.data.members);
                setMembers(result.data.members);
            })
            .catch(err => {
                console.error(err);
            })
    }
    const getRandomfeed = () => {
        jwtAxios.post('/api/feeds/getrandomfeed', null, { params: { nickname: loginUser.nickname } })
            .then(result => {
                // console.log(result.data);
                setFeeds(result.data.feeds);
            })
            .catch(err => {
                console.error(err);
            })
    }
    useEffect(() => {
        getRecommendPeopleBynickname();
        getRecommendFeedsBynickname();
        getRecommendPeopleByFeedid(location.pathname.split("/").at(-1));
        getRandompeople();
    }, [loginUserFollow]);
    return (
        <div className="wrap_sub" id="wrap_sub">
            {/* 서치바 삭제 */}
            {
                !!window.location.pathname.match("view")
                    ? (
                        <div className="wrap_relevant_people">
                            <div className="title">Relevant people</div>
                            <div className="relevant_people">
                                {/* 현재 게시물에 좋아요 한 나 외에 다른 유저 추천 */}
                                {
                                    recommendByFeedid.map((member, memberIndex) => {
                                        return (
                                            loginUserFollow.followings.some((following) => following === member)
                                                ? null
                                                : <UserSummary member={member.nickname} key={`${member.nickname}_${memberIndex}`} />
                                        );
                                    })
                                }
                            </div>
                        </div>)
                    : null
            }
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
            {
                recommendFeeds.length !== 0
                    ? (<div className="wrap_recommend_feed">
                        <div className="recommend_feed">
                            <div className="title">Trends for you</div>
                            <div className="sub_content feeds">
                                {/* 태그 연관성에 따른 피드 표시 */}

                                {
                                    recommendFeeds.map((feed) => {
                                        return (
                                            <RecommendFeed feed={feed} key={feed.updatedat} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>)
                    : (<div className="wrap_recommend_feed">
                        <div className="recommend_feed">
                            <div className="title">Trends for you</div>
                            <div className="sub_content feeds">
                                {/* 랜덤 피드 */}

                                {
                                    feeds?.map((feed) => {
                                        return (
                                            <RecommendFeed feed={feed} key={feed.updatedat} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>)
            }
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
                                            : <UserSummary member={member} key={`${member.nickname}_${memberIndex}`} />
                                    );
                                })
                            }

                        </div>
                    </div>)
                    : (<div className="wrap_recommend_follow">
                        <div className="title">Members</div>
                        <div className="recommend_follow">
                            {/* 랜덤 맴버 */}

                            {
                                members.map((member, memberIndex) => {
                                    return (
                                        member.nickname !== loginUser.nickname
                                            ? <UserSummary member={member.nickname} key={`${member.nickname}_${memberIndex}`} />
                                            : null
                                    );
                                })
                            }

                        </div>
                    </div>)
            }
            <footer><Footer /></footer>
        </div>
    )
}

export default Sub
