import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../common/header';
import ImgUser from '../../images/user.png';
import '../../style/members/message.css';
import axios from 'axios';

function Message() {
    const loginUser = useSelector(state => state.user);
    const [receiver, setReceiver] = useState({});
    const [content, setContent] = useState('');
    const inputEnter = useRef();
    const inputMessage = useRef();
    const contentBox = useRef();
    const scrollBox = useRef();
    // const [allChats, setAllChats] = useState({});
    const [currChats, setCurrChats] = useState([]);
    const [members, setMembers] = useState([]);
    const [lastChatId, setLastChatId] = useState(0);

    let allChats = {};

    const send = () => {
        inputMessage.current.textContent = '';

        if (content !== '') {
            axios.post('/api/chat/send', { sender: loginUser.nickname, receiver: receiver.nickname, content })
                .then((result) => {
                    if (result.data.message === 'Error') {
                        alert("Error");
                    } else {
                        setContent('');

                        const tmp = { ...allChats }
                        // tmp[receiver.nickname] = tmp[receiver.nickname] ?
                        //     [...tmp[receiver.nickname], result.data.chat] : [result.data.chat];

                        tmp[receiver.nickname] = [...tmp[receiver.nickname], result.data.chat];

                        // setAllChats(tmp);
                        allChats = tmp;
                        setCurrChats(tmp[receiver.nickname]);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    };

    const getNewChat = async () => {
        // if (receiver) {
        //     const oldChat = allChats[receiver.nickname];
        //     const id = (oldChat && oldChat.length > 0) ? oldChat[oldChat.length - 1].id : 0;
        //     console.log(id);
        //     axios.post('/api/chat/getNewChat', { id, sender: loginUser.nickname, receiver: receiver.nickname })
        //         .then((result) => {
        //             
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         })
        // }
        if (receiver) {
            const oldChat = allChats[receiver.nickname];
            const id = (oldChat && oldChat.length > 0) ? oldChat[oldChat.length - 1].id : 0;

            try {
                console.log(id);
                const result = await axios.post('/api/chat/getNewChat', { id: id, sender: loginUser.nickname, receiver: receiver.nickname });
                if (result.data.chats !== null && result.data.chats.length > 0) {
                    console.log(result.data.chats);
                    const tmp = { ...allChats };
                    tmp[receiver.nickname] = tmp[receiver.nickname] ?
                        [...tmp[receiver.nickname], ...result.data.chats] : [...result.data.chats];
                    console.log(allChats);
                    allChats = tmp;
                    setCurrChats(currChats => tmp[receiver.nickname]);
                }
            } catch (err) {
                console.error(err);
            }
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
        getNewChat();
        setCurrChats(currChats => allChats[receiver.nickname] || []);


        const interval = setInterval(() => {
            getNewChat();
            // console.log('interval started');
        }, 500);

        return (() => {
            clearInterval(interval);
            setCurrChats(currChats => []);
            // console.log('interval stopped');
        })
    }, [receiver]);

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
                                members.map((member) => {
                                    return (
                                        <div key={member.nickname} className="row_friend">
                                            <div><img src={`http://localhost:8070/images/${member.profileimg}`} className="friend_icon" /></div>
                                            <div className="friend_nickname" onClick={() => {
                                                setReceiver(receiver => member);
                                            }} >{member.nickname}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>


                    <div className="wrap_chat">
                        <div className="head_chat">
                            <div>


                                <img src={`${receiver?.nickname ? 'http://localhost:8070/images/' + receiver.profileimg : ImgUser}`} className="friend_icon" />


                            </div>
                            <div className="friend_nickname">{receiver.nickname}</div>
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
