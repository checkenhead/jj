import React, { useEffect, useState } from 'react'

function Indicator({ length = 0, MAX_CONTENT_LENGTH }) {

    const [comment, setComment] = useState("");
    const colorPalette = {
        0: '#00FFFF',
        0.1: '#66FFB2',
        0.2: '#00FF80',
        0.3: '#00FF00' ,
        0.4: '#66FF00',
        0.5: '#8FFF00',
        0.6: '#A9EE00',
        0.7: '#AAEE00',
        0.8: '#CCCC00',
        0.9: '#EEAA33',
        1: '#FF0000',
    };

    useEffect(() => {
        if (MAX_CONTENT_LENGTH === 200) {
            setComment("내용을 200자 이내로 작성해주세요");
        } else if (MAX_CONTENT_LENGTH === 15) {
            setComment("닉네임을 15자 이내로 작성해주세요");
        }
    }, [length])

    return (
        <div className='indicator'>
            <div className="outer" style={{ background: `conic-gradient(${length > MAX_CONTENT_LENGTH ? 'red' : colorPalette[`${Math.floor(((length / MAX_CONTENT_LENGTH) * 10)) / 10}`]} ${length / MAX_CONTENT_LENGTH * 360}deg, white 0deg)` }}>
                <div className="inner">{length}</div>
            </div>
            {
                length > MAX_CONTENT_LENGTH
                    ? <div className='limitLength'>{comment}</div>
                    : null
            }
        </div>
    )
}

export default Indicator

