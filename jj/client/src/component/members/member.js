import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../common/header';
import Sub from '../common/sub';
import ImgSetting from '../../images/setting.png';
import ImgFeeds from '../../images/feeds.png';
import ImgAt from '../../images/at.png';
import UserInfo from './UserInfo';
import Summary from '../feed/Summary';

function Member() {
    const param = useParams();
    const loginUser = useSelector(state => state.user);
    const [summarys, setSummarys] = useState([]);

    const navigate = useNavigate();

    const getSummaryView = () => {
        axios.post('/api/feeds/getsummaryview', null, { params: { nickname: param.nickname } })
        .then(result =>{
            setSummarys(result.data.summarys);
            console.log(result.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    // const getSummarys = () => {
    //     axios.post('/api/feeds/getsumarrysbynickname', null, { params: { nickname: param.nickname } })
    //         .then(result => {
    //             setSummarys(result.data.summarys);
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }

    // const getUser = () => {
    //     axios.post('/api/members/getmemberbynickname', null, { params: { nickname: param.nickname } })
    //         .then(result => {
    //             if (result.data.message !== 'OK') {
    //                 navigate('/main');
    //             } else {
    //                 setCurrUser(result.data.user);
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }

    useEffect(() => {
        // getUser();
        // getSummarys();
        getSummaryView();
    }, [param]);

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <UserInfo nickname={param.nickname}/>
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
                <Summary summarys={summarys}/>
            </main>
            <aside id="aside"><Sub /></aside>
        </div>
    )
}

export default Member
