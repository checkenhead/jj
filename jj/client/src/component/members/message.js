import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import Header from '../common/header';
import Main from '../common/main';


import EmojiPicker from 'emoji-picker-react';
import ImgEmoji from '../../images/emoji.png';
import ImgUser from '../../images/user.png';
import ImgBack from '../../images/backward.png';
import ImgMore from '../../images/more.png';
import ImgCancel from '../../images/cancel.png';
import ImgCreate from '../../images/create.png';
import ImgQuit from '../../images/quit.png';
import ImgSend from '../../images/send.png'
import ImgConfirm from '../../images/confirm.png'

import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import FollowUser from '../search/followUser';
import userSlice from '../../store/userSlice';
import UserSummary from '../common/usersummary';



function Message() {
    const location = useLocation();

    const loginUser = useSelector(state => state.user);
    const follow = useSelector(state => state.follow);
    const [content, setContent] = useState('');

    const inputEnter = useRef();
    const inputMessage = useRef();
    const contentBox = useRef();
    const scrollBox = useRef();

    // 이모지, 글자 수 인디케이터
    const [length, setLength] = useState(0);
    const [emojiStyle, setEmojiStyle] = useState({ display: 'none' });
    const [onoffCheck, setOnoffCheck] = useState(false);

    const [chatGroups, setChatGroups] = useState([]);
    const [selectedChatGroup, setSelectedChatGroup] = useState({});
    const currChatGroup = useRef({});

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
    const selectedStyle = {opacity:'0.3'};

    const send = () => {
        inputMessage.current.textContent = '';

        if (content !== '') {
            jwtAxios.post('/api/chat/send', { sender: loginUser.nickname, chatgroupid: currChatGroup.current.id, content })
                .then((result) => {
                    if (result.data.message === 'Error') {
                        alert("Error");
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
                setChatGroups(result.data.groups);


            })
            .catch(err => {
                console.error(err);
            });
    }

    const leaveChat = () => {

    }

    /** currGroup에서 sender의 profileimg를 찾아 return */
    const getSrcByNickname = (sender) => {
        for (let i = 0; i < currChatGroup.current.members.length; i++) {
            if (currChatGroup.current.members[i].nickname === sender) {
                return 'http://localhost:8070/images/' + currChatGroup.current.members[i].profileimg;
            }
        }
        return null;
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
            console.log("location.state.writer : ", location.state.writer);
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
    }, [selectedChatGroup]);

    useEffect(() => {
        scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
    }, [currChats]);

    const toggleModal = () => {
        document.body.style.overflow = isOpen ? "auto" : "hidden";
        setIsOpen(!isOpen);
    }

    useEffect(()=>{
        setSelectedMember([loginUser.nickname]);
    },[]);




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
                                        <img src={ImgSend} className='group_confirm' onClick={()=>{
                                            createGroup(selectedMember);
                                        }}/>
                                    </div>



                                    {
                                        follow.followings.map((following) => {
                                            return <div className='following_user'  onClick={()=>{
                                                if(selectedMember.some((member)=>{
                                                    return member === following;
                                                })){
                                                    setSelectedMember(selectedMember.filter((member)=>{
                                                        return member!==following;
                                                    }));
                                                }else{
                                                    setSelectedMember([...selectedMember, following]);
                                                }
                                                

                                                console.log(selectedMember);
                                            }}><div className='mask' style={selectedMember.some((member)=>{
                                                return member === following;
                                            }) ? selectedStyle : null }
                                            ><img src={ImgConfirm} /></div><FollowUser member={following} /></div>
                                        })
                                    }
                                </div>
                            </Modal>

                            {
                                chatGroups.map((chatGroup) => {
                                    return (
                                        <div key={chatGroup.id} className="row_friend">
                                            {
                                                chatGroup.members.map((member) => {
                                                    return (
                                                        member.nickname !== loginUser.nickname ?
                                                            <div key={`friend_icon_${member.nickname}`} className="friend_nickname">
                                                                <div className="box_nickname">
                                                                    <div className="btn align" onClick={() => {
                                                                        currChatGroup.current = chatGroup;
                                                                        setSelectedChatGroup(chatGroup);
                                                                        setChatBoxStyle(styleShow);
                                                                        setChatGroupBoxStyle(styleHidden);
                                                                        console.log(chatGroups);
                                                                    }}>
                                                                        <img src={`http://localhost:8070/images/${member.profileimg}`} className="friend_icon" />
                                                                        {member.nickname}
                                                                    </div>
                                                                    <div className="btn delete"><img src={ImgQuit} /></div>
                                                                </div>
                                                            </div> : null
                                                    );
                                                })
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>



                    <div className="wrap_chat" style={chatBoxStyle}>
                        <div className="head_chat">
                            <button className="btn_back" onClick={() => {
                                setChatBoxStyle(styleHidden);
                                setChatGroupBoxStyle(styleShow);
                                setBtnMenuState(false);
                                if (onoffCheck) {
                                    onoffEmoji();
                                }
                            }}><img src={ImgBack} /></button>
                            {
                                selectedChatGroup?.members ? (
                                    selectedChatGroup?.members?.map((member, memberIndex) => {
                                        return (
                                            member.nickname !== loginUser.nickname ?
                                                <div className="head" key={`icon_${memberIndex}`} >
                                                    <div ><img src={`http://localhost:8070/images/${member.profileimg}`} className="friend_icon" /></div>
                                                    <div className="friend_nickname">{member.nickname}</div>
                                                </div> : null
                                        );
                                    })
                                ) : <>
                                    <div><img src={ImgUser} className="friend_icon" /></div>
                                    <div className="friend_nickname"></div>
                                </>
                            }
                            {/* <button onClick={() => {
                                setChatBoxStyle(styleHidden);
                                setChatGroupBoxStyle(styleShow);
                            }}>닫기</button> */}
                            <button className="btn_menu" onClick={() => {
                                setBtnMenuState(!btnMenuState);
                            }}><img src={btnMenuState ? ImgCancel : ImgMore} /></button>
                            {
                                btnMenuState ? (
                                    <div className="menu">
                                        <div className="option">123</div>
                                        <div className="option">초대하기</div>
                                        <div className="option" onClick={() => { leaveChat() }}>나가기</div>
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
                                    {
                                        currChats.map((chat, chatIndex) => {
                                            // console.log(currChatGroup);
                                            return (
                                                <div key={chat.id} className={`row_content ${chat.sender === loginUser.nickname ? 'sent' : 'recieved'}`}>
                                                    {
                                                        chat.sender !== loginUser.nickname && chat.sender !== currChats[chatIndex === 0 ? 0 : chatIndex - 1].sender ?
                                                            <div className="sender">{chat.sender}</div> : null
                                                    }
                                                    {
                                                        <div className={`row_content_box ${chat.sender === loginUser.nickname ? 'sent' : 'recieved'}`}>
                                                            {
                                                                chat.sender !== loginUser.nickname ?
                                                                    <div className="friend_icon">
                                                                        {
                                                                            !chatIndex || (chat.sender !== currChats[chatIndex - 1].sender) ?
                                                                                <img src={getSrcByNickname(chat.sender)} /> : null
                                                                        }
                                                                    </div> : null
                                                            }
                                                            <div className="content">{chat.content}</div>
                                                        </div>
                                                    }
                                                </div>)
                                        })
                                    }
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
                                        setLength(e.currentTarget.textContent.length);
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

            {/* <aside id="aside"><Sub /></aside> */}
        </div >

    )
}

export default Message
