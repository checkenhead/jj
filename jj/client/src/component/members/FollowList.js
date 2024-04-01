import React from 'react'
import ImgCancel from '../../images/cancel.png';
import UserSummary from '../common/usersummary';


function FollowList({ followList, setIsOpen }) {
    return (
        <div className='followList_wrap'>
            <div onClick={() => { setIsOpen(false) }}><img src={ImgCancel} className="icon close link" /></div>
            <div className='followList'>
                {
                    followList.map((nickname, followListIndex) => {
                        return (
                            <UserSummary member={nickname} key={followListIndex} />
                        );
                    })
                }
            </div>
        </div >
    )
}

export default FollowList
