import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import jwtAxios from '../../util/jwtUtil';

import Feedimg from '../feed/feedimg';
import ImgUnlike from '../../images/unlike.png';
import ImgLike from '../../images/like.png';
import ImgReply from '../../images/reply.png';
import ImgBookmark from '../../images/bookmark.png';
import ImgBookmarked from '../../images/bookmarked.png';
import { getUserimgSrc } from '../../util/ImgSrcUtil';

function Feed({ feed }) {
    const [images, setImages] = useState([]);
    const [writerInfo, setWriterInfo] = useState({});
    const [likes, setLikes] = useState([]);
    const [stateLike, setStateLike] = useState(false);
    const [replys, setReplys] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [iconBookmark, setIconBookmark] = useState(ImgBookmark);
    const [likeCount, setLikeCount] = useState(0);
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [stateBookmark, setStateBookmark] = useState(false);
    const loginUser = useSelector(state => state.user);
    const navigate = useNavigate();

    const getWriterInfo = (nickname) => {
        jwtAxios.post('/api/members/getmemberbynickname', null, { params: { nickname } })
            .then(result => {
                setWriterInfo(result.data.user);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getLikes = (feedid) => {
        jwtAxios.post('/api/feeds/getlikesbyfeedid', { feedid })
            .then(result => {
                setStateLike(false);
                setLikes(result.data.likes.map((like) => {
                    if (like.nickname === loginUser.nickname) {
                        setStateLike(true);
                    }
                    return like.nickname;
                }));
                setLikeCount(result.data.likes.length);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const toggleLikes = (feedid, nickname) => {

        jwtAxios.post('/api/feeds/togglelike', { feedid, nickname })
            .then(result => {
                getLikes(feedid);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getImages = (feedid) => {
        jwtAxios.post('/api/feeds/getfeedimgbyfeedid', null, { params: { feedid } })
            .then(result => {
                setImages(result.data.images);
            })
            .catch(err => {
                console.error(err);
            });

    }

    const getReplys = (feedid) => {
        jwtAxios.post('/api/feeds/getreplysbyfeedid', { feedid })
            .then(result => {
                setReplys(reply => result.data.replys);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const transDateString = (dateString) => {
        const today = new Date();
        const createdat = new Date(dateString);

        // console.log('저장된 시간:', createdat, '현재시간:', today);

        let diff = Math.abs(today.getTime() - createdat.getTime());
        diff = Math.ceil(diff / (1000));
        // console.log(diff);
        let result = '';
        if (diff < 60) {
            result = '방금 전'
        } else if (diff < 60 * 60) {
            result = Math.ceil(diff / 60) + '분 전';
        } else if (diff < 60 * 60 * 24) {
            result = Math.ceil(diff / 60 / 60) + '시간 전';
        } else if (diff < 60 * 60 * 24 * 365) {
            result = Math.ceil(diff / 60 / 60 / 24) + '일 전';
        }

        return result;
    }

    const transKBM = (countKBM) => {
        const length = countKBM;
        let result = '';

        if (length < 1000) {
            result = length;
        } else if (length < 1000000) {
            result = (Math.floor((length / 1000) * 10) / 10) + 'K';
        } else if (length < 1000000000) {
            result = (Math.floor((length / 1000000) * 10) / 10) + 'M';
        } else if (length > 999999999) {
            result = (Math.floor((length / 1000000000) * 10) / 10) + 'B';
        }

        return result;
    }

    const getBookmarks = (feedid) => {
        jwtAxios.post('/api/feeds/getbookmarksbyfeedid', { feedid })
            .then(result => {
                setIconBookmark(ImgBookmark);
                setStateBookmark(false);
                setBookmarks(result.data.bookmarks.map((bookmark) => {
                    if (bookmark.nickname === loginUser.nickname) {
                        setIconBookmark(ImgBookmarked);
                        setStateBookmark(true);
                    }
                    return bookmark.nickname;
                }));
                setBookmarkCount(result.data.bookmarks.length);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const toggleBookmarks = (feedid, nickname) => {
        jwtAxios.post('/api/feeds/togglebookmark', { feedid, nickname })
            .then(result => {
                getBookmarks(feedid);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        getWriterInfo(feed.writer);
        getLikes(feed.id);
        getImages(feed.id);
        getReplys(feed.id);
        getBookmarks(feed.id);
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="feed">
            <div className="feed_head">
                <div className='headlink_wrap' >
                    <div className="profileimg link" onClick={() => {
                        navigate(`/member/${feed.writer}`)
                    }}>
                        <img src={getUserimgSrc(writerInfo)} />
                    </div>
                    <div className="nickname link" onClick={() => {
                        navigate(`/member/${feed.writer}`)
                    }}>{writerInfo.nickname}
                    </div>
                </div>
                <div className="timestamp">
                    {transDateString(feed.updatedat)}
                    {
                        feed.createdat === feed.updatedat
                            ? null
                            : "(수정됨)"
                    }
                </div>
            </div>
            <div onClick={() => {
                navigate(`/view/${feed.writer}/${feed.id}`);
            }}>
                <Slider {...settings}>
                    {
                        images.map((image, imageIndex) => {
                            return (
                                <Feedimg key={imageIndex} img_filename={image.filename} img_style={image.style} />
                            );
                        })
                    }
                </Slider>
            </div>
            <div className="feed_content">
                {feed.content}
            </div>

            <div className="feed_icon">
                <div className="like"><img src={stateLike ? ImgLike : ImgUnlike} className="icon" onClick={() => {
                    if (stateLike) {
                        setLikeCount(likeCount - 1);
                    } else {
                        setLikeCount(likeCount + 1);
                    }
                    setStateLike(!stateLike);
                    toggleLikes(feed.id, loginUser.nickname);
                }} />
                    {transKBM(likeCount)}
                </div>
                <div className="reply"><img src={ImgReply} className="icon" />{transKBM(replys.length)}</div>
                <div className="bookmark"><img src={stateBookmark ? ImgBookmarked : ImgBookmark} className="icon" onClick={() => {
                    if (stateBookmark) {
                        setBookmarkCount(bookmarkCount - 1);
                    } else {
                        setBookmarkCount(bookmarkCount + 1);
                    }
                    setStateBookmark(!stateBookmark)
                    toggleBookmarks(feed.id, loginUser.nickname);
                }} />{transKBM(bookmarkCount)}</div>
            </div>
        </div>
    )
}

export default Feed
