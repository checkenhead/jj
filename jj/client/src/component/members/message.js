import React, { useEffect, useState } from 'react'
import {useDispatch } from 'react-redux';
import Header from '../common/header';
import '../../style/members/message.css';

function Message() {
//   const dispatch = useDispatch();
   const [message, setMessage] = useState('');
//    const scrollFriend = useRef(null);

//    useEffect(()=>{
//     scrollFriend.current.addEventListener('mouseover',(e)=>{
//         // scrollFriend.current.style.setProperty('overflow-y','scoll');
//         // e.currentTarget.style.overflowY = "scroll";
//         // scrollFriend.classList.add('on_mouseover');
//         e.currentTarget.classList.add('on_mouseover');
//     });
//     scrollFriend.current.addEventListener('mouseout',(e)=>{
//         // e.currentTarget.style.overflowY = "hidden";
//         e.currentTarget.classList.remove('on_mouseover');
//     });
//    },[]);

  
  return (
    
    <div className="wrap_main">
      <header><Header /></header>
      <main>
      <div className="wrap_message">
                   
                    <div className="wrap_friend" >
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
                <div className='wrap_content'>
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
                            <div className="content">56756567567556756755675675 75</div>
                        </div>
                        </div>
                    </div>
                    <div className="input_box">
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
      </main>

      {/* <aside id="aside"><Sub /></aside> */}
    </div>

  )
}

export default Message
