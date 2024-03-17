import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Modal from "react-modal";
import { useSelector } from 'react-redux';

import EmojiPicker from 'emoji-picker-react';

import ImgPic from '../../images/pic.png';
import ImgEmoji from '../../images/emoji.png';
import ImgConfirm from '../../images/confirm.png';
import ImgPost from '../../images/post.png';
import ImgFilter from '../../images/filter.png';
import ImgCancel from '../../images/cancel.png';
import ImgRemove from '../../images/remove.png';

function Post(props) {
    const MAX_CONTENT_LENGTH = 200;
    const MAX_CONTENT_SIZE = 8 * 1024 * 1024;
    const loginUser = useSelector(state => state.user);
    const inputPost = useRef();
    const inputFile = useRef();
    const [content, setContent] = useState('');
    const [length, setLength] = useState(0);
    const [images, setImages] = useState([]);
    const [filters, setFilters] = useState([]);
    const [oldFilter, setOldFilter] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [emojiStyle, setEmojiStyle] = useState({ display: 'none' });
    const [onoffCheck, setOnoffCheck] = useState(false);
    const [feedid, setFeedid] = useState(null);
    const [feedimgid, setFeedimgid] = useState([]);

    const onPost = () => {
        axios.post('/api/feeds/post', { feedid, writer: loginUser.nickname, content, feedimgid, filenames: images, styles: filters })
            .then((result) => {
                if (result.data.message !== 'OK') {
                    alert('Feed 업로드에 실패했습니다. 관리자에게 문의하세요.');
                } else {
                    inputPost.current.textContent = '';
                    //document.getElementById("target").textcontent = '';
                    setContent('');
                    setImages([]);
                    setFilters([]);
                    if (props.setNewFeed) {
                        props.setNewFeed(() => result.data.feed);
                    } else {
                        if (props.feed) {
                            const tmp = [...props.feeds]
                            for (let i = 0; i < props.feeds.length; i++) {
                                if (tmp[i].id === result.data.feed.id) {
                                    tmp[i] = result.data.feed;
                                    break;
                                }
                            }
                            props.setFeeds(tmp);
                        }
                    }
                    // alert('Feed가 업로드 되었습니다.');
                    if (props.setIsOpen) {
                        props.setIsOpen(false);
                        document.body.style.overflow = "auto";
                    }

                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const onFileup = (e) => {
        if (e?.target?.files[0]?.size > MAX_CONTENT_SIZE) {
            alert(`업로드 가능한 파일 용량을 초과하였습니다\n(${MAX_CONTENT_SIZE / 1024 / 1024} MB) 이하로 업로드 해주세요`)
        } else {

            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            axios.post('/api/members/fileupload', formData)
                .then((result) => {
                    setImages([...images, result.data.filename]);
                    setFilters([...filters, null]);
                    setFeedimgid([...feedimgid, null]);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    const toggleModal = () => {
        document.body.style.overflow = isOpen ? "auto" : "hidden";
        setIsOpen(!isOpen);
    }


    const removeImage = (index) => {
        const imgs = [...images];
        const flts = [...filters];

        imgs.splice(index, 1);
        flts.splice(index, 1);

        setImages(imgs);
        setFilters(flts);
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
        if (props?.feed?.id) {
            inputPost.current.textContent = props.feed.content;
            setContent(props.feed.content);
            console.log(props.images);
            setFilters(props.images.map((image) => {
                return image.style;
            }))
            setImages(props.images.map((image) => {
                return image.filename;
            }));
            setFeedimgid(props.images.map((image) => {
                return image.id;
            }));
            setFeedid(props.feed.id);
        }
    }, []);

    useEffect(() => {
        setLength(inputPost.current.textContent.length);
    }, [content]);

    return (
        <div className="post">
            <div className="content">
                <div ref={inputPost}
                    contentEditable
                    suppressContentEditableWarning
                    placeholder="What is happening?!"
                    className="input_content"
                    onInput={(e) => {
                        inputPost.current.textContent = e.currentTarget.textContent;
                        setContent(e.currentTarget.textContent);
                        setLength(e.currentTarget.textContent.length);
                    }}></div>
            </div>
            <div className="preview">
                {
                    images.map((image, imageIndex) => {
                        return (
                            <div className="thumbnail_box" key={imageIndex} onClick={() => {
                                setSelectedIndex(imageIndex);
                                setOldFilter(filters);
                                toggleModal();
                            }}>
                                <img src={`http://localhost:8070/images/${image}`} className="thumbnail" style={{ filter: filters[imageIndex] }} />
                                <img src={ImgFilter} className="overlay" />
                            </div>
                        );
                    })
                }
                <Modal className="modal" overlayClassName="orverlay_modal" isOpen={isOpen} ariaHideApp={false} >
                    <div className="filter">
                        <img src={ImgCancel} className="icon close link" onClick={() => {
                            toggleModal();
                            setFilters(oldFilter);
                        }} />
                        <div className="img">
                            <img src={`http://localhost:8070/images/${images[selectedIndex]}`} style={{ filter: filters[selectedIndex] }} />
                        </div>
                        <div id="filter_preview">
                            <img src={`http://localhost:8070/images/${images[selectedIndex]}`} style={{ filter: "sepia(50%)" }} onClick={() => {
                                const f = [...filters];
                                f[selectedIndex] = "sepia(50%)";
                                setFilters(f);
                            }} />
                            <img src={`http://localhost:8070/images/${images[selectedIndex]}`} style={{ filter: "grayscale(50%)" }} onClick={() => {
                                const f = [...filters];
                                f[selectedIndex] = "grayscale(50%)";
                                setFilters(f);
                            }} />
                            <img src={`http://localhost:8070/images/${images[selectedIndex]}`} style={{ filter: "contrast(50%)" }} onClick={() => {
                                const f = [...filters];
                                f[selectedIndex] = "contrast(50%)";
                                setFilters(f);
                            }} />
                            <img src={`http://localhost:8070/images/${images[selectedIndex]}`} style={{ filter: "brightness(120%)" }} onClick={() => {
                                const f = [...filters];
                                f[selectedIndex] = "brightness(120%)";
                                setFilters(f);
                            }} />
                            <img src={`http://localhost:8070/images/${images[selectedIndex]}`} style={{ filter: "blur(1px)" }} onClick={() => {
                                const f = [...filters];
                                f[selectedIndex] = "blur(1px)";
                                setFilters(f);
                            }} />
                        </div>
                        <div className="btn">
                            <button className="link"><img src={ImgConfirm} className="icon" onClick={() => {
                                toggleModal();
                            }} /></button>
                            <button className="link remove" onClick={() => {
                                removeImage(selectedIndex);
                                toggleModal();
                            }}>
                                <img src={ImgRemove} className="icon" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="btn">
                <button className="link" onClick={() => {
                    // document.getElementById("upload").click();
                    inputFile.current.click();
                }}><img src={ImgPic} className="icon" /></button>

                <button className="link btn_emoji" onClick={() => {
                    onoffEmoji();
                }}><img src={ImgEmoji} className="icon" /></button>

                {
                    length > 0 ? (
                        <div className="outer" style={{ background: `conic-gradient(${length > MAX_CONTENT_LENGTH ? 'red' : '#DDDDDD'} ${length / MAX_CONTENT_LENGTH * 360}deg, white 0deg)` }}>
                            <div className="inner">{length}</div>
                        </div>
                    ) : null

                }

                <button className="link btn_post" onClick={() => {
                    onPost();
                }}><img src={ImgPost} className="icon" /></button>
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
                        inputPost.current.textContent += e.emoji;
                        setContent(content => content + e.emoji);
                    }}
                />
            </div>
            <div style={{ display: "none" }}>
                <input type="file" ref={inputFile} onChange={(e) => {
                    if (e.target.value !== '') {
                        onFileup(e);
                    }
                }} />
            </div>
        </div>
    )
}

export default Post
