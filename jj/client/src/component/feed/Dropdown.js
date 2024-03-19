import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImgRemove from '../../images/remove.png';
import ImgEdit from '../../images/confirm.png';
import ImgFollow from '../../images/user_follow.png';
import ImgUnFollow from '../../images/user_unfollow.png';
import ImgProfile from '../../images/profile.png';
import ImgMessage from '../../images/message.png';
import axios from 'axios';

function Dropdown({ pagename, style, feedid, toggleModal, writerInfo }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [img, setImg] = useState(ImgUnFollow);
    const loginUser = useSelector(state=>state.user);

    function onDelete() {
        let ans = window.confirm('정말로 삭제 하시겠습니까?');
        // console.log(props.feedid);
        if (ans) {
            axios.post('/api/feeds/deletebyid', { id: feedid })
                .then(result => {
                    navigate('/');
                    return alert('게시물 삭제가 완료되었습니다');
                })
                .catch(error => {
                    console.error(error);
                })
            navigate('/');
        } else {
            navigate('/');
        }
    }

    const toggleFollow = () => {
        axios.post('/api/members/togglefollow', { following : writerInfo.nickname, follower : loginUser.nickname })
        .then(result =>{
            
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <div>
            <div className='dropdown_wrap' style={style}>
                {
                    {
                        feed:
                            <div className='dropdown_table'>
                                <div className='dropdown_button' onClick={() => { onDelete() }}>
                                    <img src={ImgRemove} />
                                    <div className='dropdown_label'>삭제</div>
                                </div>
                                <div className='dropdown_button'>
                                    <img src={ImgEdit} onClick={() => { toggleModal() }} />
                                    <div className='dropdown_label'>수정</div>
                                </div>
                            </div>
                        ,
                        profile:
                            <div className='dropdown_table'>
                                <div className='dropdown_button follow' onClick={() => {
                                    toggleFollow();
                                }}>
                                    <img src={img} />
                                    <div className='dropdown_label'>팔로우</div>
                                </div>
                                <div className='dropdown_button profile' onClick={() => {
                                    navigate(`/member/${writerInfo.nickname}`);
                                }}>
                                    <img src={ImgProfile} />
                                    <div className='dropdown_label'>프로필</div>
                                </div>
                                <div className='dropdown_button DM' onClick={() => {

                                }}>
                                    <img src={ImgMessage} />
                                    <div className='dropdown_label'>메세지</div>
                                </div>
                            </div>
                        ,
                    }[pagename]
                }
            </div>
        </div>
    )
}

export default Dropdown
