import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../common/header';
import ImgUser from '../../images/user.png';
import '../../style/members/message.css';
import axios from 'axios';


function Message() {
    const location = useLocation();
    console.log("state", location.state);
    location.state = {};
    console.log("state", location.state);

    const loginUser = useSelector(state => state.user);
    // const [receiver, setReceiver] = useState({});
    const [content, setContent] = useState('');

    const inputEnter = useRef();
    const inputMessage = useRef();
    const contentBox = useRef();
    const scrollBox = useRef();

    const [chatGroups, setChatGroups] = useState([]);
    const [selectedChatGroup, setSelectedChatGroup] = useState({});
    const currChatGroup = useRef({});

    const [currChats, setCurrChats] = useState([]);
    const [members, setMembers] = useState([]);
    const [lastChatId, setLastChatId] = useState(0);

    // let allChats = {};
    const allChats = useRef({});
    // const currMember = useRef({});

    const send = () => {
        inputMessage.current.textContent = '';

        if (content !== '') {
            axios.post('/api/chat/send', { sender: loginUser.nickname, chatgroupid: currChatGroup.current.id, content })
                .then((result) => {
                    if (result.data.message === 'Error') {
                        alert("Error");
                    } else {
                        setContent('');

                        // const tmp = { ...allChats.current }
                        // console.log("tmp:", tmp[receiver.nickname]);
                        // tmp[receiver.nickname] = [...tmp[receiver.nickname], result.data.chat];
                        // allChats.current = tmp;
                        // setCurrChats(tmp[receiver.nickname]);
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
                // console.log(id);
                const result = await axios.post('/api/chat/getNewChat', { chatgroupid: currChatGroup.current.id, id: id });
                if (result.data.chats !== null && result.data.chats.length > 0) {
                    // console.log(result.data.chats);
                    const tmp = { ...allChats.current };
                    tmp[currChatGroup.current.id] = tmp[currChatGroup.current.id] ?
                        [...tmp[currChatGroup.current.id], ...result.data.chats] : [...result.data.chats];
                    // console.log(allChats);
                    allChats.current = tmp;
                    setCurrChats(currChats => tmp[currChatGroup.current.id]);
                }
            } catch (err) {
                console.error(err);
            }
        }

        // setTimeout(() => {
        //     getNewChat();
        // }, 100);
    };

    // const getAllMembers = () => {
    //     axios.get('/api/chat/getAllMembers')
    //         .then((result) => {
    //             setMembers(result.data.members);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
    // };
    const getChatGroups = (nickname) => {
        axios.post('/api/chat/getchatgroupsbynickanme', null, { params: { nickname } })
            .then(result => {
                setChatGroups(result.data.groups);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        // getAllMembers();
        getChatGroups(loginUser.nickname);
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

    return (

        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className="wrap_message">

                    <div className="wrap_friend" >
                        <div className="background">
                            {
                                // members.map((member) => {
                                //     return (
                                //         <div key={member.nickname} className="row_friend">
                                //             <div><img src={`http://localhost:8070/images/${member.profileimg}`} className="friend_icon" /></div>
                                //             <div className="friend_nickname" onClick={() => {
                                //                 currMember.current = member;
                                //                 setReceiver(receiver => member);
                                //             }} >{member.nickname}</div>
                                //         </div>
                                //     )
                                // })
                                chatGroups.map((chatGroup) => {
                                    // console.log(chatGroups);
                                    return (
                                        <div key={chatGroup.id} className="row_friend">
                                            {
                                                chatGroup.members.map((member) => {
                                                    return (
                                                        member.nickname !== loginUser.nickname ?
                                                            <div key={`friend_icon_${member.nickname}`} style={{display: 'flex'}}>
                                                                <div >
                                                                    <img src={`http://localhost:8070/images/${member.profileimg}`} className="friend_icon" />
                                                                </div>
                                                                <div className="friend_nickname" onClick={() => {
                                                                    currChatGroup.current = chatGroup;
                                                                    setSelectedChatGroup(chatGroup);
                                                                }} >
                                                                    {member.nickname}
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


                    <div className="wrap_chat">
                        <div className="head_chat">
                            {
                                selectedChatGroup?.members ? (
                                    selectedChatGroup?.members?.map((member, memberIndex) => {
                                        return (
                                            member.nickname !== loginUser.nickname ?
                                            <>
                                                <div key={`icon_${memberIndex}`}><img src={`http://localhost:8070/images/${member.profileimg}`} className="friend_icon" /></div>
                                                <div key={`name_${memberIndex}`} className="friend_nickname">{member.nickname}</div>
                                            </> : null
                                        );
                                    })
                                ) : <>
                                <div><img src={ImgUser} className="friend_icon" /></div>
                                <div className="friend_nickname"></div>
                            </>
                                
                            }
                        </div>

                        <div className='wrap_content' ref={scrollBox}>
                            <div className="background">
                                <div className="content_box" ref={contentBox}>

                                    {
                                        currChats.map((chat) => {
                                            return (
                                                <div key={chat.id} className={`row_content ${chat.sender === loginUser.nickname ? 'sent' : 'recieved'}`}>
                                                    <div className="content">{chat.content}</div>
                                                </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>


                        <div className="input_box">
                            <div contentEditable
                                ref={inputMessage}
                                suppressContentEditableWarning
                                placeholder="Type here"
                                className="input"
                                onKeyDown={(e) => {
                                    if (e.nativeEvent.key === "Enter") {
                                        inputEnter.current.click();
                                    }
                                }} onInput={(e) => {
                                    inputMessage.current.textContent = e.currentTarget.textContent;
                                    setContent(e.currentTarget.textContent);
                                }}>
                            </div>
                            <button ref={inputEnter} onClick={() => {
                                send();
                            }}>확인</button>
                        </div>

                    </div>




                </div>
            </main>

            {/* <aside id="aside"><Sub /></aside> */}
        </div>

    )
}

export default Message
