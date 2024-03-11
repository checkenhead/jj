import React from 'react'
import Img from '../../images/Koala.jpg';

function Feeds() {
  return (
    <>
    <div className="instant_post">
      <div className="content">
        <textarea></textarea>
      </div>
      <div className="btn">버튼들</div>
    </div>
    <div className="wrap_feeds">
      <div className="feed">
        <div className="feed_head">
          <div>profileimg</div>
          <div>nickname</div>
          <div>timestamp</div>
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_content">ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent</div>
        <div className="feed_icon">123</div>
        <div className="feed_reply">456</div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #2
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #3
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #4
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #5
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #6
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #7
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #8
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #9
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
      <div className="feed">
        <div className="feed_head">
          테스트 피드 #10
        </div>
        <div className="feed_img"><img src={Img}/></div>
        <div className="feed_icon"></div>
        <div className="feed_reply"></div>
      </div>
    </div>
    </>
  )
}

export default Feeds
