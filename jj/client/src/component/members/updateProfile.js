import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import jwtAxios from '../../util/jwtUtil';

import Header from '../common/header';
import Sub from '../common/sub';
// 로그인 관련
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import { setMessageAction } from '../../store/notifySlice';
// 사진
import ImgUser from '../../images/user.png';
import ImgCancel from '../../images/cancel.png';

// 다음 주소 검색
import DaumPostcode from "react-daum-postcode";
// 모달창
import Modal from "react-modal";
import { getFeedimgSrc, getUserimgSrc } from '../../util/ImgSrcUtil';

import CustomTextarea from '../utility/CustomTextarea';
import TopLayer from '../common/toplayer';
import Main from '../common/main';
import Aside from '../common/aside';


function UpdateProfile() {
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [email, setEmail] = useState('');
    const [imgSrc, setImgSrc] = useState(ImgUser);
    const [filename, setFilename] = useState('');

    const [zipnum, setZipnum] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const MAX_CONTENT_SIZE = 8 * 1024 * 1024;

    const navigate = useNavigate();
    const loginUser = useSelector(state => state.user);
    const dispatch = useDispatch();



    //추후 메인페이지 완성시 추가

    useEffect(() => {
        if (!loginUser) {
            dispatch(setMessageAction({ message: '로그인이 필요합니다' }));
            navigate('/');
        } else {

            setEmail(loginUser.email);
            setNickname(loginUser.nickname);
            if (loginUser.profileimg) {
                setImgSrc(getUserimgSrc(loginUser));
            }
            setIntro(loginUser.intro);
            setZipnum(loginUser.zipnum);
            setAddress1(loginUser.address1);
            setAddress2(loginUser.address2);
            setAddress3(loginUser.address3);
        }
    }, []);

    // 모달창 여닫이 버튼
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
            dispatch(setMessageAction({ message: `업로드 가능한 파일 용량을 초과하였습니다\n(${MAX_CONTENT_SIZE / 1024 / 1024} MB) 이하로 업로드 해주세요` }));
        } else {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            jwtAxios.post('/api/members/fileupload', formData)
                .then((result) => {
                    setFilename(result.data.filename);
                    setImgSrc(getFeedimgSrc(result.data.filename));
                })
        }
    }

    const onSubmit = () => {
        if (nickname === '') {
            dispatch(setMessageAction({ message: '닉네임을 입력하세요' }));
            return;
        }
        console.log("nickname, intro", nickname, intro);
        jwtAxios.post('api/members/updateprofile', { email, nickname, intro, profileimg: filename, zipnum, address1, address2, address3 }, { params: { nickname: loginUser.nickname } })
            .then((result) => {
                if (result.data.message === 'no') {
                    dispatch(setMessageAction({ message: '닉네임이 중복됩니다' }));
                    return;
                }
                else if (result.data.message === 'ok') {
                    console.log(result.data.loginUser);
                    dispatch(setMessageAction({ message: '회원정보수정이 완료되었습니다.' }));
                    dispatch(loginAction(result.data.loginUser));
                    navigate('/main');
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }


    return (
        <>
            <div className="wrap_main">
                <header><Header /></header>
                <Main component={
                    <>
                        <div className='updateform'>
                            <div className='wrap_update'>
                                <div className='editprofile'>
                                    <div className="logo">Edit Profile</div>
                                    <div className='field'>
                                        <CustomTextarea
                                            value={nickname}
                                            setContent={setNickname}
                                            placeholder={'NICKNAME'}
                                            MAX_CONTENT_LENGTH={15}
                                        />
                                    </div>

                                    <div className='field'>
                                        <button className="uploadbutton" onClick={() => {
                                            navigate('/CurPwdCheck')
                                        }}>Password Change</button>
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
                                        }}>Upload Image</button>
                                    </div>

                                    <div style={{ display: "none" }} className='field'>
                                        <label>Profile Image</label>
                                        <input type="file" id="fileup" onChange={(e) => {
                                            if (e.target.value !== '') {
                                                onFileUpload(e);
                                            }
                                        }} />
                                    </div>
                                    <div className='field'>
                                        <div style={{ position: "relative" }}>
                                            <img src={imgSrc}
                                                style={{ display: "block", width: "100%", objectFit: 'cover', aspectRatio: '1', position: "absolute", top: '0px', left: '0px', filter: 'brightness(0.5)' }} />
                                            <img src={imgSrc}
                                                style={{ display: "block", width: "100%", objectFit: 'cover', aspectRatio: '1', borderRadius: '50%', position: 'relative' }} />
                                        </div>
                                    </div>
                                    <div className='btns'>
                                        <div className='updatebutton'>
                                            <button onClick={
                                                () => {
                                                    onSubmit();
                                                }
                                            }>Save</button>
                                            <button onClick={
                                                () => { navigate(`/member/${loginUser.nickname}`) }
                                            }>Back</button>
                                        </div>
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
                <Aside component={<Sub />} />
                <TopLayer />
            </div>
        </>

    )
}

export default UpdateProfile
