import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ImgRemove from '../../images/remove.png';
import ImgEdit from '../../images/confirm.png';
import axios from 'axios';

function Dropdown(props) {
    const curpage = props.pagename;
    const style = props.style;
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function onDelete() {
        let ans = window.confirm('정말로 삭제 하시겠습니까?');
        // console.log(props.feedid);
        if (ans) {
            axios.post('/api/feeds/deletebyid', { id: props.feedid })
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

    const toggleModal = () => {
        document.body.style.overflow = isOpen ? "auto" : "hidden";
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div className='dropdown_wrap' style={{ style }}>
                {
                    {
                        feed:
                            <div className='dropdown_table'>
                                <div className='dropdown_button' onClick={() => { onDelete() }}>
                                    <img src={ImgRemove} />
                                    <div className='dropdown_label'>삭제</div>
                                </div>
                                <div className='dropdown_button'>
                                    <img src={ImgEdit} onClick={() => { props.toggleModal() }} />
                                    <div className='dropdown_label'>수정</div>
                                </div>
                            </div>
                        ,
                        profile:
                            <div className='dropdown_table'>
                                <div className='dropdown_button' onClick={() => { }}>
                                    <img src={ImgRemove} />
                                    <div className='dropdown_label'>팔로우</div>
                                </div>
                                <div className='dropdown_button'>
                                    <img src={ImgEdit} onClick={() => { }} />
                                    <div className='dropdown_label'>프로필</div>
                                </div>
                            </div>
                        ,
                    }[curpage]
                }
            </div>
        </div>
    )
}

export default Dropdown
