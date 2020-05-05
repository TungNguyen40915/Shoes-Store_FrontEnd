import React, { Component } from 'react';
import './Carousel.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
class CarouselCustom extends Component {
    render() {
        const settings1 = {
            dots: true,
            infinite: true,
            speed: 1500,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            className: "slides",
        };
        return (
            <React.Fragment>
                <Slider autoplay className="mt-2 mx-auto text-center"  {...settings1}>
                    <div>
                        <img src="/images/carousel1.jpg" alt="carousel" />
                    </div>
                    <div>
                        <img src="/images/carousel2.jpg" alt="carousel" />
                    </div>
                    <div>
                        <img src="/images/carousel3.jpg" alt="carousel" />
                    </div>

                </Slider>
            </React.Fragment>
        );
    }
}

export default CarouselCustom;
