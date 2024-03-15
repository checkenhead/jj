import React, { useState, useEffect, useRef } from 'react';
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
import ImgRemove from '../../images/remove.png';
import ImgMore from '../../images/more.png';
import ImgCancel from '../../images/cancel.png';

function Feed(props) {
    const [feed, setFeed] = useState(props.feed);
    const [images, setImages] = useState([]);
    const [profileimg, setProfileimg] = useState(null);
    const inputReply = useRef();
    const [replyContent, setReplyContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const loginUser = useSelector(state => state.user);
    const getImages = (feedid) => {
        if (feed.id) {
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
        getImages(feed.id);
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
                <div className="profileimg">
                    <img src={ImgUser} />
                </div>
                <div className="nickname">nickname</div>
                <div className="timestamp">2시간 전</div>
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
