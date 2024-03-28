import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';

import Header from '../common/header';
import Main from '../common/main';
import Aside from '../common/aside';
import Sub from '../common/sub';
import ImgSetting from '../../images/setting.png';
import ImgFeeds from '../../images/feeds.png';
import ImgAt from '../../images/at.png';
import UserInfo from './UserInfo';
import Summary from '../feed/Summary';


function Member() {
    const location = useLocation();
    // console.log("state", location.state);
    const param = useParams();
    const loginUser = useSelector(state => state.user);
    const [summarys, setSummarys] = useState([]);
    const styleSelected = { borderBottom: '2px solid #aaaaaa' };
    const [SelectedTab, setSelectedTab] = useState([true, false]);
    const scrollAside = useRef();

    const navigate = useNavigate();

    const getSummaryView = () => {
        if (!location?.state?.action || location?.state?.action === 'feeds') {

            jwtAxios.post('/api/feeds/getsummaryview', null, { params: { nickname: param.nickname } })
                .then(result => {
                    setSummarys(result.data.summarys);
                    console.log(result.data);
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            jwtAxios.post('/api/feeds/getsummarymentions', null, { params: { nickname: param.nickname } })
                .then(result => {
                    setSummarys(result.data.summarys);
                    console.log(result.data);
                })
                .catch(err => {
                    console.error(err);
                })
        }
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

    useEffect(() => {
        // document.getElementById("root").style.height = 0;
        getSummaryView();
    }, [SelectedTab]);

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <Main component={
                <>
                    <UserInfo nickname={param.nickname} key={param.nickname}/>
                    <div className="tab">
                        <div className="tab_col">
                            <button className="link" style={SelectedTab[0] ? styleSelected : null} onClick={() => {
                                setSelectedTab([true, false]);
                                navigate(`/member/${param.nickname}`, { state: { action: 'feeds' } })
                            }}>
                                <img src={ImgFeeds} className="icon" />
                            </button>
                        </div>
                        <div className="tab_col">
                            <button className="link" style={SelectedTab[1] ? styleSelected : null} onClick={() => {
                                setSelectedTab([false, true]);
                                navigate(`/member/${param.nickname}`, { state: { action: 'mentions' } })
                            }}>
                                <img src={ImgAt} className="icon" />
                            </button>
                        </div>
                    </div>
                    <Summary summarys={summarys} />
                </>
            } />


            <Aside component={<Sub />} />
        </div>
    )
}

export default Member
