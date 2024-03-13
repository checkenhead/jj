import React, { useState } from 'react'
import axios from 'axios';
import Modal from "react-modal";
import { useSelector } from 'react-redux';

import EmojiPicker from 'emoji-picker-react';

import ImgPic from '../../images/pic.png';
import ImgConfirm from '../../images/confirm.png';
import ImgPost from '../../images/post.png';
import ImgFilter from '../../images/filter.png';
import ImgCancel from '../../images/cancel.png';
import ImgRemove from '../../images/remove.png';

function Post() {
    const loginUser = useSelector(state => state.user);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [filters, setFilters] = useState([]);
    const [oldFilter, setOldFilter] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [emojiStyle, setEmojiStyle] = useState({ display: 'none' });
    const [onoffCheck, setOnoffCheck] = useState(Boolean);



    const onPost = () => {
        axios.post('/api/feeds/post', { writer: loginUser.nickname, content, filenames: images, styles: filters })
            .then((result) => {
                if (result.data.message !== 'OK') {
                    alert('Feed 업로드에 실패했습니다. 관리자에게 문의하세요.');
                } else {
                    setContent('');
                    setImages([]);
                    setFilters([]);
                    alert('Feed가 업로드 되었습니다.');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const onFileup = (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        axios.post('/api/members/fileupload', formData)
            .then((result) => {
                setImages([...images, result.data.filename]);
                setFilters([...filters, null]);
            })
            .catch((err) => {
                console.error(err);
            });
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
        if(onoffCheck == true){
        setEmojiStyle({ display: 'none' });
    }else {
            setEmojiStyle({ display: 'block' });
        }
    }

    return (
        <div className="post">
            <div className="content">
                <div className='emoji' style={emojiStyle}>
                    <EmojiPicker
                        height={'350px'}
                        width={'100%'}
                        autoFocusSearch={false}
                        onEmojiClick={(e) => {
                            console.log(e)
                            setContent(content + e.emoji)
                        }}
                    />
                </div>
                <div contentEditable
                suppressContentEditableWarning 
                placeholder="What is happening?!"
                className="input_content"
                textContent={content} onInput={(e) => {
                    setContent(e.currentTarget.textContent);
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
                    document.getElementById("upload").click();
                }}><img src={ImgPic} className="icon" /></button>

                <button className="link btn_emoji" onClick={() => {
                    onoffEmoji();
                }}></button>

                <button className="link btn_post" onClick={() => {
                    onPost();
                }}>
                    <img src={ImgPost} className="icon" />
                </button>
            </div>
            <div style={{ display: "none" }}>
                <input type="file" id="upload" onChange={(e) => {
                    onFileup(e);
                }} />
            </div>
        </div>
    )
}

export default Post
