import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import Modal from "react-modal";
import Dropdown from './Dropdown';
//import Editpost from './Editpost';
import Post from './post';
import EmojiPicker from 'emoji-picker-react';
import ImgEmoji from '../../images/emoji.png';

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
    const MAX_CONTENT_LENGTH = 200;
    const dropdownDisplay1 = useRef(false);
    const dropdownDisplay2 = useRef(false);
    const setReplyStyle = useRef(false);
    const elementReply = useRef();
    const heightReply = useRef();
    const [feed, setFeed] = useState(props.feed);
    const [images, setImages] = useState([]);
    const [writerInfo, setWriterInfo] = useState({});
    const [profileimg, setProfileimg] = useState(null);
    const [likes, setLikes] = useState([]);
    // const [iconLike, setIconLike] = useState(ImgUnlike);
    const [stateLike, setStateLike] = useState(false);
    const [replys, setReplys] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [iconBookmark, setIconBookmark] = useState(ImgBookmark);
    const inputReply = useRef();
    const [replyContent, setReplyContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [style1, setStyle1] = useState({ opacity: '0', left: '-2px', height: '0px' });
    const [style2, setStyle2] = useState({ opacity: '0', right: '-2px', height: '0px' });
    const [style3, setStyle3] = useState({ display: 'none' });
    const [length, setLength] = useState(0);
    const [emojiStyle, setEmojiStyle] = useState({ display: 'none' });
    const [onoffCheck, setOnoffCheck] = useState(false);
    const loginUser = useSelector(state => state.user);
    const navigate = useNavigate();

    const getWriterInfo = (nickname) => {
        jwtAxios.post('/api/members/getmemberbynickname', null, { params: { nickname } })
            .then(result => {
                setWriterInfo(result.data.user);
                setProfileimg(`http://localhost:8070/images/${result.data.user.profileimg}`);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getLikes = (feedid) => {
        jwtAxios.post('/api/feeds/getlikesbyfeedid', { feedid })
            .then(result => {
                // setIconLike(ImgUnlike);
                setStateLike(false);
                setLikes(result.data.likes.map((like) => {
                    if (like.nickname === loginUser.nickname) {
                        // setIconLike(ImgLike);
                        setStateLike(true);
                    }
                    return like.nickname;
                }));
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

    const addReply = (feedid, writer, content) => {
        if (replyContent === '') {
            alert('댓글 내용을 입력해주세요');
        } else if (replyContent.length > MAX_CONTENT_LENGTH) {
            alert('입력 가능한 최대 글자수는 200자 입니다');
        } else {
            jwtAxios.post('/api/feeds/addreply', { feedid, writer, content })
                .then(result => {
                    getReplys(feedid);
                    inputReply.current.textContent = '';
                    setReplyContent('');
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    const deleteReply = (id, feedid) => {
        if (window.confirm('삭제하시겠습니까?')) {
            jwtAxios.post('/api/feeds/deletereply', null, { params: { id } })
                .then(result => {
                    alert('삭제 완료');
                    getReplys(feedid);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    const getBookmarks = (feedid) => {
        jwtAxios.post('/api/feeds/getbookmarksbyfeedid', { feedid })
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
        heightReply.current = elementReply.current.clientHeight;
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // const [dropdownDisplay1, setDropdownDisplay1] = useState(false);
    // const [dropdownDisplay2, setDropdownDisplay2] = useState(false);


    const toggleModal = () => {
        document.body.style.overflow = isOpen ? "auto" : "hidden";
        setIsOpen(!isOpen);
    }

    // const setChangeDrop = () => {
    //     setDropdownDisplay2(!dropdownDisplay2)
    //     if (!dropdownDisplay2) {
    //         setMoreDropdown();
    //     }
    //     setDropdownDisplay1(!dropdownDisplay1)
    //     if(!dropdownDisplay1){
    //         setProfileDropdown();
    //     } 

    // }
    const setProfileDropdown = () => {
        dropdownDisplay1.current = !dropdownDisplay1.current;
        // console.log(dropdownDisplay1.current, 1);
        if (dropdownDisplay1.current === false) {
            setStyle1({
                opacity: '0',
                left: '-2px',
                height: '0px'
            })
        } else {
            setStyle1({
                opacity: '1',
                left: '-2px',
                height: 'auto'
            })
        }
        // console.log(style1);
    }
    const setMoreDropdown = () => {
        dropdownDisplay2.current = !dropdownDisplay2.current;
        // console.log(dropdownDisplay2.current, 1);
        if (dropdownDisplay2.current === false) {
            setStyle2({
                opacity: '0',
                right: '-2px',
                height: '0px'
            })
        } else {
            setStyle2({
                opacity: '1',
                right: '-2px',
                height: 'auto'
            })
        }
        // console.log(style1);
    }

    const toggleReply = () => {
        setReplyStyle.current = !setReplyStyle.current;

        if (setReplyStyle.current === false) {
            setStyle3({
                opacity: '0',
                height: '0px',
                visibility: 'hidden',
                overflow: 'hidden'
            })
            window.document.documentElement.scrollTop -= elementReply.current.clientHeight;
        } else {
            setStyle3({
                opacity: '1',
                height: 'auto',
                visibility: 'visible',
            })

        }
    }

    const onoffEmoji = () => {
        setOnoffCheck(!onoffCheck)
        if (onoffCheck == true) {
            setEmojiStyle({ display: 'none' });
        } else {
            setEmojiStyle({ display: 'block' });
        }
    }

    useEffect(() => {

        window.document.documentElement.scrollTop += elementReply.current.clientHeight;

    }, [style3])

    useEffect(() => {
        setLength(inputReply.current.textContent.length);
    }, [replyContent]);

    return (
        <div className="feed" ref={props.scrollRef}>
            <div className="feed_head">
                <div className='headlink_wrap' >
                    <div className="profileimg link" onClick={() => {
                        if (feed.writer !== loginUser.nickname) {
                            setProfileDropdown();
                        } else {
                            navigate(`/member/${feed.writer}`)
                        }
                    }}>
                        <img src={profileimg || ImgUser} />
                    </div>
                    <div className="nickname link" onClick={() => {
                        if (feed.writer !== loginUser.nickname) {
                            setProfileDropdown();
                        } else {
                            navigate(`/member/${feed.writer}`)
                        }
                    }}>{writerInfo.nickname}</div>
                    <Dropdown pagename={'profile'} feedid={feed.id} toggleModal={toggleModal} style={style1} writer={feed.writer} />
                </div>
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
                                    <Dropdown pagename={'feed'} feedid={feed.id} toggleModal={toggleModal} style={style2} />
                                    <img src={ImgMore} className='icon' onClick={() => {
                                        setMoreDropdown()
                                        // setChangeDrop();
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
                <div className="like"><img src={stateLike ? ImgLike : ImgUnlike} className="icon" onClick={() => {
                    setStateLike(!stateLike);
                    toggleLikes(feed.id, loginUser.nickname);
                }} />{likes.length}</div>
                <div className="reply" onClick={() => { toggleReply() }}><img src={ImgReply} className="icon" />{replys.length}</div>
                <div className="bookmark"><img src={iconBookmark} className="icon" onClick={() => {
                    toggleBookmarks(feed.id, loginUser.nickname);
                }} />{bookmarks.length}</div>
            </div>
            <div className="feed_reply" style={style3} ref={elementReply}>
                {
                    replys.map((reply) => {
                        return (
                            <div className="reply" key={reply.id}>
                                <div className="row_reply profile" onClick={() => {
                                    navigate(`/member/${reply.writer}`);
                                }}>
                                    <img src={`http://localhost:8070/images/${reply.profileimg}`} className="writer_img" />{reply.writer}
                                </div>
                                <div className="row_reply content">{reply.content}</div>
                                <div className="row_reply timestamp">{transDateString(reply.createdat)}</div>
                                {
                                    reply.writer === loginUser.nickname
                                        ? <div className="row_reply remove" onClick={() => {
                                            deleteReply(reply.id, reply.feedid);
                                        }}><img src={ImgRemove} className="icon" /></div>
                                        : null
                                }
                            </div>
                        );
                    })
                }

                <div className="input_box">
                    <div ref={inputReply}
                        contentEditable
                        suppressContentEditableWarning
                        placeholder="Reply here"
                        className="input_reply"

                        onInput={(e) => {
                            inputReply.current.textContent = e.currentTarget.textContent;
                            setReplyContent(e.currentTarget.textContent);
                            setLength(e.currentTarget.textContent.length);
                        }}>
                    </div>
                    <button onClick={() => {
                        addReply(feed.id, loginUser.nickname, replyContent);
                    }}>확인</button>
                </div>
                <div className='activeBtn' tabIndex='0' >
                    <button className="btn_emoji" onClick={() => {
                        onoffEmoji();
                    }}><img src={ImgEmoji} className="icon" /></button>
                    {
                        length > 0 ? (
                            <div className="outer" style={{ background: `conic-gradient(${length > MAX_CONTENT_LENGTH ? 'red' : '#DDDDDD'} ${length / MAX_CONTENT_LENGTH * 360}deg, white 0deg)` }}>
                                <div className="inner">{length}</div>
                            </div>
                        ) : null

                    }
                </div>
                <div className='emoji' style={emojiStyle}>
                    <EmojiPicker
                        height={'350px'}
                        width={'100%'}
                        emojiStyle={'native'}
                        emojiVersion={'5.0'}
                        searchDisabled={true}
                        previewConfig={{ showPreview: false }}
                        searchPlaceholder='Search Emoji'
                        autoFocusSearch={false}
                        onEmojiClick={(e) => {
                            inputReply.current.textContent += e.emoji;
                            setReplyContent(content => content + e.emoji);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Feed
