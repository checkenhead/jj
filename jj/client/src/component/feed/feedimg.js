import React from 'react'
import styled from "styled-components";

// const Img = styled.img`${props => props.img_style ? ('filter:' + props.img_style) : null}`;
// const Img = styled.img`filter:${props => props.img_style}`;
// const Img = styled.img`${props => (props.img_style ? ('filter:' + props.img_style + ';') : '')};`;
// const Img = styled.img``;
function Feedimg(props) {
    // const Img = styled.img`${props.img_style ? ('filter:' + props.img_style + ';') : ''};`;

    return (
        <img src={`http://localhost:8070/images/${props.img_filename}`} style={{filter:props.img_style}} className="feed_img" />
    )
}

export default Feedimg
