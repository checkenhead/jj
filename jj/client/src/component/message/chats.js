import React from 'react'
import { useSelector } from 'react-redux';
import { getUserimgSrc } from '../../util/ImgSrcUtil';

import ImgUser from '../../images/user.png';

function Chats({ chats, group }) {
    const loginUser = useSelector(state => state.user);

    const getSrcByNickname = (sender) => {
        if (group?.members) {
            for (let i = 0; i < group.members.length; i++) {
                if (group.members[i].nickname === sender) {
                    return getUserimgSrc(group.members[i]);
                }
            }
        }
        return ImgUser;
    }

    return (

        chats.map((chat, chatIndex) =>
            <div key={chat.id} className={`row_content ${chat.sender === loginUser.nickname ? 'sent' : 'recieved'}`}>
                {
                    chat.sender !== loginUser.nickname && (chat.sender !== chats[chatIndex === 0 ? 0 : chatIndex - 1].sender || chatIndex === 0) ?
                        <div className="sender">{chat.sender}</div> : null
                }
                {
                    <div className={`row_content_box ${chat.sender === loginUser.nickname ? 'sent' : 'recieved'}`}>
                        {
                            chat.sender !== loginUser.nickname ?
                                <div className="friend_icon">
                                    {
                                        !chatIndex || (chat.sender !== chats[chatIndex - 1].sender) ?
                                            <img src={getSrcByNickname(chat.sender)} /> : null
                                    }
                                </div> : null
                        }
                        <div className="content">{chat.content}</div>
                    </div>
                }
            </div>
        )

    )
}

export default Chats
