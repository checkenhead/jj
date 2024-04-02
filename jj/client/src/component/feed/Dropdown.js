import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageAction } from '../../store/notifySlice';
import ImgRemove from '../../images/remove.png';
import ImgEdit from '../../images/confirm.png';
import ImgFollow from '../../images/follow.png';
import ImgUnFollow from '../../images/unfollow.png';
import ImgProfile from '../../images/profile.png';
import ImgMessage from '../../images/message.png';
import { setFollowAction } from '../../store/followSlice';
import jwtAxios from '../../util/jwtUtil';

function Dropdown({ pagename, style, feedid, toggleModal, writer }) {
    const navigate = useNavigate();
    const [followState, setFollowState] = useState(false);
    const loginUser = useSelector(state => state.user);
    // 팔로우 정보 가져오기
    const loginUserFollow = useSelector(state => state.follow);
    const dispatch = useDispatch();

    function onDelete() {
        let ans = window.confirm('정말로 삭제 하시겠습니까?');
        // console.log(props.feedid);
        if (ans) {
            jwtAxios.post('/api/feeds/deletebyid', { id: feedid })
                .then(result => {
                    navigate('/');
                    dispatch(setMessageAction({ message: '게시물 삭제가 완료되었습니다' }));
                    return;
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
        jwtAxios.post('/api/members/getfollow', null, { params: { nickname: loginUser.nickname } })
            .then(result => {
                dispatch(setFollowAction({ followings: result.data.followings, followers: result.data.followers }))
            })
            .catch(err => {
                console.error(err);
            });
    }

    const toggleFollow = () => {
        jwtAxios.post('/api/members/togglefollow', { following: writer, follower: loginUser.nickname })
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
        // console.log('123123', loginUserFollow, '11', writer);
    }, [loginUserFollow])

    return (
        <div>
            <div className='dropdown_wrap' style={style}>
                {
                    {
                        feed:
                            <div className='dropdown_table'>
                                <div className='dropdown_button_wrap' onClick={() => { onDelete() }}>
                                    <div className='dropdown_button'>
                                        <img src={ImgRemove} />
                                    </div>
                                    <div className='dropdown_label'>삭제</div>
                                </div>
                                <div className='dropdown_button_wrap' onClick={() => { toggleModal() }} >
                                    <div className='dropdown_button'>
                                        <img src={ImgEdit} />
                                    </div>
                                    <div className='dropdown_label'>수정</div>
                                </div>
                            </div>
                        ,
                        profile:
                            <div className='dropdown_table'>
                                <div className='dropdown_button_wrap' onClick={() => {
                                    toggleFollow();
                                }}>
                                    <div className='dropdown_button follow' >
                                        <img src={followState ? ImgUnFollow : ImgFollow} />
                                    </div>
                                    <div className='dropdown_label'>{followState ? '언팔로우' : '팔로우'}</div>
                                </div>
                                <div className='dropdown_button_wrap' onClick={() => {
                                    navigate(`/member/${writer}`);
                                }}>
                                    <div className='dropdown_button profile'>
                                        <img src={ImgProfile} />
                                    </div>
                                    <div className='dropdown_label'>프로필</div>
                                </div>
                                <div className='dropdown_button_wrap' onClick={() => {
                                    navigate('/message', { state: { writer } });
                                }}>
                                    <div className='dropdown_button DM'>
                                        <img src={ImgMessage} />
                                    </div>
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
