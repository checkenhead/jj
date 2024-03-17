import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../common/header';
import Sub from '../common/sub';

import ImgUser from '../../images/user.png';
import ImgSetting from '../../images/setting.png';
import ImgFeeds from '../../images/feeds.png';
import ImgAt from '../../images/at.png';

function Member() {
    const param = useParams();
    const loginUser = useSelector(state => state.user);
    const [currUser, setCurrUser] = useState({});
    const [summarys, setSummarys] = useState([]);

    const navigate = useNavigate();

    const getSummarys = () => {
        axios.post('/api/feeds/getsumarrysbynickname', null, { params: { nickname: param.nickname } })
        .then(result => {
            setSummarys(result.data.summarys);
        })
        .catch(err => {
            console.error(err);
        });
    }

    const getUser = () => {
        axios.post('/api/members/getmemberbynickname', null, { params: { nickname: param.nickname } })
            .then(result => {
                if (result.data.message !== 'OK') {
                    navigate('/main');
                } else {
                    setCurrUser(result.data.user);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        getUser();
        getSummarys();
    }, [param]);

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className="wrap_member">
                    <div className="nickname">{currUser.nickname}</div>
                    <div className="info">
                        <div className="profileimg" onClick={() => {
                            navigate('/updateprofile');
                        }}>
                            <img src={`http://localhost:8070/images/${currUser.profileimg}`} className="img" />
                            <img src={ImgSetting} className="icon" />
                        </div>
                        <div className="status">
                            <div>{summarys.length} 게시물</div>
                            <div>0 팔로잉</div>
                            <div>0 팔로워</div>
                        </div>
                    </div>
                </div>
                <div className="tab">
                    <div className="tab_col">
                    <button className="link">
                        <img src={ImgFeeds} className="icon" />
                    </button>
                    </div>
                    <div className="tab_col">
                    <button className="link">
                        <img src={ImgAt} className="icon" />
                    </button>
                    </div>
                </div>
                <div className="summary">
                    {
                        summarys.map((summary, summaryIndex) => {return (
                            <div key={summaryIndex} className="link">
                                <img src={`http://localhost:8070/images/${summary.filename}`}/>
                            </div>
                        );})
                    }
                </div>

            </main>
            <aside id="aside"><Sub /></aside>
        </div>
    )
}

export default Member
