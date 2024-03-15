import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../common/header';
import '../../style/members/message.css';
import axios from 'axios';
import ReactDOM from 'react-dom/client';

function Message() {
    const loginUser = useSelector(state => state.user);
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState({});
    const [content, setContent] = useState('');
    const inputEnter = useRef();
    const inputMessage = useRef();
    const contentBox = useRef();
    const [allChats, setAllChats] = useState({});
    // const [lastchatId, setLastChatId] = useState(-1);
    const [currChats, setCurrChats] = useState([]);
    const [members, setMembers] = useState([]);



    const send = () => {
        if (content !== '') {
            axios.post('/api/chat/send', { sender: loginUser.nickname, receiver: receiver.nickname, content })
                .then((result) => {
                    if (result.data.message === 'Error') {
                        alert("Error");
                    } else {
                        inputMessage.current.textContent = '';
                        setContent('');
                        // addMessage(result.data.chat);
                        // setChats([...chats, result.data.chat]);
                        // setLastChatId(result.data.chat.id);
                        // console.table(chats);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    };

    const getNewChat = () => {
        if (receiver?.nickname !== '') {
            // const id = allChats[receiver.nickname]?.length ? allChats[receiver.nickname][allChats[receiver.nickname].length-1].id:0 ;
            const oldChat = allChats[receiver.nickname];
            let id = 0;
            if (oldChat && oldChat.length > 0) {
                id = oldChat[oldChat.length - 1].id;
            }
            axios.post('/api/chat/getNewChat', { id, sender: loginUser.nickname, receiver: receiver.nickname })
                .then((result) => {
                    if (result.data.chats !== null) {
                        // setChats([...chats, ...result.data.chats]);
                        const tmp = { ...allChats };
                        tmp[receiver.nickname] = oldChat ? [...oldChat, ...result.data.chats] : [...result.data.chats];
                        setAllChats(tmp);
                        console.log(oldChat);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    };

    const getAllMembers = () => {
        axios.get('/api/chat/getAllMembers')
            .then((result) => {
                setMembers(result.data.members);
            })
            .catch((error) => {
                console.error(error);
            })
    };

    useEffect(() => {
        getAllMembers();

        const interval = setInterval(() => {
            getNewChat();
        }, 1000);

        return (() => {
            clearInterval(interval);
        })
    }, []);

    return (

        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className="wrap_message">

                    <div className="wrap_friend" >
                        <div className="background">
                            {
                                members.map((member) => {
                                    return (
                                        <div key={member.nickname} className="row_friend">
                                            <div><img src={`http://localhost:8070/images/${member.profileimg}`} className="friend_icon" /></div>
                                            <div className="friend_nickname" onClick={() => {
                                                setReceiver(member);
                                                setCurrChats(allChats[member.nickname] || []);
                                            }} >{member.nickname}</div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>

                    </div>
                    {
                        receiver?.nickname ? (
                            <div className="wrap_chat">
                                <div className="head_chat">
                                    <div>
                                        {
                                            receiver?.nickname ? (
                                                <img src={`http://localhost:8070/images/${receiver.profileimg}`} className="friend_icon" />
                                            ) : null
                                        }
                                    </div>
                                    <div className="friend_nickname">{receiver.nickname}</div>
                                </div>

                                <div className='wrap_content'>
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
                        ) : <div className="wrap_chat">메시지가 없습니다.</div>
                    }


                </div>
            </main>

            {/* <aside id="aside"><Sub /></aside> */}
        </div>

    )
}

export default Message
