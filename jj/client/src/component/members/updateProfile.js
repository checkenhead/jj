import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { useSelector} from 'react-redux';

// 다음 주소 검색
import DaumPostcode from "react-daum-postcode";
// 모달창
import Modal from "react-modal";

function UpdateProfile() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk ] = useState('');
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');

    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({display:"none"});
    const [filename, setFilename] = useState('');

    const [zipnum, setZipnum] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    
    const navigate = useNavigate();
    //const loginUser = useSelector( state=>state.user );

   /* 

   추후 메인페이지 완성시 추가

    useEffect(()=>{
        if(!loginUser){
            alert('로그인이 필요합니다');
            navigate('/');
        }
    },[])
    
    */

    // 모달창 여닫이 버튼
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    // 모달창 핸들러
    const completeHandler = (data) =>{
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

    const onFileUpload = (e)=>{
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        axios.post('/api/members/fileupload', formData)
        .then( (result) => {
            setFilename( result.data.filename );
            setImgSrc(`http://localhost:8070/images/${result.data.filename}`);
            setImgStyle({display:"block", width:"200px"});
        })
    }

    const onSubmit = ( ) => {
        if(email===''){ return alert('이메일을 입력하세요');}
        if(pwd===''){ return alert('비밀번호를 입력하세요');}
        if(pwd!==pwdChk){ return alert('비밀번호 확인이 일치하지 않습니다');}
        if(nickname===''){ return alert('닉네임을 입력하세요');}

        axios.post('api/members/updateProfile', {email, pwd, nickname, intro, profileimg:filename, zipnum, address1, address2 ,address3})
        .then((result)=>{
            if( result.data.message === 'no' ){
                return alert('닉네임이 중복됩니다');
            }
            else if(result.data.message==='ok'){
                alert('회원정보수정이 완료되었습니다.');
                navigate('/main');
            }
            
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
        <div className='loginform'>
            <div className="logo" style={{fontSize:"2.0rem"}}>Member Update</div>
            <div className='field'>
                <label>E-mail</label>
                <input type="text" value={email} onChange={
                    (e)=>{setEmail(e.currentTarget.value)}
                } />
            </div>
            <div className='field'>
                <label>Password</label>
                <input type="password" value={pwd} onChange={
                    (e)=>{ setPwd( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>Retype pw</label>
                <input type="password" value={pwdChk} onChange={
                    (e)=>{ setPwdChk( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>Nickname</label>
                <input type="text" value={nickname} onChange={
                    (e)=>{ setNickname( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>Intro</label>
                <input type="text" value={intro} onChange={
                    (e)=>{ setIntro( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <input value={zipnum} readOnly placeholder="우편번호" />
                <button onClick={toggle}>우편번호 검색</button>
                <br />
                <input value={address1} readOnly placeholder="도로명 주소" />
                <br />
                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                    <DaumPostcode onComplete={completeHandler} height="100%" />
                </Modal>
            </div>
            <div className='field'>
                <label>address2</label>
                <input type="text" value={address2} onChange={
                    (e)=>{ setAddress2 ( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>address3</label>
                <input type="text" value={address3} onChange={
                    (e)=>{ setAddress3 ( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>Profile image</label>
                <input type="file" onChange={
                    (e)=>{
                        onFileUpload(e)
                    }
                }/>
            </div>
            <div className='field'>
                <label>Profile img preview</label>
                <div><img src={imgSrc} style={imgStyle} /></div>
            </div>
            <div className='btns'>
                <button onClick={
                    ()=>{   onSubmit();   }
                }>UPDATE</button>
                <button onClick={
                    ()=>{ navigate('/')}
                }>BACK</button>
            </div>
        </div>
    )
}

export default UpdateProfile
