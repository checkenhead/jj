import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';

import Dropdown from './dropdown';

import Feedimg from './feedimg';
import ImgUser from '../../images/user.png';
import ImgUnlike from '../../images/unlike.png';
import ImgLike from '../../images/like.png';
import ImgReply from '../../images/reply.png';
import ImgBookmark from '../../images/bookmark.png';
import ImgRemove from '../../images/remove.png';
import ImgMore from '../../images/more.png';
import ImgCancel from '../../images/cancel.png';

function Feed(props) {
    const [images, setImages] = useState([]);
    const [profileimg, setProfileimg] = useState(null);
    const inputReply = useRef();
    const [replyContent, setReplyContent] = useState('');
    const loginUser = useSelector(state => state.user);
    const getImages = (feedid) => {
        if (props.feed.id) {
            axios.post('/api/feeds/getfeedimgbyfeedid', null, { params: { feedid } })
                .then(result => {
                    setImages(result.data.images);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    useEffect(() => {
        // if (loginUser.email !== '') {
        //     navigate('/main');
        // } else {
        getImages(props.feed.id);
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function displayChange(morebtn) {
        const drop = document.getElementsByClassName('dropdown_wrap')
        drop[0].setAttribute(
            "style",
            "display: flex !important; width: 200px; height: 200px");
        morebtn[0].addEventListener('click', () => {
            drop[0].setAttribute("style", "display: none !important")
        })
    }

    const changeDisplay = () => {
        const morebtn = document.getElementsByClassName('morebtn')
        morebtn[0].addEventListener('click', displayChange(morebtn))
    }
    return (
        <div className="feed">
            <div className="feed_head">
                <div className="profileimg">
                    <img src={ImgUser} />
                </div>
                <div className="nickname">nickname</div>
                <div className="timestamp">2시간 전</div>
                {
                    props.feed.writer === loginUser.nickname
                        ? (
                            <>
                                <div className='morebtn'>
                                    <div className='dropdown_wrap'>
                                        <Dropdown pagename={'a'} />
                                    </div>
                                    <img src={ImgMore} onClick={changeDisplay} />
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
                {props.feed.content}<br />
                <div className="btn"><input type="checkbox" className="toggle_content" /></div>
            </div>

            <div className="feed_icon">
                <div className="like"><img src={ImgUnlike} className="icon" />123</div>
                <div className="reply"><img src={ImgReply} className="icon" />4567</div>
                <div className="bookmark"><img src={ImgBookmark} className="icon" />789</div>
            </div>
            <div className="feed_reply">
                <div className="reply">
                    <div className="row_reply"><img src={ImgUser} className="writer_img" /></div>
                    <div className="row_reply content">reply contentreply</div>
                    <div className="row_reply timestamp">1시간 전</div>
                    <div className="row_reply remove"><img src={ImgRemove} className="icon" /></div>
                </div>
                <div className="reply">
                    <div className="row_reply"><img src={ImgUser} className="writer_img" /></div>
                    <div className="row_reply content">reply contentreply contentreply contentreply contentreply content</div>
                    <div className="row_reply timestamp">1시간 전</div>
                    <div className="row_reply remove"><img src={ImgRemove} className="icon" /></div>
                </div>
                <div className="reply">
                    <div className="row_reply"><img src={ImgUser} className="writer_img" /></div>
                    <div className="row_reply content">reply contentreply contentreply contentreply contentreply contentreply contentreply contentreply contentreply contentreply contentreply contentreply contentreply content</div>
                    <div className="row_reply timestamp">1시간 전</div>
                    <div className="row_reply remove"><img src={ImgRemove} className="icon" /></div>
                </div>
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
                <button>확인</button>
            </div>
        </div>
    )
}

export default Feed
