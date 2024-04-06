import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from 'react-redux';
import { setMessageAction } from '../../store/notifySlice';

// 다음 주소 검색
import DaumPostcode from "react-daum-postcode";
// 모달창
import Modal from "react-modal";
import { getUserimgSrc } from '../../util/ImgSrcUtil';

import ImgUser from "../../images/user.png";
import CustomTextarea from '../utility/CustomTextarea';
import Notify from '../common/notify';
import ImgCancel from '../../images/cancel.png';
import Main from '../common/main';

function Join() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk] = useState('');
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');

    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({ display: "none" });

    const [filename, setFilename] = useState('');
    const [zipnum, setZipnum] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');

    // 글자수 인디케이터
    const MAX_CONTENT_SIZE = 8 * 1024 * 1024;

    // 모달창 여닫이 버튼
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? "auto" : "hidden";
    }

    // 모달창 핸들러
    const completeHandler = (data) => {
        setZipnum(data.zonecode);
        setAddress1(data.roadAddress);
        setIsOpen(false); //추가
        document.body.style.overflow = isOpen ? "auto" : "hidden";
    }

    const navigate = useNavigate();

    const onFileUpload = (e) => {
        if (e?.target?.files[0]?.size > MAX_CONTENT_SIZE) {
            dispatch(setMessageAction({ message: `업로드 가능한 파일 용량을 초과하였습니다\n(${MAX_CONTENT_SIZE / 1024 / 1024} MB) 이하로 업로드 해주세요` }));
        } else {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            axios.post('/api/members/fileupload', formData)
                .then((result) => {
                    setFilename(result.data.filename);
                    setImgSrc(getUserimgSrc({ provider: null, profileimg: result.data.filename }));
                    setImgStyle({ display: "block", width: "250px" });
                })
        }
    }

    const onSubmit = () => {
        if (email === '') {
            dispatch(setMessageAction('이메일을 입력하세요'));
            return;
        }
        if (pwd === '') {
            dispatch(setMessageAction('패스워드를 입력하세요'));
            return;
        }
        if (pwd !== pwdChk) {
            dispatch(setMessageAction('패스워드 확인이 일치하지 않습니다'));
            return;
        }
        if (nickname === '') {
            dispatch(setMessageAction('닉네임을 입력하세요'));
            return;
        }

        axios.post('/api/members/join', { email, pwd, nickname, intro, profileimg: filename, zipnum, address1, address2, address3 })
            .then((result) => {
                if (result.data.message === 'email') {
                    dispatch(setMessageAction('이메일이 중복됩니다'));
                    return;
                }
                if (result.data.message === 'nickname') {
                    dispatch(setMessageAction('닉네임이 중복됩니다'));
                    return;
                }
                if (result.data.message === 'ok') {
                    dispatch(setMessageAction('회원 가입이 완료되었습니다. 로그인하세요'));
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }


    return (
        <div className='wrap_main'>
            <Main component={
                <>
                    <div className='joinform'>
                        <div className='wrap_join'>
                            <div className="logo">Join Us</div>
                            <div className='field'>
                                <input type="text" value={email} onChange={
                                    (e) => { setEmail(e.currentTarget.value) }
                                } placeholder='EMAIL' />
                            </div>

                            <div className='field'>
                                <input type="password" value={pwd} onChange={
                                    (e) => { setPwd(e.currentTarget.value) }
                                } placeholder='PASSWORD' />
                            </div>

                            <div className='field'>
                                <input type="password" value={pwdChk} onChange={
                                    (e) => { setPwdChk(e.currentTarget.value) }
                                } placeholder='RETYPE PASSWORD' />
                            </div>

                            <div className='field'>
                                <CustomTextarea
                                    value={nickname}
                                    setContent={setNickname}
                                    placeholder={'NICKNAME'}
                                    MAX_CONTENT_LENGTH={15}
                                />
                            </div>

                            <div className='field'>
                                <CustomTextarea
                                    value={intro}
                                    setContent={setIntro}
                                    placeholder={'INTRODUCTION'}
                                    MAX_CONTENT_LENGTH={200}
                                />
                            </div>

                            <div className='field'>
                                <div className='zip'>
                                    <input value={zipnum} readOnly placeholder="우편번호" />
                                    <button onClick={() => { toggleModal() }}>검색</button></div>
                            </div>

                            <div className='field'>
                                <input value={address1} readOnly placeholder="도로명 주소" />
                            </div>

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
                                <label>Profile Image</label>
                                <input type="file" id="fileup" onChange={
                                    (e) => {
                                        if (e.target.value !== '') {
                                            onFileUpload(e);
                                        }
                                    }} />
                            </div>
                            <div className='field'>
                                {
                                    imgSrc
                                        ?
                                        (<div style={{ position: "relative" }}>

                                            <img src={imgSrc}
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    objectFit: 'cover',
                                                    aspectRatio: '1',
                                                    position: "absolute",
                                                    top: '0px',
                                                    left: '0px',
                                                    filter: 'brightness(0.4)'
                                                }} />
                                            <img src={imgSrc}
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    objectFit: 'cover',
                                                    aspectRatio: '1',
                                                    borderRadius: '50%',
                                                    position: 'relative'
                                                }} />
                                        </div>
                                        )
                                        :
                                        (<div style={{ position: "relative" }}>
                                            <img src={ImgUser}
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    objectFit: 'cover',
                                                    aspectRatio: '1',
                                                    borderRadius: '50%',
                                                    position: 'relative'
                                                }} />
                                        </div>
                                        )
                                }
                            </div>
                            <div className='btns'>
                                <div className='joinbutton'>
                                    <button onClick={
                                        () => {
                                            onSubmit();
                                        }
                                    }>Join</button>
                                    <button onClick={
                                        () => { navigate('/') }
                                    }>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal className="modal" overlayClassName="overlay_modal" isOpen={isOpen} ariaHideApp={false}>
                        <div className='wrap_modal'>
                            <div className='modal_group_button'>
                                <img src={ImgCancel} className="icon close link" onClick={() => {
                                    toggleModal();
                                }} />
                            </div>
                            <DaumPostcode onComplete={completeHandler} />
                        </div>
                    </Modal>
                </>
            } />
            <Notify />
        </div >
    )
}

export default Join
