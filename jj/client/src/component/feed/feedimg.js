import React from 'react'
import { getFeedimgSrc } from '../../util/ImgSrcUtil';

function Feedimg(props) {

    return (
        <img src={getFeedimgSrc(props.img_filename)} style={{ filter: props.img_style }} className="feed_img" />
    )
}

export default Feedimg
