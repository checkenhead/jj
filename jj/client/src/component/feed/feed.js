import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import styled from "styled-components";

function Feed(props) {
    const [images, setImages] = useState([]);

    const getImages = () => {
        axios.post('/api/feeds/getfeedimgbyfeedid', null, { params: { feedid: props.feed.id } })
            .then(result => {
                setImages(result.data.images);
                console.log(result.data.images);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        getImages();
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="feed">
            <div className="feed_head">
                <div>profileimg</div>
                <div>nickname</div>
                <div>timestamp</div>
            </div>
            <Slider {...settings}>
                {
                    images.map((image, imageIndex) => {
                        let Img = styled.img`filter: ${image.style || ''};`;
                        return (
                            <Img key={imageIndex} src={`http://localhost:8070/images/${image.filename}`} className="feed_img" />
                        );
                    })
                }
            </Slider>
            <div className="feed_content">{props.feed.content}</div>
            <div className="feed_icon">123</div>
            <div className="feed_reply">456</div>
        </div>
    )
}

export default Feed
