import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImgRemove from '../../images/remove.png';
import ImgEdit from '../../images/confirm.png';
import ImgFollow from '../../images/user_follow.png';
import ImgUnFollow from '../../images/user_unfollow.png';
import ImgProfile from '../../images/profile.png';
import ImgMessage from '../../images/message.png';
import { setFollowAction } from '../../store/followSlice';
import axios from 'axios';

function Dropdown({ pagename, style, feedid, toggleModal, writer }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [followState, setFollowState] = useState(false);
    const loginUser = useSelector(state => state.user);
    // 팔로우 정보 가져오기
    const loginUserFollow = useSelector(state => state.follow);
    const dispatch = useDispatch();

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

    const getFollow = () => {
        axios.post('/api/members/getfollow', null, { params: { nickname: loginUser.nickname } })
            .then(result => {
                dispatch(setFollowAction({ followings: result.data.followings, followers: result.data.followers }))
            })
            .catch(err => {
                console.error(err);
            });
    }

    const toggleFollow = () => {
        axios.post('/api/members/togglefollow', { following: writer, follower: loginUser.nickname })
            .then(result => {
                getFollow();
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        const result = loginUserFollow.followings.some((following) => {
            return following === writer
        });
        setFollowState(result);
        console.log('123123', loginUserFollow, '11',writer);
    }, [loginUserFollow])

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
                                    <img src={followState ? ImgUnFollow : ImgFollow} />
                                    <div className='dropdown_label'>{followState ? '언팔로우' : '팔로우'}</div>
                                </div>
                                <div className='dropdown_button profile' onClick={() => {
                                    navigate(`/member/${writer}`);
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
