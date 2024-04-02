import React from 'react'
import { getFeedimgSrc } from '../../util/ImgSrcUtil';
// const Img = styled.img`${props => props.img_style ? ('filter:' + props.img_style) : null}`;
// const Img = styled.img`filter:${props => props.img_style}`;
// const Img = styled.img`${props => (props.img_style ? ('filter:' + props.img_style + ';') : '')};`;
// const Img = styled.img``;
function Feedimg(props) {
    // const Img = styled.img`${props.img_style ? ('filter:' + props.img_style + ';') : ''};`;

    return (
        <img src={getFeedimgSrc(props.img_filename)} style={{ filter: props.img_style }} className="feed_img" />
    )
}

export default Feedimg
