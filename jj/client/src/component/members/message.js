import React, { useState } from 'react'
import Header from '../common/header';
import Sub from '../common/sub';

import axios from 'axios';

import '../../style/members/message.css';

import { Link, useNavigate } from 'react-router-dom'
import ImgFriend from '../../images/crayon.jpg';
import SendMsg from '../../images/send.png';


function Message() {

    const [message, setMessage] = useState('');

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className="wrap_message">

                    <div className="wrap_friend" id="wrap_friend">
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임</div>
                        </div>
                        <div className="row_friend">
                            <div><img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" /></div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>

                    </div>
                    <div className="wrap_chat">
                        <div className="head_chat">
                            <div>
                                <img src="http://localhost:8070/images/Koala1710125014038.jpg" className="friend_icon" />
                            </div>
                            <div className="friend_nickname">닉네임닉네임닉네임</div>
                        </div>
                        <div className="content_box">
                            <div className="row_content recieved">
                                <div className="content">123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323</div>
                            </div>
                            <div className="row_content sent">
                                <div className="content">567567567567</div>
                            </div>
                            <div className="row_content recieved">
                                <div className="content">123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323</div>
                            </div>
                            <div className="row_content sent">
                                <div className="content">567567567567</div>
                            </div>
                            <div className="row_content recieved">
                                <div className="content">123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323123112312312312312312323</div>
                            </div>
                            <div className="row_content sent">
                                <div className="content">567567567567</div>
                            </div>


                        </div>
                        <div className="input_box">

                            <div className='messagebox'>

                                <div className='friend'>

                                </div>
                                <hr />
                                <div className='message'>
                                    <div className='row received'>

                                    </div>
                                    <div className='row sent'>

                                    </div>
                                    <div className='row sent'>

                                    </div>
                                    <div className='row received'>

                                    </div>
                                    <div className='inputmessage'>
                                        <input type='text' />
                                        <button id="sendbtn">SEND</button>
                                    </div>




                                    <div contentEditable
                                        suppressContentEditableWarning
                                        placeholder="Type here"
                                        className="input"
                                        textContent={message} onInput={(e) => {
                                            setMessage(e.currentTarget.textContent);
                                        }}>
                                    </div>
                                    <button>확인</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* <aside id="aside"><Sub /></aside> */}
        </div>

    )
}

export default Message
