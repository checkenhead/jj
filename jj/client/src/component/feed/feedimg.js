import React from 'react'
import styled from "styled-components";

import ImgDefault from '../../images/pic.png';
// const Img = styled.img`${props => props.img_style ? ('filter:' + props.img_style) : null}`;
// const Img = styled.img`filter:${props => props.img_style}`;
// const Img = styled.img`${props => (props.img_style ? ('filter:' + props.img_style + ';') : '')};`;
// const Img = styled.img``;
function Feedimg(props) {
    // const Img = styled.img`${props.img_style ? ('filter:' + props.img_style + ';') : ''};`;

    return (
        <img src={props.img_filename ? `http://localhost:8070/images/${props.img_filename}` : ImgDefault} style={{filter:props.img_style}} className="feed_img" />
    )
}

export default Feedimg
