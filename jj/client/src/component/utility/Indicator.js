import React from 'react'

function Indicator({ length, MAX_CONTENT_LENGTH }) {
    return (

        <div className="outer" style={{ background: `conic-gradient(${length > MAX_CONTENT_LENGTH ? 'red' : '#DDDDDD'} ${length / MAX_CONTENT_LENGTH * 360}deg, white 0deg)` }}>
            <div className="inner">{length}</div>
        </div>
    )
}

export default Indicator

