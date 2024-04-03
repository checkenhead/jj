<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { getUserimgSrc } from '../../util/ImgSrcUtil';
import { useSelector } from 'react-redux';

function Group({ group, enter }) {
    const loginUser = useSelector(state => state.user);
    const [members, setMembers] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setMembers(group.members.filter(member => member.nickname !== loginUser.nickname));
    }, []);

    useEffect(() => {
        if (members.length) {
            setDescription(members.length > 1 ? `${members[0].nickname} 외 ${members.length - 1}명` : `${members[0].nickname}`);
        }
    }, [members]);

    return (
        <div className="row_friend">
            <div className="box_icon">
                {
                    members.map((member, memberIndex) => (
                        <div className="profileimg" style={{ left: `${memberIndex * 20}px`, position: 'absolute', zIndex: `${members.length - memberIndex}` }} onClick={() => {
                            enter(group);
                        }}><img src={getUserimgSrc(member)} /></div>
                    ))
                }
            </div>
            <div className="nickname" onClick={() => {
                enter(group);
            }}>{description}</div>
        </div>
    )
}

export default Group
=======
import React, { useState, useEffect } from 'react'
import { getUserimgSrc } from '../../util/ImgSrcUtil';
import { useSelector } from 'react-redux';

function Group({ group, enter }) {
    const loginUser = useSelector(state => state.user);
    const [members, setMembers] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setMembers(group.members.filter(member => member.nickname !== loginUser.nickname));
    }, []);

    useEffect(() => {
        if (members.length) {
            setDescription(members.length > 1 ? `${members[0].nickname} 외 ${members.length - 1}명` : `${members[0].nickname}`);
        }
    }, [members]);

    return (
        <div className="row_friend">
            <div className="box_icon">
                {
                    members.map((member, memberIndex) => (
                        <div className="profileimg" style={{ left: `${memberIndex * 20}px`, position: 'absolute', zIndex: `${members.length - memberIndex}` }} onClick={() => {
                            enter(group);
                        }}><img src={getUserimgSrc(member)} /></div>
                    ))
                }
            </div>
            <div className="nickname" onClick={() => {
                enter(group);
            }}>{description}</div>
        </div>
    )
}

export default Group
>>>>>>> branch 'main' of https://github.com/checkenhead/jj
