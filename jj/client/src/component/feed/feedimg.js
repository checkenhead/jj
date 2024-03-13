import React from 'react'
import styled from "styled-components";

function Feedimg(props) {
    const Img = styled.img`${props.img_style ? ('filter:' + props.img_style + ';') : ''};`;

    return (
        <Img src={`http://localhost:8070/images/${props.img_filename}`} className="feed_img" />
    )
}

export default Feedimg
