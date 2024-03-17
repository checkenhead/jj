import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';
import Modal from "react-modal";
import Dropdown from './Dropdown';
//import Editpost from './Editpost';
import Post from './post';


import Feedimg from './feedimg';
import ImgUser from '../../images/user.png';
import ImgUnlike from '../../images/unlike.png';
import ImgLike from '../../images/like.png';
import ImgReply from '../../images/reply.png';
import ImgBookmark from '../../images/bookmark.png';
import ImgBookmarked from '../../images/bookmarked.png';
import ImgRemove from '../../images/remove.png';
import ImgMore from '../../images/more.png';
import ImgCancel from '../../images/cancel.png';

function Feed(props) {
    const [feed, setFeed] = useState(props.feed);
    const [images, setImages] = useState([]);
    const [writerInfo, setWriterInfo] = useState({});
    const [profileimg, setProfileimg] = useState(null);
    const [likes, setLikes] = useState([]);
    const [iconLike, setIconLike] = useState(ImgUnlike);
    const [replys, setReplys] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [iconBookmark, setIconBookmark] = useState(ImgBookmark);
    const inputReply = useRef();
    const [replyContent, setReplyContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const loginUser = useSelector(state => state.user);
    const navigate = useNavigate();

    const getWriterInfo = (nickname) => {
        axios.post('/api/members/getmemberbynickname', null, { params: { nickname } })
            .then(result => {
                setWriterInfo(result.data.user);
                setProfileimg(`http://localhost:8070/images/${result.data.user.profileimg}`);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getLikes = (feedid) => {
        axios.post('/api/feeds/getlikesbyfeedid', { feedid })
            .then(result => {
                setIconLike(ImgUnlike);
                setLikes(result.data.likes.map((like) => {
                    if (like.nickname === loginUser.nickname) {
                        setIconLike(ImgLike);
                    }
                    return like.nickname;
                }));
            })
            .catch(err => {
                console.error(err);
            });
    }

    const toggleLikes = (feedid, nickname) => {
        axios.post('/api/feeds/togglelike', { feedid, nickname })
            .then(result => {
                getLikes(feedid);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getImages = (feedid) => {
        axios.post('/api/feeds/getfeedimgbyfeedid', null, { params: { feedid } })
            .then(result => {
                setImages(result.data.images);
            })
            .catch(err => {
                console.error(err);
            });

    }

    const getReplys = (feedid) => {
        axios.post('/api/feeds/getreplysbyfeedid', { feedid })
            .then(result => {
                setReplys(reply => result.data.replys);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const addReply = (feedid, writer, content) => {
        axios.post('/api/feeds/addreply', { feedid, writer, content })
            .then(result => {
                getReplys(feedid);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getBookmarks = (feedid) => {
        axios.post('/api/feeds/getbookmarksbyfeedid', { feedid })
            .then(result => {
                setIconBookmark(ImgBookmark);
                setBookmarks(result.data.bookmarks.map((bookmark) => {
                    if (bookmark.nickname === loginUser.nickname) {
                        setIconBookmark(ImgBookmarked);
                    }
                    return bookmark.nickname;
                }));
            })
            .catch(err => {
                console.error(err);
            });
    }

    const toggleBookmarks = (feedid, nickname) => {
        axios.post('/api/feeds/togglebookmark', { feedid, nickname })
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
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [dropdownDisplay, setDropdownDisplay] = useState(false);

    const toggleModal = () => {
        document.body.style.overflow = isOpen ? "auto" : "hidden";
        setIsOpen(!isOpen);
    }




    return (
        <div className="feed">
            <div className="feed_head">
                <div className="profileimg link">
                    <img src={profileimg || ImgUser} onClick={() => {
                        navigate(`/member/${writerInfo.nickname}`);
                    }} />
                </div>
                <div className="nickname link" onClick={() => {
                    navigate(`/member/${writerInfo.nickname}`);
                }}>{writerInfo.nickname}</div>
                <div className="timestamp">
                    {feed.createdat}
                </div>
                <Modal className="modal" overlayClassName="orverlay_modal" isOpen={isOpen} ariaHideApp={false} >
                    <img src={ImgCancel} className="icon close link" onClick={() => {
                        toggleModal();
                    }} />
                    {/* <Editpost feed={feed}/> */}
                    <Post feed={feed} images={images} setIsOpen={setIsOpen} feeds={props.feeds} setFeeds={props.setFeeds} />
                </Modal>
                {
                    feed.writer === loginUser.nickname
                        ? (
                            <>
                                <div className='morebtn'>
                                    <div className='dropdown_wrap' style=
                                        {
                                            dropdownDisplay
                                                ? ({ opacity: '1', height: '200px' })
                                                : ({ opacity: '0', height: '0px' })
                                        }>
                                        <Dropdown pagename={'feed'} feedid={feed.id} toggleModal={toggleModal} />
                                    </div>
                                    <img src={ImgMore} className='icon' onClick={() => {
                                        setDropdownDisplay(!dropdownDisplay)
                                    }} />
                                </div>
                            </>
                        )

                        : null
                }
            </div>
            <Slider {...settings}>
                {
                    images.map((image, imageIndex) => {
                        return (
                            <Feedimg key={imageIndex} img_filename={image.filename} img_style={image.style} />
                        );
                    })
                }
            </Slider>
            <div className="feed_content">
                {feed.content}<br />
                <div className="btn"><input type="checkbox" className="toggle_content" /></div>
            </div>

            <div className="feed_icon">
                <div className="like"><img src={iconLike} className="icon" onClick={() => {
                    toggleLikes(feed.id, loginUser.nickname);
                }} />{likes.length}</div>
                <div className="reply"><img src={ImgReply} className="icon" />{replys.length}</div>
                <div className="bookmark"><img src={iconBookmark} className="icon" onClick={() => {
                    toggleBookmarks(feed.id, loginUser.nickname);
                }}/>{bookmarks.length}</div>
            </div>
            <div className="feed_reply">
                {
                    replys.map((reply) => {
                        return (
                            <div className="reply" key={reply.id}>
                                <div className="row_reply">
                                <img src={ImgUser} className="writer_img" />{reply.writer}
                                </div>
                                <div className="row_reply content">{reply.content}</div>
                                <div className="row_reply timestamp">{reply.createdat}</div>
                                <div className="row_reply remove"><img src={ImgRemove} className="icon" /></div>
                            </div>
                        );
                    })
                }

            </div>
            <div className="input_box">
                <div ref={inputReply}
                    contentEditable
                    suppressContentEditableWarning
                    placeholder="Reply here"
                    className="input_reply"
                    onInput={(e) => {
                        inputReply.current.textContent = e.currentTarget.textContent;
                        setReplyContent(e.currentTarget.textContent);
                    }}>
                </div>
                <button onClick={() => {
                    addReply(feed.id, loginUser.nickname, replyContent);
                    inputReply.current.textContent = '';
                    setReplyContent('');
                }}>확인</button>
            </div>
        </div>
    )
}

export default Feed
