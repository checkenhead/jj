import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

import jwtAxios from '../../util/jwtUtil';

import Header from '../common/header';
import Main from '../common/main';
import Aside from '../common/aside';
import Sub from '../common/sub';
import ImgFeeds from '../../images/feeds.png';
import ImgAt from '../../images/at.png';
import UserInfo from './UserInfo';
import Summary from '../feed/Summary';
import Notify from '../common/notify';


function Member() {
    const location = useLocation();
    // console.log("state", location.state);
    const param = useParams();
    const [summarys, setSummarys] = useState([]);
    const styleSelected = { borderBottom: '2px solid #aaaaaa' };
    const [SelectedTab, setSelectedTab] = useState([true, false]);

    const navigate = useNavigate();

    const getSummaryView = () => {
        if (!location?.state?.action || location?.state?.action === 'feeds') {

            jwtAxios.post('/api/feeds/getsummaryview', null, { params: { nickname: param.nickname } })
                .then(result => {
                    setSummarys(result.data.summarys);
                    // console.log(result.data);
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            jwtAxios.post('/api/feeds/getsummarymentions', null, { params: { nickname: param.nickname } })
                .then(result => {
                    setSummarys(result.data.summarys);
                    // console.log(result.data);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }


    useEffect(() => {
        getSummaryView();
    }, [param]);

    useEffect(() => {
        getSummaryView();
    }, [SelectedTab]);

    return (
        <>
        <div className="wrap_main">
            <header><Header /></header>
            <Main component={
                <>
                    <UserInfo nickname={param.nickname} key={param.nickname} />
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
        <Notify/>
        </>
    )
}

export default Member
