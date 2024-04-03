import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import jwtAxios from '../../util/jwtUtil';

import Header from '../common/header';
import Main from '../common/main';
import Aside from '../common/aside';
import Sub from '../common/sub';
import UserInfo from '../members/UserInfo';
import Feed from '../feed/feed';


function View() {
    const [feed, setFeed] = useState({});
    const param = useParams();

    const getFeed = () => {
        jwtAxios.post('/api/feeds/getfeedbyid', { id: param.feedid })
            .then(result => {
                setFeed(result.data.feed);

            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getFeed();
        // console.log(param);
    }, [param]);

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <Main component={
                <>
                    <UserInfo nickname={param.nickname} />
                    <div className='wrap_feeds'>
                        {
                            feed?.id ? (
                                <Feed feed={feed} key={feed.updatedat} />
                            ) : null
                        }
                    </div>
                </>
            } />
            <Aside component={<Sub />} />
        </div>
    )
}

export default View
