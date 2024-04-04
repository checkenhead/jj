import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setMessageAction } from '../../store/notifySlice';
import Modal from "react-modal";
import Header from '../common/header';
import Main from '../common/main';
import Group from '../message/group';
import Chats from './chats';

import EmojiPicker from 'emoji-picker-react';
import ImgEmoji from '../../images/emoji.png';
import ImgBack from '../../images/backward.png';
import ImgMore from '../../images/more.png';
import ImgCancel from '../../images/cancel.png';
import ImgCreate from '../../images/create.png';
import ImgQuit from '../../images/quit.png';
import ImgConfirm from '../../images/confirm.png'
import jwtAxios from '../../util/jwtUtil';
import FollowUser from '../search/followUser';


function Message() {
    const location = useLocation();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.user);
    const follow = useSelector(state => state.follow);
    const [content, setContent] = useState('');

    const inputEnter = useRef();
    const inputMessage = useRef();
    const contentBox = useRef();
    const scrollBox = useRef();

    // 이모지, 글자 수 인디케이터
    const [emojiStyle, setEmojiStyle] = useState({ display: 'none' });
    const [onoffCheck, setOnoffCheck] = useState(false);

    const [chatGroups, setChatGroups] = useState([]);
    const [selectedChatGroup, setSelectedChatGroup] = useState({});
    const currChatGroup = useRef({});
    const [groupMembers, setGroupMembers] = useState(null);

    const [currChats, setCurrChats] = useState([]);

    const allChats = useRef({});
    const styleHidden = { display: 'none' };
    const styleShow = { display: '' };

    const [chatGroupBoxStyle, setChatGroupBoxStyle] = useState(styleShow);
    const [chatBoxStyle, setChatBoxStyle] = useState(styleHidden);

    const [btnMenuState, setBtnMenuState] = useState(false);

    //모달
    const [isOpen, setIsOpen] = useState(false);


    const [selectedMember, setSelectedMember] = useState([]);
    const selectedStyle = { opacity: '0.3' };

    const send = () => {
        inputMessage.current.textContent = '';

        if (content !== '') {
            jwtAxios.post('/api/chat/send', { sender: loginUser.nickname, chatgroupid: currChatGroup.current.id, content })
                .then((result) => {
                    if (result.data.message === 'Error') {
                        dispatch(setMessageAction('Error'));
                    } else {
                        setContent('');
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    };

    const getNewChat = async () => {
        if (currChatGroup.current.id) {
            const oldChat = allChats.current[currChatGroup.current.id];
            const id = (oldChat && oldChat.length > 0) ? oldChat[oldChat.length - 1].id : 0;

            try {
                const result = await jwtAxios.post('/api/chat/getNewChat', { chatgroupid: currChatGroup.current.id, id: id });
                if (result.data.chats !== null && result.data.chats.length > 0) {
                    const tmp = { ...allChats.current };
                    tmp[currChatGroup.current.id] = tmp[currChatGroup.current.id] ?
                        [...tmp[currChatGroup.current.id], ...result.data.chats] : [...result.data.chats];
                    allChats.current = tmp;
                    setCurrChats(currChats => tmp[currChatGroup.current.id]);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getAllChatGroups = (nickname) => {
        jwtAxios.post('/api/chat/getallchatgroupsbynickanme', null, { params: { nickname } })
            .then(result => {
                let obj = {};
                for (let i = 0; i < result.data.groups.length; i++) {
                    let key = result.data.groups[i].id;

                    obj[key] = result.data.groups[i].members.map((member) => member.nickname);
                }

                setGroupMembers({ ...groupMembers, ...obj });
                // { console.log(obj) }
                setChatGroups(result.data.groups);
            })

            .catch(err => {
                console.error(err);
            });
    }

    const createGroup = (members) => {
        jwtAxios.post('/api/chat/creategroup', { members })
            .then(result => {
                currChatGroup.current = result.data.group;
                setSelectedChatGroup(result.data.group);
                setChatBoxStyle(styleShow);
                setChatGroupBoxStyle(styleHidden);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const inviteGroup = () => { }

    const leaveGroup = (chatgroupid, nickname) => {
        jwtAxios.post('/api/chat/leavechatgroup', null, { params: { chatgroupid, nickname } })
            .then(result => {
                getAllChatGroups(nickname);
                setChatBoxStyle(styleHidden);
                setChatGroupBoxStyle(styleShow);
                setBtnMenuState(false);
                if (onoffCheck) {
                    onoffEmoji();
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const toggleModal = () => {
        document.body.style.overflow = isOpen ? "auto" : "hidden";
        setIsOpen(!isOpen);
    }

    // 이모지 온오프
    const onoffEmoji = () => {
        setOnoffCheck(!onoffCheck)
        if (onoffCheck == true) {
            setEmojiStyle({ display: 'none' });
        } else {
            setEmojiStyle({ display: 'flex' });
        }
    }

    useEffect(() => {
        if (location.state) {
            createGroup([loginUser.nickname, location.state.writer]);
            // console.log("location.state.writer : ", location.state.writer);
            location.state = null;
        }

        getAllChatGroups(loginUser.nickname);

        getNewChat();
        setCurrChats(currChats => allChats.current[currChatGroup.current.id] || []);

        const interval = setInterval(() => {
            getNewChat();
        }, 500);

        return (() => {
            clearInterval(interval);
            setCurrChats(currChats => []);
        })
    }, []);

    useEffect(() => {
        if (Object.keys(selectedChatGroup).length) {
            scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
            // currChatGroup.current = selectedChatGroup;
            setChatBoxStyle(styleShow);
            setChatGroupBoxStyle(styleHidden);
        }
    }, [currChats]);

    useEffect(() => {
        if (Object.keys(selectedChatGroup).length) {
            currChatGroup.current = selectedChatGroup;
            setChatBoxStyle(styleShow);
            setChatGroupBoxStyle(styleHidden);
        } else {
            currChatGroup.current = {};
            setChatBoxStyle(styleHidden);
            setChatGroupBoxStyle(styleShow);
        }
    }, [selectedChatGroup]);

    useEffect(() => {
        setSelectedMember([loginUser.nickname]);
    }, []);




    return (

        <div className="wrap_main">
            <header><Header /></header>
            <Main component={
                <div className="wrap_message">
                    <div className="wrap_friend" style={chatGroupBoxStyle}>
                        <div className="background">
                            <div className="head_menu">
                                <div className="btn create" onClick={() => {
                                    toggleModal();
                                }}>
                                    <img src={ImgCreate} />
                                    <div className="description" >새 그룹 만들기</div>
                                </div>
                            </div>

                            <Modal className="message_modal" overlayClassName="message_orverlay_modal" isOpen={isOpen} ariaHideApp={false} >
                                <div className='wrap_modal'>
                                    <div className='modal_group_button'>
                                        <img src={ImgCancel} className="icon close link" onClick={() => {
                                            toggleModal();
                                        }} />
                                        <img src={ImgConfirm} className='group_confirm' onClick={() => {
                                            createGroup(selectedMember);
                                            toggleModal();
                                        }} />
                                    </div>

                                    {
                                        follow.followings.map((following, followingIndex) => {
                                            return <div className='following_user' key={followingIndex} onClick={() => {
                                                if (selectedMember.some((member) => {
                                                    return member === following;
                                                })) {
                                                    setSelectedMember(selectedMember.filter((member) => {
                                                        return member !== following;
                                                    }));
                                                } else {
                                                    setSelectedMember([...selectedMember, following]);
                                                };
                                            }}><div className='mask' style={selectedMember.some((member) => {
                                                return member === following;
                                            }) ? selectedStyle : null}
                                            ><img src={ImgConfirm} /></div><FollowUser member={following} /></div>
                                        })
                                    }
                                </div>
                            </Modal>

                            {
                                chatGroups.map(chatGroup => <div className="group" key={chatGroup.id}>
                                    <Group group={chatGroup} enterChat={setSelectedChatGroup} />
                                    <div className="delete"><img src={ImgQuit} /></div>
                                </div>)
                            }


                        </div>
                    </div>

                    <div className="wrap_chat" style={chatBoxStyle}>
                        <div className="head_chat">
                            <button className="btn_back" onClick={() => {
                                setChatBoxStyle(styleHidden);
                                setChatGroupBoxStyle(styleShow);
                                setBtnMenuState(false);
                                setSelectedChatGroup({});
                                if (onoffCheck) {
                                    onoffEmoji();
                                }
                            }}><img src={ImgBack} /></button>
                            <div className="head">
                                {
                                    selectedChatGroup?.id ?
                                        <Group group={selectedChatGroup} enterChat={setSelectedChatGroup} key={selectedChatGroup.id} /> : null
                                }
                            </div>
                            <button className="btn_menu" onClick={() => {
                                setBtnMenuState(!btnMenuState);
                            }}><img src={btnMenuState ? ImgCancel : ImgMore} /></button>

                            {
                                btnMenuState ? (
                                    <div className="menu">
                                        <div className="option">초대하기</div>
                                        <div className="option" onClick={() => {
                                            leaveGroup(selectedChatGroup.id, loginUser.nickname);
                                        }}>나가기</div>
                                    </div>
                                ) : null
                            }


                        </div>
                        <div className='wrap_content' ref={scrollBox}>
                            <div className="content_box" ref={contentBox} onClick={() => {
                                if (onoffCheck) {
                                    onoffEmoji();
                                }
                            }}>
                                <div className="background">
                                       <Chats chats={currChats} group={currChatGroup.current} />
                                </div>
                            </div>
                        </div>

                        <div className="input_box" tabIndex="0">
                            <div className="input_container" tabIndex="0">
                                <div contentEditable
                                    ref={inputMessage}
                                    suppressContentEditableWarning
                                    placeholder="Type here"
                                    className="input"
                                    tabIndex="0"
                                    onKeyDown={(e) => {
                                        if (e.nativeEvent.key === "Enter") {
                                            inputEnter.current.click();
                                        }
                                    }} onInput={(e) => {
                                        inputMessage.current.textContent = e.currentTarget.textContent;
                                        setContent(e.currentTarget.textContent);
                                    }}>
                                </div>
                                <button className="inputBtn" ref={inputEnter} onClick={() => {
                                    send();
                                    if (onoffCheck) {
                                        onoffEmoji();
                                    }
                                }}>확인</button>
                            </div>
                            <div className='activeBtn' tabIndex="0">
                                <button className="btn_emoji" onClick={() => {
                                    onoffEmoji();
                                }}><img src={ImgEmoji} className="icon" /></button>
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
                                        inputMessage.current.textContent += e.emoji;
                                        setContent(content => content + e.emoji);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            } />
        </div >

    )
}

export default Message