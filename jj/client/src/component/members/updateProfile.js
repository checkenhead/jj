import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtAxios from '../../util/jwtUtil';

import Header from '../common/header';
import Sub from '../common/sub';
// 로그인 관련
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import { setMessageAction } from '../../store/notifySlice';
// 사진
import ImgUser from '../../images/user.png';

// 다음 주소 검색
import DaumPostcode from "react-daum-postcode";
// 모달창
import Modal from "react-modal";


function UpdateProfile() {
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [email, setEmail] = useState('');
    const [imgSrc, setImgSrc] = useState(ImgUser);
    const [imgStyle, setImgStyle] = useState({ display: "none" });
    const [filename, setFilename] = useState('');

    const [zipnum, setZipnum] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const MAX_CONTENT_LENGTH = 200;
    const MAX_CONTENT_SIZE = 8 * 1024 * 1024;

    const navigate = useNavigate();
    const loginUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const scrollAside = useRef(0);



    //추후 메인페이지 완성시 추가

    useEffect(() => {
        if (!loginUser) {
            dispatch(setMessageAction('로그인이 필요합니다'));
            navigate('/');
        } else {

            setEmail(loginUser.email);
            setNickname(loginUser.nickname);
            if(loginUser.profileimg){
                setImgSrc(`http://localhost:8070/images/${loginUser.profileimg}`);
            }
            setZipnum(loginUser.zipnum);
            setAddress1(loginUser.address1);
            setAddress2(loginUser.address2);
            setAddress3(loginUser.address3);
        }
    }, []);

    // 모달창 여닫이 버튼
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    // 모달창 핸들러
    const completeHandler = (data) => {
        setZipnum(data.zonecode);
        setAddress1(data.roadAddress);
        setIsOpen(false); //추가
    }

    // 모달창 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "600px",
            height: "700px",
            padding: "0",
            overflow: "scroll",
        },
    };

    const onFileUpload = (e) => {
        if (e?.target?.files[0]?.size > MAX_CONTENT_SIZE) {
            dispatch(setMessageAction(`업로드 가능한 파일 용량을 초과하였습니다\n(${MAX_CONTENT_SIZE / 1024 / 1024} MB) 이하로 업로드 해주세요`));
        } else {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            jwtAxios.post('/api/members/fileupload', formData)
                .then((result) => {
                    setFilename(result.data.filename);
                    setImgSrc(`http://localhost:8070/images/${result.data.filename}`);
                    // setImgStyle({ display: "block", width: "330px" });
                })
        }
    }

    const onSubmit = () => {
        if (nickname === '') {
            dispatch(setMessageAction('닉네임을 입력하세요'));
            return;
        }

        jwtAxios.post('api/members/updateprofile', { email, nickname, intro, profileimg: filename, zipnum, address1, address2, address3 }, {params:{nickname:loginUser.nickname}})
            .then((result) => {
                if (result.data.message === 'no') {
                    dispatch(setMessageAction('닉네임이 중복됩니다'));
                    return;
                }
                else if (result.data.message === 'ok') {
                    dispatch(setMessageAction('회원정보수정이 완료되었습니다.'));
                    dispatch(loginAction(result.data.loginUser));
                    navigate('/main');
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        
    }, [onFileUpload])

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className='updateform'>
                    <div className='wrap_update'>
                        <div className='editprofile'>
                            <div className="logo">EDIT PROFILE</div>
                            <div className='field'>
                                <input type="text" value={nickname} onChange={
                                    (e) => { setNickname(e.currentTarget.value) }
                                } placeholder='NICKNAME' />
                            </div>

                            <div className='field'>
                                <button className="uploadbutton" onClick={() => {
                                    navigate('/CurPwdCheck')
                                }}>Password Change</button>
                            </div>

                            <div className='field'>
                                <input type="text" value={intro} onChange={
                                    (e) => { setIntro(e.currentTarget.value) }
                                } placeholder='INTRODUCTION' />
                            </div>

                            <div className='field'>
                                <div className='zip'>
                                    <input value={zipnum} readOnly placeholder="우편번호" />
                                    <button onClick={toggle}>검색</button></div>
                                <br />
                                {/* 
                        아래 새로운 div 생성
                    <input value={address1} readOnly placeholder="도로명 주소" />
                    <br />
                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                        <DaumPostcode onComplete={completeHandler} height="100%" />
                    </Modal> 
                    */}
                            </div>

                            {<div className='field'>
                                <input value={address1} readOnly placeholder="도로명 주소" />
                                <br />
                                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                                    <DaumPostcode onComplete={completeHandler} height="100%" />
                                </Modal>
                            </div>}

                            <div className='field'>
                                <input type="text" value={address2} onChange={
                                    (e) => { setAddress2(e.currentTarget.value) }
                                } />
                            </div>

                            <div className='field'>
                                <input type="text" value={address3} onChange={
                                    (e) => { setAddress3(e.currentTarget.value) }
                                } />
                            </div>

                            <div className='field'>
                                <button className="uploadbutton" onClick={() => {
                                    document.getElementById("fileup").click();
                                }}>UPLOAD IMAGE</button>
                            </div>

                            <div style={{ display: "none" }} className='field'>
                                <label>PROFILE IMAGE</label>
                                <input type="file" id="fileup" onChange={(e) => {
                                    if (e.target.value !== '') {
                                        onFileUpload(e);
                                    }
                                }} />
                            </div>

                            <div className='field'>
                                {/* 
                        아래 새로운 div 생성
                    <div><img src={imgSrc} style={imgStyle} /></div> 
                    */}
                            </div>
                            <div className='field'>
                                <div><img src={imgSrc}
                                    style={{ display: "block", width: "100%", objectFit: 'cover', aspectRatio: '1' }} /></div>
                            </div>
                            <div className='btns'>
                                <div className='updatebutton'>
                                    <button onClick={
                                        () => {
                                            onSubmit();
                                        }
                                    }>SAVE</button>
                                    <button onClick={
                                        () => { navigate(`/member/${loginUser.nickname}`) }
                                    }>BACK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <aside id="aside" ref={scrollAside}><Sub scrollAside={scrollAside} /></aside>
        </div>


    )
}

export default UpdateProfile
