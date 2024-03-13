import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post';

import Feed from './feed';


function Feeds() {
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(0);

    const getFeeds = () => {
        axios.post('/api/feeds/getallfeeds', null, { params: { page } })
            .then(result => {
                setFeeds([...feeds, ...result.data.feeds]);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        getFeeds();
    }, [page]);

    return (
        <>
            <Post />
            <div className="tab">
                <div className="tab_col">
                    <button className="link">For you</button>
                </div>
                <div className="tab_col">
                    <button className="link">Following</button>
                </div>
            </div>
            <div className="wrap_feeds">

                {feeds.length ? (
                    feeds.map((feed, feedIndex) => {
                        return (
                            <Feed feed={feed} key={feedIndex} />
                        );
                    })
                ) : <div className="empty_feed_message">Feed가 없습니다.</div>
                }

                {/* <div className="feed">
                    <div className="feed_head">
                        <div>profileimg</div>
                        <div>nickname</div>
                        <div>timestamp</div>
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_content">ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent</div>
                    <div className="feed_icon">123</div>
                    <div className="feed_reply">456</div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #2
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #3
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #4
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #5
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #6
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #7
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #8
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #9
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div>
                <div className="feed">
                    <div className="feed_head">
                        테스트 피드 #10
                    </div>
                    <div className="feed_img"><img src={Img} /></div>
                    <div className="feed_icon"></div>
                    <div className="feed_reply"></div>
                </div> */}

            </div>
        </>
    )
}

export default Feeds
